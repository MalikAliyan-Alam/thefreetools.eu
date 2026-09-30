import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { DEFAULT_VIEW, PAPERS, SPECS, drawTransform, effectiveDpi, pickLevel, headGuide, headRange, layoutSheet, mmToPx, type PaperId, type SpecId, type View } from './engine';
import type { PhotoLabels } from './labels';
import './photo.css';

type Saved = { spec: SpecId; paper: PaperId };
const SHEET_DPI = 300;
const SINGLE_DPI = 600;
const PAPER_IDS: PaperId[] = ['4x6', 'letter', 'a4'];
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * The loaded photo plus copies shrunk by halves. Browsers blur and alias when one
 * drawImage shrinks a 12-megapixel photo into a 300 px frame; halving step by
 * step and drawing from the nearest copy keeps the preview as sharp as the export.
 */
type Picture = { w: number; h: number; levels: CanvasImageSource[]; widths: number[] };

function makePicture(img: HTMLImageElement): Picture {
  const levels: CanvasImageSource[] = [img];
  const widths = [img.naturalWidth];
  let src: CanvasImageSource = img;
  let w = img.naturalWidth;
  let h = img.naturalHeight;
  while (w > 400 && h > 400) {
    w = Math.round(w / 2);
    h = Math.round(h / 2);
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(src, 0, 0, w, h);
    levels.push(c);
    widths.push(w);
    src = c;
  }
  return { w: img.naturalWidth, h: img.naturalHeight, levels, widths };
}

/** Draws the picture as placed by the user into a canvas of w × h pixels, on white. */
function paint(ctx: CanvasRenderingContext2D, pic: Picture, w: number, h: number, v: View) {
  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  const t = drawTransform({ w: pic.w, h: pic.h }, { w, h }, v);
  const i = pickLevel(pic.widths, t.scale);
  const k = pic.widths[i] / pic.w; // size of that copy relative to the original
  ctx.translate(t.tx, t.ty);
  ctx.rotate(t.rad);
  ctx.scale(t.scale / k, t.scale / k);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(pic.levels[i], (-pic.w * k) / 2, (-pic.h * k) / 2, pic.w * k, pic.h * k);
  ctx.restore();
}

function photoCanvas(img: Picture, w: number, h: number, v: View) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  paint(c.getContext('2d')!, img, w, h, v);
  return c;
}

function download(canvas: HTMLCanvasElement, name: string) {
  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    },
    'image/jpeg',
    0.92,
  );
}

