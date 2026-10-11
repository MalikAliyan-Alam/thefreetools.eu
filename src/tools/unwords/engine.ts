/**
 * French number words back to digits: "quatre millions cinq cent mille" → 4500000.
 * Accepts hyphens or spaces, any case, the Belgian and Swiss words (septante,
 * huitante, nonante) and the 1990 spelling. It reads the words leniently, then
 * rebuilds the number with frWords() to tell the user whether the spelling is
 * the usual one.
 */
import { frWords, type FrVariant } from '../words/engine.ts';

export type ParseError =
  | { kind: 'empty' }
  | { kind: 'unknown'; word: string }
  | { kind: 'order'; word: string }
  | { kind: 'too-big' };

export type ParseResult =
  | { ok: true; value: bigint; spelling: 'usual' | 'other'; usual: string }
  | ({ ok: false } & ParseError);

const UNITS: Record<string, number> = {
  zero: 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9,
  dix: 10, onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16,
};
const TENS: Record<string, number> = {
  vingt: 20, vingts: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60,
  septante: 70, octante: 80, huitante: 80, nonante: 90,
};
const SCALES: Record<string, bigint> = {
  million: 10n ** 6n, millions: 10n ** 6n, milliard: 10n ** 9n, milliards: 10n ** 9n, billion: 10n ** 12n, billions: 10n ** 12n,
};
/** Words that follow an amount and carry no value: "un million d'euros". */
const IGNORED = new Set([
  'et', 'de', 'd', 'euro', 'euros', 'dirham', 'dirhams', 'franc', 'francs', 'cfa', 'dinar', 'dinars', 'dollar', 'dollars',
]);
const MAX = 10n ** 15n - 1n;

/** Lower case, no accents, hyphens and apostrophes read as spaces. */
export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/[-‐‑–—'’`]/g, ' ')
    .split(/[^a-z]+/)
    .filter(Boolean);
}

/**
 * Is `w` allowed right after the two-digit part `p` of the current group?
 * "vingt" then "trois" yes; "trois" then "vingt" no; "soixante" then "douze" yes.
 */
function followsTens(p: number, w: number): boolean {
  if (p === 0) return true;
  if (p < 10) return false;
  if (p === 10) return w >= 7 && w <= 9; // dix-sept, dix-huit, dix-neuf
  if (p < 20) return false;
  if (p % 10 !== 0) return false;
  if (w >= 1 && w <= 9) return true;
  // soixante-douze, quatre-vingt-quinze: the 10–16 words continue sixty and eighty
  return (p === 60 || p === 80) && w >= 10 && w <= 16;
}

export function parseFrench(input: string): ParseResult {
  const words = tokenize(input);
  if (!words.length) return { ok: false, kind: 'empty' };

  let total = 0n;
  let sub = 0n; // thousands and below, inside the current million group
  let cur = 0; // below one thousand
  let lastScale: bigint | null = null;
  let thousandsDone = false;
  let hundredsDone = false;
  let sawNumber = false;
  let prev = '';

  for (const w of words) {
    if (IGNORED.has(w)) {
      prev = w;
      continue;
    }
    if (w in UNITS || w in TENS) {
      let v = (w in UNITS ? UNITS[w] : TENS[w]) as number;
      // quatre-vingt(s): "quatre" has already been added, so 4 + 76 = 80
      if (w.startsWith('vingt') && prev === 'quatre' && cur % 100 === 4) {
        v = 76;
      } else if (!followsTens(cur % 100, v)) {
        return { ok: false, kind: 'order', word: w };
      }
      cur += v;
      sawNumber = true;
    } else if (w === 'cent' || w === 'cents') {
      if (hundredsDone || cur >= 10) {
        return { ok: false, kind: 'order', word: w };
      }
      cur = (cur === 0 ? 1 : cur) * 100;
      hundredsDone = true;
      sawNumber = true;
    } else if (w === 'mille' || w === 'milles') {
      if (thousandsDone) return { ok: false, kind: 'order', word: w };
      sub += BigInt(cur === 0 ? 1 : cur) * 1000n;
      cur = 0;
      hundredsDone = false;
      thousandsDone = true;
      sawNumber = true;
    } else if (w in SCALES) {
      const scale = SCALES[w];
      if ((lastScale !== null && scale >= lastScale) || (cur === 0 && sub === 0n)) {
        return { ok: false, kind: 'order', word: w };
      }
      total += (sub + BigInt(cur)) * scale;
      sub = 0n;
      cur = 0;
      lastScale = scale;
      thousandsDone = false;
      hundredsDone = false;
      sawNumber = true;
    } else if (w === 'billiard' || w === 'billiards') {
      return { ok: false, kind: 'too-big' };
    } else {
      return { ok: false, kind: 'unknown', word: w };
    }
    prev = w;
  }
  if (!sawNumber) return { ok: false, kind: 'empty' };

  const value = total + sub + BigInt(cur);
  if (value > MAX) return { ok: false, kind: 'too-big' };

  const variants: { variant: FrVariant; reform: boolean }[] = [
    { variant: 'fr', reform: false },
    { variant: 'fr', reform: true },
    { variant: 'be', reform: false },
    { variant: 'be', reform: true },
    { variant: 'ch', reform: false },
    { variant: 'ch', reform: true },
  ];
  const typed = words.filter((w) => !IGNORED.has(w) || w === 'et').join(' ');
  const forms = variants.map((o) => tokenize(frWords(value, o)).join(' '));
  const usual = frWords(value);
  return { ok: true, value, spelling: forms.includes(typed) ? 'usual' : 'other', usual };
}

/** 4500000n → "4 500 000" with narrow no-break spaces, as French typography has it. */
export function groupDigits(n: bigint): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
