import type { GuideContent } from '../types';
import { gregorianAge, hijriAge, totalDays } from '../../tools/age/engine';
import { gregorianToHijri } from '../../tools/hijri/engine';

// Example values come from the engines, so the text always matches the tool.
const BIRTH = { y: 1990, m: 5, d: 15 };
const ON = { y: 2026, m: 9, d: 26 };
const g = gregorianAge(BIRTH, ON);
const h = hijriAge(BIRTH, ON);
const days = totalDays(BIRTH, ON);
const bh = gregorianToHijri(BIRTH);
const RATIO = (365.2425 / 354.367).toFixed(4); // mean Gregorian year / mean Hijri year
const tricky = gregorianAge({ y: 2000, m: 1, d: 31 }, { y: 2025, m: 3, d: 1 });

const P = '2026-09-26';

export const ageManualEn: GuideContent = {
  key: 'age-manual',
  tool: 'age',
  slug: 'how-to-calculate-age',
  metaTitle: 'How to Calculate Age in Years, Months and Days (by Hand)',
  metaDescription:
    'Subtract years, then months, then days, borrowing when a number goes negative. A worked example, the month-end rule for the 31st, and 29 February birthdays.',
  h1: 'How to calculate age in years, months and days',
  answer:
    'Subtract the birth year from the current year, the birth month from the current month and the birth day from the current day. If the days are negative, borrow one month; if the months are negative, borrow one year.',
  sections: [
    {
      heading: 'Step by step',
      html: `<p>Born <strong>15 May 1990</strong>, age on <strong>26 September 2026</strong>:</p>
<table><thead><tr><th></th><th>Year</th><th>Month</th><th>Day</th></tr></thead><tbody>
<tr><td>Today</td><td>2026</td><td>9</td><td>26</td></tr>
<tr><td>Birth</td><td>1990</td><td>5</td><td>15</td></tr>
<tr><td><strong>Difference</strong></td><td><strong>${g.years}</strong></td><td><strong>${g.months}</strong></td><td><strong>${g.days}</strong></td></tr></tbody></table>
<p>Nothing went negative, so the age is <strong>${g.years} years, ${g.months} months, ${g.days} days</strong>, or ${days.toLocaleString('en')} days in total.</p>`,
    },
    {
      heading: 'When the days go negative',
      html: `<p>If today's day is smaller than the birth day, take one month away and count the days from your last "monthly birthday". Born 10 June 2000, on 5 September 2026: months = 9 − 6 = 3, but days = 5 − 10 is negative, so it's 2 months plus the days from 10 August to 5 September (26 days): <strong>26 years, 2 months, 26 days</strong>.</p>`,
    },
    {
      heading: 'Born on the 31st, or on 29 February',
      html: `<p>Shorter months don't have a 31st, so the monthly birthday falls on the month's last day instead. Born 31 January 2000, on 1 March 2025: one month takes you to 28 February, plus 1 day, so <strong>${tricky.years} years, ${tricky.months} month, ${tricky.days} day</strong>.</p>
<p>For 29 February birthdays, this site counts 1 March as the birthday in non-leap years. Some countries use 28 February for legal age, so check local rules when it matters.</p>`,
    },
    {
      heading: 'Skip the arithmetic',
      html: `<p>The <a href="/age-calculator/">age calculator</a> does all of this instantly, adds your age in Hijri years and shows days until your next birthday.</p>`,
    },
  ],
  published: P,
  updated: P,
};

export const ageHijriEn: GuideContent = {
  key: 'age-hijri-vs-gregorian',
  tool: 'age',
  slug: 'age-in-hijri-vs-gregorian-years',
  metaTitle: 'Hijri vs Gregorian Age: Why Your Hijri Age Is Higher',
  metaDescription: `A Hijri year is about 11 days shorter, so your Hijri age runs ahead: multiply your Gregorian age by about ${RATIO}. Worked example with Umm al-Qura dates.`,
  h1: 'Age in Hijri vs Gregorian years',
  answer: `Your Hijri age is higher because a Hijri year (354–355 days) is about 11 days shorter than a Gregorian year. As a rule of thumb, Hijri age ≈ Gregorian age × ${RATIO}, which adds about one year every 33 years.`,
  sections: [
    {
      heading: 'The numbers',
      html: `<table><thead><tr><th></th><th>Gregorian</th><th>Hijri</th></tr></thead><tbody>
<tr><td>Average year length</td><td>365.24 days</td><td>354.37 days</td></tr>
<tr><td>Month length</td><td>28–31 days</td><td>29–30 days</td></tr></tbody></table>
<p class="formula">Hijri age ≈ Gregorian age × 365.2425 ÷ 354.367 ≈ Gregorian age × ${RATIO}</p>`,
    },
    {
      heading: 'Worked example',
      html: `<p>Born 15 May 1990 (${bh.d} Shawwal ${bh.y} AH), on 26 September 2026:</p>
<ul><li>Gregorian age: <strong>${g.years} years, ${g.months} months, ${g.days} days</strong></li>
<li>Hijri age: <strong>${h.years} years, ${h.months} months, ${h.days} days</strong></li></ul>
<p>The Hijri age is ahead by about a year, as the rule of thumb predicts.</p>`,
    },
    {
      heading: 'When the exact Hijri age matters',
      html: `<p>Some Saudi government forms and older documents record dates in Hijri. For an exact figure, use the <a href="/age-calculator/">age calculator</a>, which shows both ages side by side using the Umm al-Qura calendar.</p>`,
    },
  ],
  published: P,
  updated: P,
};