export default function PhotoTool({ labels: t, locale }: { labels: PhotoLabels; locale: 'en' | 'es' }) {
  const storageKey = `tft:photo:v1:${locale}`;
  const [saved, setSaved] = useState<Saved>({ spec: t.specOrder[0], paper: t.defaultPaper });
  const [img, setImg] = useState<Picture | null>(null);
  const [error, setError] = useState(false);
  const [view, setView] = useState<View>(DEFAULT_VIEW);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sheetRef = useRef<HTMLCanvasElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const urlRef = useRef('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Only the chosen size and paper are remembered, never the photo.
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (s && t.specOrder.includes(s.spec) && s.paper in PAPERS) setSaved(s);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      /* storage blocked */
    }
  }, [saved]);
  useEffect(() => () => urlRef.current && URL.revokeObjectURL(urlRef.current), []);

  const spec = SPECS[saved.spec];
  const sheet = useMemo(() => layoutSheet(PAPERS[saved.paper], spec), [saved.paper, spec]);
  const guide = headGuide(spec);
  const nf = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale]);
  const [hMin, hMax] = headRange(spec);

  const load = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const next = new Image();
    next.onload = () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      setError(false);
      setImg(makePicture(next));
      setView(DEFAULT_VIEW);
    };
    next.onerror = () => {
      URL.revokeObjectURL(url);
      setError(true);
    };
    next.src = url;
  };

  // Live preview in the frame; redrawn when the frame changes size (rotation, resize).
  const [frameSize, setFrameSize] = useState('');
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setFrameSize(`${frame.clientWidth}x${frame.clientHeight}`));
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame || !img) return;
    const raf = requestAnimationFrame(() => {
      // clientWidth excludes the border, so the canvas matches the area it fills.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(frame.clientWidth * dpr);
      canvas.height = Math.round(frame.clientHeight * dpr);
      paint(canvas.getContext('2d')!, img, canvas.width, canvas.height, view);
    });
    return () => cancelAnimationFrame(raf);
  }, [img, view, saved.spec, frameSize]);

  // Small preview of the print sheet.
  useEffect(() => {
    const c = sheetRef.current;
    if (!c) return;
    // Draw at the size it is shown on screen (times the pixel ratio) so it stays sharp.
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const k = ((c.clientWidth || 240) * dpr) / sheet.w; // canvas pixels per mm
    c.width = Math.round(sheet.w * k);
    c.height = Math.round(sheet.h * k);
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    const one = img ? photoCanvas(img, Math.round(spec.w * k), Math.round(spec.h * k), view) : null;
    for (const cell of sheet.cells) {
      if (one) ctx.drawImage(one, Math.round(cell.x * k), Math.round(cell.y * k));
      else {
        ctx.fillStyle = '#e8e2da';
        ctx.fillRect(cell.x * k, cell.y * k, spec.w * k, spec.h * k);
      }
    }
  }, [sheet, img, view, spec, frameSize]);

  // Wheel zoom needs a non-passive listener.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onWheel = (e: WheelEvent) => {
      if (!img) return;
      e.preventDefault();
      setView((v) => ({ ...v, zoom: clamp(v.zoom * Math.exp(-e.deltaY * 0.0015), 1, 5) }));
    };
    frame.addEventListener('wheel', onWheel, { passive: false });
    return () => frame.removeEventListener('wheel', onWheel);
  }, [img]);

  const onPointerDown = (e: PointerEvent) => {
    if (!img) return;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety; dragging still works inside the frame */
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };
  const onPointerMove = (e: PointerEvent) => {
    const p = pointers.current;
    const prev = p.get(e.pointerId);
    if (!prev || !frameRef.current) return;
    const fw = frameRef.current.clientWidth;
    const fh = frameRef.current.clientHeight;
    if (p.size === 1) {
      setView((v) => ({ ...v, dx: v.dx + (e.clientX - prev.x) / fw, dy: v.dy + (e.clientY - prev.y) / fh }));
    } else if (p.size === 2) {
      const [a, b] = [...p.entries()].map(([id, pt]) => (id === e.pointerId ? { x: e.clientX, y: e.clientY } : pt));
      const [a0, b0] = [...p.values()];
      const before = Math.hypot(a0.x - b0.x, a0.y - b0.y);
      const after = Math.hypot(a.x - b.x, a.y - b.y);
      if (before > 0) setView((v) => ({ ...v, zoom: clamp((v.zoom * after) / before, 1, 5) }));
    }
    p.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };
  const onPointerUp = (e: PointerEvent) => pointers.current.delete(e.pointerId);
  const onKeyDown = (e: KeyboardEvent) => {
    if (!img) return;
    const step = e.shiftKey ? 0.05 : 0.01;
    const moves: Record<string, Partial<View>> = {
      ArrowLeft: { dx: view.dx - step },
      ArrowRight: { dx: view.dx + step },
      ArrowUp: { dy: view.dy - step },
      ArrowDown: { dy: view.dy + step },
      '+': { zoom: clamp(view.zoom * 1.05, 1, 5) },
      '=': { zoom: clamp(view.zoom * 1.05, 1, 5) },
      '-': { zoom: clamp(view.zoom / 1.05, 1, 5) },
    };
    if (moves[e.key]) {
      e.preventDefault();
      setView({ ...view, ...moves[e.key] });
    }
  };

  const dpi = img ? effectiveDpi({ w: img.w, h: img.h }, spec, view) : 0;
  const mm = (n: number) => nf.format(n);
  const sizeText = t.size.replace('{w}', mm(spec.w)).replace('{h}', mm(spec.h));
  const fileBase = `${t.fileStem}-${mm(spec.w).replace(/[.,]/g, '_')}x${mm(spec.h).replace(/[.,]/g, '_')}mm`;

  const saveSheet = () => {
    if (!img) return;
    const c = document.createElement('canvas');
    c.width = mmToPx(sheet.w, SHEET_DPI);
    c.height = mmToPx(sheet.h, SHEET_DPI);
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    const one = photoCanvas(img, mmToPx(spec.w, SHEET_DPI), mmToPx(spec.h, SHEET_DPI), view);
    ctx.strokeStyle = '#c8c8c8';
    ctx.lineWidth = 1;
    for (const cell of sheet.cells) {
      const x = mmToPx(cell.x, SHEET_DPI);
      const y = mmToPx(cell.y, SHEET_DPI);
      ctx.drawImage(one, x, y);
      ctx.strokeRect(x - 0.5, y - 0.5, one.width + 1, one.height + 1);
    }
    download(c, `${fileBase}-${saved.paper}.jpg`);
  };
  const saveSingle = () => {
    if (!img) return;
    download(photoCanvas(img, mmToPx(spec.w, SINGLE_DPI), mmToPx(spec.h, SINGLE_DPI), view), `${fileBase}.jpg`);
  };

  // Dropping a file anywhere on the tool loads it instead of opening it in the tab.
  const onDragOver = (e: DragEvent) => e.preventDefault();
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    load(e.dataTransfer?.files?.[0]);
  };

  return (
    <div class="photo" onDragOver={onDragOver} onDrop={onDrop}>
      <div class="photo-bar">
        <label>
          <span>{t.docType}</span>
          <select class="input" value={saved.spec} onChange={(e) => {
              const spec = e.currentTarget.value as SpecId;
              setSaved((s) => ({ ...s, spec }));
            }}>
            {t.specOrder.map((id) => (
              <option value={id}>{t.specNames[id]}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.paper}</span>
          <select class="input" value={saved.paper} onChange={(e) => {
              const paper = e.currentTarget.value as PaperId;
              setSaved((s) => ({ ...s, paper }));
            }}>
            {PAPER_IDS.map((id) => (
              <option value={id}>{t.paperNames[id]}</option>
            ))}
          </select>
        </label>
      </div>
      <p class="photo-spec">
        <strong>{sizeText}</strong> · {spec.head ? t.headSize.replace('{min}', mm(hMin)).replace('{max}', mm(hMax)) : t.headGuideOnly}
      </p>

      <div class="photo-main">
        <div class="photo-editor">
          {img && (
            <p class="photo-hint" id={`${storageKey}-guide`}>
              {t.guide} {t.keysHint}
            </p>
          )}
          <div
            ref={frameRef}
            class={`photo-frame${img ? '' : ' is-empty'}`}
            style={{ aspectRatio: `${spec.w} / ${spec.h}`, '--ar': String(spec.w / spec.h) }}
            tabIndex={img ? 0 : -1}
            role={img ? 'application' : undefined}
            aria-roledescription={img ? t.frameRole : undefined}
            aria-label={img ? t.frameLabel : undefined}
            aria-describedby={img ? `${storageKey}-guide` : undefined}
            aria-hidden={img ? undefined : 'true'}
            onClick={() => !img && inputRef.current?.click()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onKeyDown}
          >
            {img && <canvas ref={canvasRef} />}
            <svg class="photo-guide" viewBox={`0 0 ${spec.w} ${spec.h}`} preserveAspectRatio="none" aria-hidden="true">
              {['halo', 'dash'].map((k) => (
                <g class={k}>
                  <ellipse
                    cx={spec.w / 2}
                    cy={(guide.top + guide.height / 2) * spec.h}
                    rx={guide.height * spec.h * 0.36}
                    ry={(guide.height * spec.h) / 2}
                  />
                  <line x1="0" x2={spec.w} y1={guide.top * spec.h} y2={guide.top * spec.h} />
                  <line x1="0" x2={spec.w} y1={(guide.top + guide.height) * spec.h} y2={(guide.top + guide.height) * spec.h} />
                </g>
              ))}
            </svg>
          </div>
          {img && (
            <div class="photo-controls">
              <label class="photo-range">
                <span>{t.zoom}</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.01"
                  value={view.zoom}
                  onInput={(e) => {
                    const zoom = Number(e.currentTarget.value);
                    setView((v) => ({ ...v, zoom }));
                  }}
                />
              </label>
              <label class="photo-range">
                <span>{t.rotate}</span>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={view.rotate}
                  onInput={(e) => {
                    const rotate = Number(e.currentTarget.value);
                    setView((v) => ({ ...v, rotate }));
                  }}
                />
              </label>
              <button type="button" class="btn btn-ghost" onClick={() => setView(DEFAULT_VIEW)}>
                {t.reset}
              </button>
            </div>
          )}
          {img && (
            <p class="photo-hint">
              {t.resolution.replace('{w}', String(img.w)).replace('{h}', String(img.h)).replace('{dpi}', String(dpi))}
            </p>
          )}
          {img && dpi < 200 && (
            <p class="photo-warn" role="status">
              {t.lowRes.replace('{dpi}', String(dpi))}
            </p>
          )}
          <label class={`btn photo-upload${img ? ' btn-ghost' : ''}`}>
            {img ? t.change : t.choose}
            <input ref={inputRef} type="file" accept="image/*" onChange={(e) => load(e.currentTarget.files?.[0])} />
          </label>
          <p class="photo-hint">{error ? <span class="photo-error">{t.loadError}</span> : t.dropHint}</p>
        </div>

        <div class="photo-side">
          <p class="photo-label">
            {t.sheetPreview} · {t.perSheet.replace('{n}', String(sheet.cells.length))}
          </p>
          <canvas ref={sheetRef} class="photo-sheet" aria-hidden="true" />
          <div class="photo-actions">
            <button type="button" class="btn" disabled={!img || sheet.cells.length === 0} onClick={saveSheet}>
              {t.downloadSheet}
            </button>
            <button type="button" class="btn btn-ghost" disabled={!img} onClick={saveSingle}>
              {t.downloadSingle}
            </button>
          </div>
          <p class="photo-hint">{t.printTip}</p>
        </div>
      </div>
    </div>
  );
}
