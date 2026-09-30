/**
 * ID and passport photo sizes, crop maths and print-sheet layout.
 * Pure functions, covered by tests/photo.test.ts. All lengths in millimetres.
 */

export type SpecId = 'mx-infantil' | 'mx-credencial' | 'es-dni' | 'intl-35x45' | 'us-passport' | 'uk-passport' | 'ca-passport';

export type PhotoSpec = {
  /** Width and height of the printed photo. */
  w: number;
  h: number;
  /**
   * Official head height, chin to crown, where the issuing office publishes one.
   * Without it the guide uses 70–80% of the photo height, the usual studio framing.
   */
  head?: [number, number];
};

export const SPECS: Record<SpecId, PhotoSpec> = {
  // Mexico: studio convention, no government standard.
  'mx-infantil': { w: 25, h: 30 },
  'mx-credencial': { w: 35, h: 45 },
  // Spain: Real Decreto 1553/2005, art. 5 ("32 por 26 milímetros").
  'es-dni': { w: 26, h: 32 },
  // ICAO 9303 (referenced by the EU Visa Code): head 70–80% of the photo height.
  'intl-35x45': { w: 35, h: 45, head: [31.5, 36] },
  // travel.state.gov: 2 × 2 in, head 1 to 1 3/8 in.
  'us-passport': { w: 50.8, h: 50.8, head: [25.4, 34.9] },
  // gov.uk: 45 × 35 mm, head 29–34 mm.
  'uk-passport': { w: 35, h: 45, head: [29, 34] },
  // canada.ca: 50 × 70 mm, face 31–36 mm.
  'ca-passport': { w: 50, h: 70, head: [31, 36] },
};

export type PaperId = '4x6' | 'a4' | 'letter';

/** 4 × 6 in is the standard photo print, sold as 10 × 15 cm in Mexico and Spain. */
export const PAPERS: Record<PaperId, { w: number; h: number }> = {
  '4x6': { w: 101.6, h: 152.4 },
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

export const mmToPx = (mm: number, dpi: number) => Math.round((mm / 25.4) * dpi);

/** Head guide for a spec: [min, max] head height in mm. */
export function headRange(spec: PhotoSpec): [number, number] {
  return spec.head ?? [spec.h * 0.7, spec.h * 0.8];
}

export type Sheet = {
  /** Paper size as laid out (may be landscape). */
  w: number;
  h: number;
  cols: number;
  rows: number;
  /** Top-left corner of every photo, in mm. */
  cells: { x: number; y: number }[];
};

/**
 * As many photos as fit on the paper, portrait or landscape, with a margin
 * printers can reach and a gap to cut along. The grid is centred.
 */
export function layoutSheet(paper: { w: number; h: number }, photo: { w: number; h: number }, margin = 4, gap = 2): Sheet {
  const fit = (len: number, size: number) => Math.max(0, Math.floor((len - 2 * margin + gap) / (size + gap)));
  const options = [
    { w: paper.w, h: paper.h },
    { w: paper.h, h: paper.w },
  ].map((p) => ({ ...p, cols: fit(p.w, photo.w), rows: fit(p.h, photo.h) }));
  // Most photos wins; on a tie keep the paper's own orientation.
  const best = options[1].cols * options[1].rows > options[0].cols * options[0].rows ? options[1] : options[0];
  const gridW = best.cols * photo.w + Math.max(0, best.cols - 1) * gap;
  const gridH = best.rows * photo.h + Math.max(0, best.rows - 1) * gap;
  const x0 = (best.w - gridW) / 2;
  const y0 = (best.h - gridH) / 2;
  const cells = [];
  for (let r = 0; r < best.rows; r++) for (let c = 0; c < best.cols; c++) cells.push({ x: x0 + c * (photo.w + gap), y: y0 + r * (photo.h + gap) });
  return { w: best.w, h: best.h, cols: best.cols, rows: best.rows, cells };
}

/** How the user placed the picture in the frame. Offsets are fractions of the frame width/height. */
export type View = { zoom: number; dx: number; dy: number; rotate: number };

export const DEFAULT_VIEW: View = { zoom: 1, dx: 0, dy: 0, rotate: 0 };

/** Scale that makes the image just cover a frame of the given aspect. */
export const coverScale = (img: { w: number; h: number }, frame: { w: number; h: number }) => Math.max(frame.w / img.w, frame.h / img.h);

/**
 * Smallest zoom at which the rotated image still covers the whole frame, so
 * straightening never leaves white corners. 1 when there is no rotation.
 */
export function minZoom(img: { w: number; h: number }, frame: { w: number; h: number }, deg: number) {
  const r = (deg * Math.PI) / 180;
  const c = Math.abs(Math.cos(r));
  const s = Math.abs(Math.sin(r));
  const k = coverScale(img, frame);
  return Math.max((frame.w * c + frame.h * s) / (img.w * k), (frame.w * s + frame.h * c) / (img.h * k), 1);
}

/**
 * Canvas transform to draw the image into an output of `out` pixels:
 * translate(tx, ty), rotate(rad), scale(scale), then draw the image centred on the origin.
 */
export function drawTransform(img: { w: number; h: number }, out: { w: number; h: number }, v: View) {
  const scale = coverScale(img, out) * Math.max(v.zoom, minZoom(img, out, v.rotate));
  return { tx: out.w / 2 + v.dx * out.w, ty: out.h / 2 + v.dy * out.h, rad: (v.rotate * Math.PI) / 180, scale };
}

/**
 * Real print resolution the chosen framing gives: how many source pixels land
 * on each inch of the printed photo. Below ~200 it starts to look soft.
 */
export function effectiveDpi(img: { w: number; h: number }, spec: PhotoSpec, v: View) {
  const { scale } = drawTransform(img, { w: spec.w, h: spec.h }, v); // mm per source pixel
  return Math.round(25.4 / scale);
}

/** Where the head guide sits in the frame, as fractions of the photo height. */
export function headGuide(spec: PhotoSpec) {
  const [min, max] = headRange(spec);
  const mid = (min + max) / 2;
  // Crown sits a little above centre so the chin and shoulders fit below.
  const top = ((spec.h - mid) * 0.42) / spec.h;
  return { top, height: mid / spec.h, min: min / spec.h, max: max / spec.h };
}
