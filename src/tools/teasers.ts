/**
 * One-line worked example shown on each tool card. Computed from the engines
 * at build time, so the card can never disagree with the tool.
 */
import type { Locale } from '../i18n/locales';
import type { ToolId } from './registry';
import { SCALES, summarize, formatAverage } from './gpa/engine';
import { HIJRI_MONTHS, hijriToGregorian } from './hijri/engine';
import { gregorianAge, hijriAge } from './age/engine';
import { enWords, esWords, arWords } from './words/engine';
import { solve } from './vat/engine';

const arrow = (l: Locale) => (l === 'ar' ? '←' : '→');
const num = (l: Locale, n: number, opts: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat(l === 'ar' ? 'ar-u-nu-latn' : l === 'es' ? 'es-MX' : 'en', opts).format(n);
const month = (l: Locale, m: number) =>
  new Intl.DateTimeFormat(l === 'ar' ? 'ar-u-nu-latn' : l, { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2020, m - 1, 1));

// Arabic month count: شهر، شهران، 3–10 أشهر، 11+ شهراً.
const arMonths = (n: number) => (n === 1 ? 'شهر' : n === 2 ? 'شهران' : n <= 10 ? `${n} أشهر` : `${n} شهراً`);

export function teaser(id: ToolId, l: Locale): string {
  const a = arrow(l);
  switch (id) {
    case 'gpa': {
      if (l === 'es') return `5,0 · 6,0 · 5,5 ${a} promedio 5,5`;
      const scale = l === 'ar' ? SCALES.sa5 : SCALES.us4;
      const grades = l === 'ar' ? ['A+', 'B+', 'C'] : ['A', 'B+', 'C'];
      const s = summarize(scale, grades.map((grade, i) => ({ name: '', grade, weight: [4, 3, 1][i] })));
      const list = grades.map((g, i) => `${g} ×${[4, 3, 1][i]}`).join(' · ');
      return l === 'ar' ? `${list} ${a} ${formatAverage(s.average!)} من 5` : `${list} ${a} ${formatAverage(s.average!)} GPA`;
    }
    case 'hijri': {
      const g = hijriToGregorian({ y: 1448, m: 9, d: 1 })!;
      const hm = HIJRI_MONTHS[l === 'ar' ? 'ar' : 'en'][8];
      return `1 ${hm} 1448 ${a} ${g.d} ${month(l, g.m)} ${g.y}`;
    }
    case 'age': {
      const s = gregorianAge({ y: 2000, m: 6, d: 10 }, { y: 2026, m: 9, d: 5 });
      if (l === 'ar') return `10/6/2000 ${a} ${s.years} سنة و${arMonths(s.months)} و${s.days} يوماً`;
      if (l === 'es') return `10/6/2000 ${a} ${s.years} años, ${s.months} meses, ${s.days} días`;
      return `10 Jun 2000 ${a} ${s.years} y, ${s.months} m, ${s.days} d`;
    }
    case 'hijri-age': {
      const h = hijriAge({ y: 2000, m: 1, d: 1 }, { y: 2026, m: 1, d: 1 });
      return `26 سنة ميلادية ${a} ${h.years} سنة و${arMonths(h.months)} هجرية`;
    }
    case 'words':
      if (l === 'ar') return `1250 ${a} ${arWords('1250')}`;
      if (l === 'es') return `1.250 ${a} ${esWords('1250')}`;
      return `1,250 ${a} ${enWords('1250')}`;
    case 'vat': {
      const rate = l === 'es' ? 16 : 15;
      const b = solve('net', 1000, rate);
      return `${num(l, b.net)} + ${rate}% ${a} ${num(l, b.gross)}`;
    }
  }
}