export const ageHijriAr: GuideContent = {
  key: 'age-hijri-vs-gregorian',
  tool: 'hijri-age',
  slug: 'age-hijri-vs-gregorian',
  metaTitle: 'الفرق بين العمر بالهجري والميلادي ولماذا العمر الهجري أكبر',
  metaDescription: `السنة الهجرية أقصر بنحو 11 يوماً، لذلك يكون عمرك بالهجري أكبر: اضرب عمرك الميلادي في ${RATIO} تقريباً. مثال محسوب بتقويم أم القرى.`,
  h1: 'الفرق بين العمر بالهجري والميلادي',
  answer: `عمرك بالهجري أكبر لأن السنة الهجرية (354 أو 355 يوماً) أقصر من الميلادية بنحو 11 يوماً. وبشكل تقريبي: العمر بالهجري ≈ العمر بالميلادي × ${RATIO}، أي سنة إضافية كل 33 سنة تقريباً.`,
  sections: [
    {
      heading: 'الأرقام',
      html: `<table><thead><tr><th></th><th>الميلادي</th><th>الهجري</th></tr></thead><tbody>
<tr><td>متوسط طول السنة</td><td>365.24 يوماً</td><td>354.37 يوماً</td></tr>
<tr><td>طول الشهر</td><td>28 إلى 31 يوماً</td><td>29 أو 30 يوماً</td></tr></tbody></table>
<p class="formula">العمر بالهجري ≈ العمر بالميلادي × 365.2425 ÷ 354.367 ≈ العمر بالميلادي × ${RATIO}</p>`,
    },
    {
      heading: 'مثال',
      html: `<p>من وُلد في 15 مايو 1990م (${bh.d} شوال ${bh.y}هـ)، يكون عمره في 26 سبتمبر 2026م:</p>
<ul><li>بالميلادي: <strong>${g.years} سنة و${g.months} أشهر و${g.days} يوماً</strong></li>
<li>بالهجري: <strong>${h.years} سنة و${h.months} أشهر و${h.days} يوماً</strong></li></ul>
<p>أي أن العمر الهجري يزيد بنحو سنة كما تتوقع القاعدة التقريبية.</p>`,
    },
    {
      heading: 'متى تحتاج العمر الهجري الدقيق؟',
      html: `<p>بعض النماذج الحكومية والوثائق القديمة في السعودية تسجل التواريخ بالهجري. وللحصول على الرقم الدقيق استخدم <a href="/ar/hijri-age-calculator/">حساب العمر بالهجري</a>، أو <a href="/ar/age-calculator/">حساب العمر</a> لعرض العمرين معاً.</p>`,
    },
  ],
  published: P,
  updated: P,
};

const excelTable = (es: boolean) =>
  es
    ? `<table><thead><tr><th>Quieres</th><th>Fórmula (A2 = fecha de nacimiento)</th><th>Resultado del ejemplo</th></tr></thead><tbody>
<tr><td>Años cumplidos</td><td><code>=SIFECHA(A2;HOY();"Y")</code></td><td>${g.years}</td></tr>
<tr><td>Meses después de los años</td><td><code>=SIFECHA(A2;HOY();"YM")</code></td><td>${g.months}</td></tr>
<tr><td>Días después de los meses</td><td><code>=SIFECHA(A2;HOY();"MD")</code></td><td>${g.days}</td></tr>
<tr><td>Total de días</td><td><code>=HOY()-A2</code></td><td>${days.toLocaleString('es')}</td></tr></tbody></table>`
    : `<table><thead><tr><th>You want</th><th>Formula (A2 = date of birth)</th><th>Example result</th></tr></thead><tbody>
<tr><td>Completed years</td><td><code>=DATEDIF(A2,TODAY(),"Y")</code></td><td>${g.years}</td></tr>
<tr><td>Months after the years</td><td><code>=DATEDIF(A2,TODAY(),"YM")</code></td><td>${g.months}</td></tr>
<tr><td>Days after the months</td><td><code>=DATEDIF(A2,TODAY(),"MD")</code></td><td>${g.days}</td></tr>
<tr><td>Total days</td><td><code>=TODAY()-A2</code></td><td>${days.toLocaleString('en')}</td></tr></tbody></table>`;

