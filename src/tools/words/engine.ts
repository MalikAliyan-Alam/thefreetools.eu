/**
 * Numbers and money amounts in words: English, Spanish and Arabic (tafqeet).
 * Pure functions, covered by tests/words.test.ts. Integers are handled as
 * BigInt so nothing is lost to floating point.
 */

export type Lang = 'en' | 'es' | 'ar';
export type LetterCase = 'sentence' | 'lower' | 'upper' | 'title';
export type Amount = { negative: boolean; int: string; frac: string };

/** Largest integer part we spell out: 15 digits (up to 999 trillion). */
export const MAX_DIGITS = 15;

const toLatinDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0));

/**
 * Reads "1234.56", "1,234.56", "1.234,56", "1 234,5" or Arabic-Indic digits.
 * A lone separator followed by exactly three digits is a thousands separator
 * ("1,234" = 1234) unless the currency has three decimals (KWD, JOD);
 * otherwise the last separator is the decimal point.
 */
export function parseAmount(input: string, threeDecimals = false): Amount | null | 'too-big' {
  let s = toLatinDigits(input.trim()).replace(/[\s  '’٬]/g, '').replace(/٫/g, '.');
  if (!s) return null;
  let negative = false;
  if (/^[-−]/.test(s)) {
    negative = true;
    s = s.slice(1);
  }
  if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) return null;
  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');
  let dec = -1;
  if (lastDot >= 0 && lastComma >= 0) dec = Math.max(lastDot, lastComma);
  else if (lastDot >= 0 || lastComma >= 0) {
    const sep = lastDot >= 0 ? '.' : ',';
    const count = s.split(sep).length - 1;
    const after = s.length - s.lastIndexOf(sep) - 1;
    // "0.999" is always a decimal; "1.999" is read as one thousand nine hundred ninety-nine.
    if (count === 1 && (after !== 3 || threeDecimals || /^0*$/.test(s.slice(0, s.lastIndexOf(sep))))) dec = s.lastIndexOf(sep);
  }
  const frac = dec >= 0 ? s.slice(dec + 1) : '';
  if (/[.,]/.test(frac)) return null;
  const int = (dec >= 0 ? s.slice(0, dec) : s).replace(/[.,]/g, '').replace(/^0+(?=\d)/, '') || '0';
  if (int.length > MAX_DIGITS) return 'too-big';
  return { negative, int, frac };
}

/** Splits an amount into whole units and minor units (cents), rounding half up. */
export function splitMoney(a: Amount, decimals: number): { major: bigint; minor: number } {
  const frac = (a.frac + '0'.repeat(decimals + 1)).slice(0, decimals + 1);
  let units = BigInt(a.int + frac.slice(0, decimals));
  if (Number(frac[decimals]) >= 5) units += 1n;
  const base = 10n ** BigInt(decimals);
  return { major: units / base, minor: Number(units % base) };
}

/* ---------------------------------------------------------------- English */

const EN_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const EN_SCALES = ['trillion', 'billion', 'million', 'thousand'];

const en99 = (n: number) => (n < 20 ? EN_ONES[n] : EN_TENS[Math.floor(n / 10)] + (n % 10 ? '-' + EN_ONES[n % 10] : ''));
const en999 = (n: number, and: boolean) => {
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (!h) return en99(r);
  return `${EN_ONES[h]} hundred` + (r ? (and ? ' and ' : ' ') + en99(r) : '');
};

export type EnOptions = { and?: boolean; indian?: boolean };

/** "one thousand two hundred thirty-four"; `and` gives the British "… hundred and thirty-four". */
export function enWords(int: string | bigint, o: EnOptions = {}): string {
  let n = BigInt(int);
  if (n === 0n) return 'zero';
  const and = !!o.and;
  const parts: string[] = [];
  if (o.indian) {
    const crore = n / 10_000_000n;
    n %= 10_000_000n;
    if (crore) parts.push(enWords(crore, o) + ' crore');
    const lakh = Number(n / 100_000n);
    n %= 100_000n;
    if (lakh) parts.push(en99(lakh) + ' lakh');
    const th = Number(n / 1000n);
    n %= 1000n;
    if (th) parts.push(en99(th) + ' thousand');
  } else {
    EN_SCALES.forEach((scale, i) => {
      const div = 10n ** BigInt(3 * (4 - i));
      const g = Number(n / div);
      n %= div;
      if (g) parts.push(`${en999(g, and)} ${scale}`);
    });
  }
  const last = Number(n);
  if (last) parts.push((and && parts.length && last < 100 ? 'and ' : '') + en999(last, and));
  return parts.join(' ');
}

/* ---------------------------------------------------------------- Spanish */

const ES_UNDER30 = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const ES_TENS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const ES_HUNDREDS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

const es99 = (n: number) => (n < 30 ? ES_UNDER30[n] : ES_TENS[Math.floor(n / 10)] + (n % 10 ? ' y ' + ES_UNDER30[n % 10] : ''));
const es999 = (n: number) => {
  if (n === 100) return 'cien';
  const h = Math.floor(n / 100);
  const r = n % 100;
  return h ? ES_HUNDREDS[h] + (r ? ' ' + es99(r) : '') : es99(r);
};
/** "uno" becomes "un" before a noun: veintiún mil, treinta y un pesos (RAE). */
const apocope = (s: string) => s.replace(/veintiuno$/, 'veintiún').replace(/(^| )uno$/, '$1un');
const esBelowMillion = (n: number) => {
  const th = Math.floor(n / 1000);
  const r = n % 1000;
  const parts: string[] = [];
  if (th === 1) parts.push('mil');
  else if (th) parts.push(apocope(es999(th)) + ' mil');
  if (r) parts.push(es999(r));
  return parts.join(' ');
};

/** Spanish long scale: millón = 10^6, mil millones = 10^9, billón = 10^12. `noun` applies the "un" apocope. */
export function esWords(int: string | bigint, noun = false): string {
  const n = BigInt(int);
  if (n === 0n) return 'cero';
  const bill = Number(n / 10n ** 12n);
  const mill = Number((n / 10n ** 6n) % 10n ** 6n);
  const rest = Number(n % 10n ** 6n);
  const parts: string[] = [];
  if (bill) parts.push(bill === 1 ? 'un billón' : apocope(esBelowMillion(bill)) + ' billones');
  if (mill) parts.push(mill === 1 ? 'un millón' : apocope(esBelowMillion(mill)) + ' millones');
  if (rest) parts.push(esBelowMillion(rest));
  const s = parts.join(' ');
  return noun ? apocope(s) : s;
}

/** "un millón de pesos", but "un millón cien pesos". */
const esNeedsDe = (n: bigint) => n > 0n && n % 1_000_000n === 0n;

/* ----------------------------------------------------------------- Arabic */

/** Noun forms used when counting: after 1 (and 100, 1000…), 2, 3–10, 11–99. */
export type ArNoun = { one: string; two: string; few: string; many: string; f?: boolean };

const AR_M = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة'];
const AR_F = ['', 'واحدة', 'اثنتان', 'ثلاث', 'أربع', 'خمس', 'ست', 'سبع', 'ثماني', 'تسع', 'عشر'];
const AR_TENS = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
const AR_HUNDREDS = ['', 'مائة', 'مائتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
const AR_SCALES: (ArNoun & { twoC: string })[] = [
  { one: 'ألف', two: 'ألفان', twoC: 'ألفا', few: 'آلاف', many: 'ألفاً' },
  { one: 'مليون', two: 'مليونان', twoC: 'مليونا', few: 'ملايين', many: 'مليوناً' },
  { one: 'مليار', two: 'ملياران', twoC: 'مليارا', few: 'مليارات', many: 'ملياراً' },
  { one: 'تريليون', two: 'تريليونان', twoC: 'تريليونا', few: 'تريليونات', many: 'تريليوناً' },
];

/** 3–10 are followed by the plural, 11–99 by the singular (accusative), 100s by the singular. */
const arNounFor = (n: bigint, noun: ArNoun, construct: boolean) => {
  const r = Number(n % 100n);
  if (r >= 3 && r <= 10) return noun.few;
  if (r >= 11) return construct ? noun.one : noun.many;
  return noun.one;
};

// Numbers 3–10 take the opposite gender of the counted noun: ثلاثة ريالات، ثلاث هللات.
function ar99(n: number, f: boolean): string {
  if (n <= 10) return (f ? AR_F : AR_M)[n];
  if (n === 11) return f ? 'إحدى عشرة' : 'أحد عشر';
  if (n === 12) return f ? 'اثنتا عشرة' : 'اثنا عشر';
  if (n < 20) return f ? `${AR_F[n % 10]} عشرة` : `${AR_M[n % 10]} عشر`;
  const u = n % 10;
  const tens = AR_TENS[Math.floor(n / 10)];
  if (!u) return tens;
  const unit = u === 1 ? (f ? 'إحدى' : 'واحد') : (f ? AR_F : AR_M)[u];
  return `${unit} و${tens}`;
}

/** `construct`: the number is directly followed by a noun, so مائتان becomes مائتا (مائتا ريال). */
function ar999(n: number, f: boolean, construct: boolean): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const parts: string[] = [];
  if (h) parts.push(h === 2 && !r && construct ? 'مائتا' : AR_HUNDREDS[h]);
  if (r) parts.push(ar99(r, f));
  return parts.join(' و');
}

/**
 * Arabic number words (nominative, as used in tafqeet).
 * `f`: the counted noun is feminine. `construct`: a noun follows the number.
 */
export function arWords(int: string | bigint, f = false, construct = false): string {
  let n = BigInt(int);
  if (n === 0n) return 'صفر';
  const groups: number[] = [];
  for (let i = 0; i < 5; i++) {
    groups.unshift(Number(n % 1000n));
    n /= 1000n;
  }
  const parts: string[] = [];
  for (let i = 0; i < 4; i++) {
    const g = groups[i];
    if (!g) continue;
    const scale = AR_SCALES[3 - i];
    const lowerZero = groups.slice(i + 1).every((x) => x === 0);
    const c = construct && lowerZero;
    if (g === 1) parts.push(scale.one);
    else if (g === 2) parts.push(c ? scale.twoC : scale.two);
    else parts.push(`${ar999(g, false, true)} ${arNounFor(BigInt(g), scale, c)}`);
  }
  if (groups[4]) parts.push(ar999(groups[4], f, construct));
  return parts.join(' و');
}

/** A number with its counted noun: ريال سعودي واحد، ريالان، ثلاثة ريالات، أحد عشر ريالاً. */
export function arCount(n: bigint, noun: ArNoun): string {
  if (n === 1n) return `${noun.one} ${noun.f ? 'واحدة' : 'واحد'}`;
  if (n === 2n) return noun.two;
  return `${arWords(n, !!noun.f, true)} ${arNounFor(n, noun, false)}`;
}

/* ------------------------------------------------------------- Currencies */

type EnCurrency = { decimals: number; major: [string, string]; minor: [string, string]; prefix?: string; indian?: boolean };
type EsCurrency = { decimals: number; major: [string, string]; minor: [string, string]; format: 'fraction' | 'words'; suffix?: string; conFraction?: boolean };
type ArCurrency = { decimals: number; major: ArNoun; minor: ArNoun };

export const CURRENCIES = {
  en: {
    USD: { decimals: 2, major: ['dollar', 'dollars'], minor: ['cent', 'cents'] },
    GBP: { decimals: 2, major: ['pound', 'pounds'], minor: ['penny', 'pence'] },
    EUR: { decimals: 2, major: ['euro', 'euros'], minor: ['cent', 'cents'] },
    INR: { decimals: 2, major: ['rupee', 'rupees'], minor: ['paisa', 'paise'], prefix: 'rupees', indian: true },
    PKR: { decimals: 2, major: ['rupee', 'rupees'], minor: ['paisa', 'paisa'], prefix: 'rupees', indian: true },
    AED: { decimals: 2, major: ['dirham', 'dirhams'], minor: ['fils', 'fils'] },
    SAR: { decimals: 2, major: ['riyal', 'riyals'], minor: ['halala', 'halalas'] },
  },
  es: {
    MXN: { decimals: 2, major: ['peso', 'pesos'], minor: ['centavo', 'centavos'], format: 'fraction', suffix: 'M.N.' },
    COP: { decimals: 2, major: ['peso', 'pesos'], minor: ['centavo', 'centavos'], format: 'words', suffix: 'M/CTE' },
    PEN: { decimals: 2, major: ['sol', 'soles'], minor: ['céntimo', 'céntimos'], format: 'fraction', conFraction: true },
    EUR: { decimals: 2, major: ['euro', 'euros'], minor: ['céntimo', 'céntimos'], format: 'words' },
    USD: { decimals: 2, major: ['dólar', 'dólares'], minor: ['centavo', 'centavos'], format: 'words' },
    ARS: { decimals: 2, major: ['peso', 'pesos'], minor: ['centavo', 'centavos'], format: 'words' },
    CLP: { decimals: 0, major: ['peso', 'pesos'], minor: ['', ''], format: 'words' },
  },
  ar: {
    SAR: {
      decimals: 2,
      major: { one: 'ريال سعودي', two: 'ريالان سعوديان', few: 'ريالات سعودية', many: 'ريالاً سعودياً' },
      minor: { one: 'هللة', two: 'هللتان', few: 'هللات', many: 'هللة', f: true },
    },
    AED: {
      decimals: 2,
      major: { one: 'درهم إماراتي', two: 'درهمان إماراتيان', few: 'دراهم إماراتية', many: 'درهماً إماراتياً' },
      minor: { one: 'فلس', two: 'فلسان', few: 'فلوس', many: 'فلساً' },
    },
    KWD: {
      decimals: 3,
      major: { one: 'دينار كويتي', two: 'ديناران كويتيان', few: 'دنانير كويتية', many: 'ديناراً كويتياً' },
      minor: { one: 'فلس', two: 'فلسان', few: 'فلوس', many: 'فلساً' },
    },
    JOD: {
      decimals: 3,
      major: { one: 'دينار أردني', two: 'ديناران أردنيان', few: 'دنانير أردنية', many: 'ديناراً أردنياً' },
      minor: { one: 'فلس', two: 'فلسان', few: 'فلوس', many: 'فلساً' },
    },
    EGP: {
      decimals: 2,
      major: { one: 'جنيه مصري', two: 'جنيهان مصريان', few: 'جنيهات مصرية', many: 'جنيهاً مصرياً' },
      minor: { one: 'قرش', two: 'قرشان', few: 'قروش', many: 'قرشاً' },
    },
    QAR: {
      decimals: 2,
      major: { one: 'ريال قطري', two: 'ريالان قطريان', few: 'ريالات قطرية', many: 'ريالاً قطرياً' },
      minor: { one: 'درهم', two: 'درهمان', few: 'دراهم', many: 'درهماً' },
    },
    USD: {
      decimals: 2,
      major: { one: 'دولار أمريكي', two: 'دولاران أمريكيان', few: 'دولارات أمريكية', many: 'دولاراً أمريكياً' },
      minor: { one: 'سنت', two: 'سنتان', few: 'سنتات', many: 'سنتاً' },
    },
  },
} satisfies { en: Record<string, EnCurrency>; es: Record<string, EsCurrency>; ar: Record<string, ArCurrency> };

export const DEFAULT_CURRENCY: Record<Lang, string> = { en: 'USD', es: 'MXN', ar: 'SAR' };

export type WordsOptions = {
  /** Currency code from CURRENCIES[lang], or '' for a plain number. */
  currency: string;
  /** English only: "… and 56/100 dollars" as written on a cheque. */
  cheque?: boolean;
  /** English only: British "and". */
  and?: boolean;
  /** English only: lakh and crore. */
  indian?: boolean;
  /** English "… only" / Arabic "فقط … لا غير". */
  only?: boolean;
  letterCase?: LetterCase;
};

const pad = (n: number, decimals: number) => String(n).padStart(decimals, '0');
const MINUS: Record<Lang, string> = { en: 'minus', es: 'menos', ar: 'سالب' };
const POINT: Record<Lang, string> = { en: 'point', es: 'coma', ar: 'فاصلة' };
const ZERO: Record<Lang, string> = { en: 'zero', es: 'cero', ar: 'صفر' };

function plainNumber(lang: Lang, a: Amount, o: WordsOptions): string {
  const whole = lang === 'en' ? enWords(a.int, o) : lang === 'es' ? esWords(a.int) : arWords(a.int);
  if (!a.frac) return whole;
  let frac: string;
  if (lang === 'en') frac = [...a.frac].map((d) => EN_ONES[+d]).join(' ');
  else {
    // "3,05" is read "tres coma cero cinco": leading zeros, then the rest as a number.
    const zeros = a.frac.match(/^0*/)![0].length;
    const rest = a.frac.slice(zeros);
    const words = [...Array(zeros).fill(ZERO[lang]), ...(rest ? [lang === 'es' ? esWords(rest) : arWords(rest)] : [])];
    frac = words.join(' ');
  }
  return `${whole} ${POINT[lang]} ${frac}`;
}

function enMoney(c: EnCurrency, major: bigint, minor: number, o: WordsOptions): string {
  const opts = { and: o.and, indian: o.indian ?? c.indian };
  const noun = (n: bigint | number, forms: [string, string]) => (BigInt(n) === 1n ? forms[0] : forms[1]);
  if (o.cheque) return `${enWords(major, opts)} and ${pad(minor, c.decimals)}/${10 ** c.decimals} ${c.major[1]}`;
  const minorText = minor ? `${enWords(BigInt(minor), opts)} ${noun(minor, c.minor)}` : '';
  if (c.prefix) return `${c.prefix} ${enWords(major, opts)}` + (minorText ? ` and ${minorText}` : '');
  if (major === 0n && minor) return minorText;
  return `${enWords(major, opts)} ${noun(major, c.major)}` + (minorText ? ` and ${minorText}` : '');
}

function esMoney(c: EsCurrency, major: bigint, minor: number): string {
  const whole = esWords(major, true) + (esNeedsDe(major) ? ' de' : '');
  const noun = major === 1n ? c.major[0] : c.major[1];
  if (c.format === 'fraction') {
    const frac = `${pad(minor, c.decimals)}/${10 ** c.decimals}`;
    // Peru (SUNAT): "mil doscientos con 56/100 soles"; Mexico: "mil doscientos pesos 56/100 M.N."
    const text = c.conFraction ? `${esWords(major)} con ${frac} ${c.major[1]}` : `${whole} ${noun} ${frac}`;
    return c.suffix ? `${text} ${c.suffix}` : text;
  }
  const parts = major || !minor ? [`${whole} ${noun}`] : [];
  if (minor) parts.push(`${esWords(BigInt(minor), true)} ${minor === 1 ? c.minor[0] : c.minor[1]}`);
  const text = parts.join(' con ');
  return c.suffix ? `${text} ${c.suffix}` : text;
}

function arMoney(c: ArCurrency, major: bigint, minor: number): string {
  const parts: string[] = [];
  if (major) parts.push(arCount(major, c.major));
  if (minor) parts.push(arCount(BigInt(minor), c.minor));
  return parts.length ? parts.join(' و') : `صفر ${c.major.one}`;
}

export function applyCase(s: string, c: LetterCase, lang: Lang): string {
  if (lang === 'ar') return s;
  const up = (w: string) => w.toLocaleUpperCase(lang);
  if (c === 'upper') return up(s);
  if (c === 'lower') return s;
  if (c === 'sentence') return up(s.charAt(0)) + s.slice(1);
  const small = new Set(['and', 'y', 'con', 'de']);
  return s.replace(/[^\s-]+/g, (w, i) => (i > 0 && small.has(w) ? w : up(w.charAt(0)) + w.slice(1)));
}

/** The full sentence for a parsed amount. */
export function toWords(lang: Lang, a: Amount, o: WordsOptions): string {
  let text: string;
  const cur = o.currency ? (CURRENCIES[lang] as Record<string, EnCurrency | EsCurrency | ArCurrency>)[o.currency] : undefined;
  if (!cur) text = plainNumber(lang, a, o);
  else {
    const { major, minor } = splitMoney(a, cur.decimals);
    if (lang === 'en') text = enMoney(cur as EnCurrency, major, minor, o);
    else if (lang === 'es') text = esMoney(cur as EsCurrency, major, minor);
    else text = arMoney(cur as ArCurrency, major, minor);
  }
  if (a.negative && /[1-9]/.test(a.int + a.frac)) text = `${MINUS[lang]} ${text}`;
  if (o.only && cur) text = lang === 'ar' ? `فقط ${text} لا غير` : lang === 'en' ? `${text} only` : text;
  return applyCase(text, o.letterCase ?? 'sentence', lang);
}
