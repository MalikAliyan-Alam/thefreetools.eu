import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SPECS, PAPERS, mmToPx, layoutSheet, coverScale, drawTransform, minZoom, effectiveDpi, headRange, headGuide, DEFAULT_VIEW } from '../src/tools/photo/engine.ts';

const count = (spec: keyof typeof SPECS, paper: keyof typeof PAPERS) => layoutSheet(PAPERS[paper], SPECS[spec]).cells.length;

test('millimetres to pixels', () => {
  assert.equal(mmToPx(25, 300), 295);
  assert.equal(mmToPx(30, 300), 354);
  assert.equal(mmToPx(35, 600), 827);
  assert.equal(mmToPx(45, 600), 1063);
  assert.equal(mmToPx(50.8, 300), 600);
  assert.equal(mmToPx(101.6, 300), 1200);
  assert.equal(mmToPx(152.4, 300), 1800);
});

test('photos per sheet (4 mm margin, 2 mm gap)', () => {
  // 4 × 6 in (10 × 15 cm)
  assert.equal(count('mx-infantil', '4x6'), 12);
  assert.equal(count('mx-credencial', '4x6'), 6);
  assert.equal(count('es-dni', '4x6'), 12);
  assert.equal(count('us-passport', '4x6'), 2);
  assert.equal(count('ca-passport', '4x6'), 2);
  // Letter (carta) and A4
  assert.equal(count('mx-infantil', 'letter'), 60);
  assert.equal(count('mx-infantil', 'a4'), 63);
  assert.equal(count('mx-credencial', 'letter'), 28);
  assert.equal(count('mx-credencial', 'a4'), 30);
});

test('sheet grid is centred and stays inside the margins', () => {
  const s = layoutSheet(PAPERS['4x6'], SPECS['mx-infantil']);
  assert.equal(s.cols, 3);
  assert.equal(s.rows, 4);
  assert.equal(s.w, 101.6);
  const right = s.cells.at(-1)!.x + 25;
  const bottom = s.cells.at(-1)!.y + 30;
  assert.ok(Math.abs(s.cells[0].x - (s.w - right)) < 1e-9, 'centred horizontally');
  assert.ok(Math.abs(s.cells[0].y - (s.h - bottom)) < 1e-9, 'centred vertically');
  assert.ok(s.cells[0].x >= 4 && s.cells[0].y >= 4);
  // Landscape is picked when more photos fit
  const l = layoutSheet(PAPERS.letter, SPECS['mx-infantil']);
  assert.equal(l.w, 279.4);
  assert.deepEqual([l.cols, l.rows], [10, 6]);
});

test('crop maths', () => {
  assert.equal(coverScale({ w: 4000, h: 3000 }, { w: 350, h: 450 }), 0.15);
  const t = drawTransform({ w: 4000, h: 3000 }, { w: 827, h: 1063 }, { zoom: 2, dx: 0.1, dy: -0.05, rotate: 90 });
  assert.equal(t.tx, 827 / 2 + 82.7);
  assert.equal(t.ty, 1063 / 2 - 53.15);
  assert.equal(t.rad, Math.PI / 2);
  assert.ok(Math.abs(t.scale - (1063 / 3000) * 2) < 1e-12);
  const d = drawTransform({ w: 100, h: 100 }, { w: 10, h: 10 }, DEFAULT_VIEW);
  assert.deepEqual(d, { tx: 5, ty: 5, rad: 0, scale: 0.1 });
});

test('straightening never leaves white corners', () => {
  assert.equal(minZoom({ w: 4000, h: 3000 }, { w: 35, h: 45 }, 0), 1);
  // A square image in a square frame turned 45° needs cos + sin = √2
  assert.ok(Math.abs(minZoom({ w: 100, h: 100 }, { w: 10, h: 10 }, 45) - Math.SQRT2) < 1e-12);
  assert.ok(minZoom({ w: 3000, h: 4000 }, { w: 35, h: 45 }, 10) > 1);
  // drawTransform applies it even when the user's zoom is lower
  const t = drawTransform({ w: 100, h: 100 }, { w: 10, h: 10 }, { zoom: 1, dx: 0, dy: 0, rotate: 45 });
  assert.ok(Math.abs(t.scale - 0.1 * Math.SQRT2) < 1e-12);
});

test('edge cases from review', () => {
  assert.equal(mmToPx(25, 600), 591);
  assert.equal(mmToPx(30, 600), 709);
  assert.equal(layoutSheet({ w: 100, h: 150 }, { w: 200, h: 300 }).cells.length, 0);
  for (const spec of Object.values(SPECS))
    for (const paper of Object.values(PAPERS)) {
      const s = layoutSheet(paper, spec);
      const last = s.cells.at(-1)!;
      assert.ok(s.cells[0].x >= 4 - 1e-9 && s.cells[0].y >= 4 - 1e-9);
      assert.ok(Math.abs(s.cells[0].x - (s.w - last.x - spec.w)) < 1e-9);
      assert.ok(Math.abs(s.cells[0].y - (s.h - last.y - spec.h)) < 1e-9);
    }
  // Same framing at any output size
  const v = { zoom: 1.7, dx: 0.12, dy: -0.08, rotate: 11.5 };
  const a = drawTransform({ w: 3024, h: 4032 }, { w: 350, h: 450 }, v);
  const b = drawTransform({ w: 3024, h: 4032 }, { w: 700, h: 900 }, v);
  assert.ok(Math.abs(b.tx / 700 - a.tx / 350) < 1e-12 && Math.abs(b.scale / 700 - a.scale / 350) < 1e-12);
});

test('effective print resolution', () => {
  // 2000 × 3000 in a 35 × 45 mm frame: width decides, 2000 px over 35 mm (1.378 in) ≈ 1451 dpi
  assert.equal(effectiveDpi({ w: 2000, h: 3000 }, SPECS['intl-35x45'], DEFAULT_VIEW), 1451);
  // A 600 × 800 image zoomed 4× into 25 × 30 mm: 150 px across 25 mm ≈ 152 dpi
  assert.equal(effectiveDpi({ w: 600, h: 800 }, SPECS['mx-infantil'], { zoom: 4, dx: 0, dy: 0, rotate: 0 }), 152);
});

test('head guide', () => {
  assert.deepEqual(headRange(SPECS['uk-passport']), [29, 34]);
  assert.deepEqual(headRange(SPECS['mx-infantil']), [21, 24]);
  const g = headGuide(SPECS['uk-passport']);
  assert.ok(g.top > 0 && g.top + g.height < 1);
  assert.ok(Math.abs(g.height - 31.5 / 45) < 1e-12);
});