export const ageExcelEn: GuideContent = {
  key: 'age-excel',
  tool: 'age',
  slug: 'calculate-age-in-excel',
  metaTitle: 'How to Calculate Age in Excel and Google Sheets (DATEDIF)',
  metaDescription:
    'Copy-paste DATEDIF formulas for age in years, months and days in Excel or Google Sheets, a one-cell version, and the "MD" pitfall to avoid.',
  h1: 'How to calculate age in Excel',
  answer: 'Put the date of birth in A2 and use =DATEDIF(A2,TODAY(),"Y") for completed years. Add "YM" and "MD" for the remaining months and days. It works the same in Google Sheets.',
  sections: [
    {
      heading: 'The formulas',
      html: `<p>Example: A2 contains 15/05/1990 and today is 26 September 2026.</p>${excelTable(false)}`,
    },
    {
      heading: 'Everything in one cell',
      html: `<p class="formula">=DATEDIF(A2,TODAY(),"Y")&" years, "&DATEDIF(A2,TODAY(),"YM")&" months, "&DATEDIF(A2,TODAY(),"MD")&" days"</p>
<p>To get the age on a fixed date instead of today, replace <code>TODAY()</code> with a cell that holds that date.</p>`,
    },
    {
      heading: 'Watch out for "MD"',
      html: `<p>Microsoft notes that the "MD" unit can return a negative or wrong number in some end-of-month cases (for example birthdays on the 31st). If the day count looks odd, check it with the <a href="/age-calculator/">age calculator</a>, which handles month ends explicitly.</p>
<p><code>DATEDIF</code> doesn't appear in Excel's function autocomplete, but it works when you type it in full.</p>`,
    },
  ],
  published: P,
  updated: P,
};

export const ageExcelEs: GuideContent = {
  key: 'age-excel',
  tool: 'age',
  slug: 'calcular-edad-en-excel',
  metaTitle: 'Cómo calcular la edad en Excel (SIFECHA) y Google Sheets',
  metaDescription:
    'Fórmulas para calcular la edad en años, meses y días con SIFECHA en Excel en español y Google Sheets, la versión en una sola celda y un error conocido.',
  h1: 'Cómo calcular la edad en Excel',
  answer: 'Con la fecha de nacimiento en A2, usa =SIFECHA(A2;HOY();"Y") para los años cumplidos, y "YM" y "MD" para los meses y días que sobran. En Excel en inglés la función se llama DATEDIF.',
  sections: [
    {
      heading: 'Las fórmulas',
      html: `<p>Ejemplo: A2 tiene 15/05/1990 y hoy es 26 de septiembre de 2026.</p>${excelTable(true)}
<p>Si tu Excel usa coma como separador de argumentos, cambia <code>;</code> por <code>,</code>.</p>`,
    },
    {
      heading: 'Todo en una celda',
      html: `<p class="formula">=SIFECHA(A2;HOY();"Y")&" años, "&SIFECHA(A2;HOY();"YM")&" meses y "&SIFECHA(A2;HOY();"MD")&" días"</p>
<p>Para calcular la edad a una fecha concreta (por ejemplo, al 31 de diciembre), cambia <code>HOY()</code> por la celda con esa fecha.</p>`,
    },
    {
      heading: 'Cuidado con "MD"',
      html: `<p>Microsoft advierte que la unidad "MD" puede dar un número negativo o incorrecto en algunos casos de fin de mes (por ejemplo, si naciste un día 31). Si el resultado se ve raro, compruébalo con la <a href="/es/calcular-edad/">calculadora de edad</a>.</p>
<p><code>SIFECHA</code> no aparece en el autocompletado de Excel, pero funciona si la escribes completa.</p>`,
    },
  ],
  published: P,
  updated: P,
};
