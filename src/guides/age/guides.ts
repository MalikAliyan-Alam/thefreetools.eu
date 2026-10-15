import type { GuideContent } from '../types';
import { gregorianAge, hijriAge, totalDays } from '../../tools/age/engine';
import { gregorianToHijri, hijriToGregorian, HIJRI_MONTHS } from '../../tools/hijri/engine';

// Example values come from the engines, so the text always matches the tool.
const BIRTH = { y: 1990, m: 5, d: 15 };
const ON = { y: 2026, m: 9, d: 26 };
const g = gregorianAge(BIRTH, ON);
const h = hijriAge(BIRTH, ON);
const days = totalDays(BIRTH, ON);
const bh = gregorianToHijri(BIRTH);
const RATIO = (365.2425 / 354.367).toFixed(4); // mean Gregorian year / mean Hijri year
const tricky = gregorianAge({ y: 2000, m: 1, d: 31 }, { y: 2025, m: 3, d: 1 });

const D = '2026-10-15';
const HIJRI_AR = HIJRI_MONTHS.ar;
const HIJRI_EN = HIJRI_MONTHS.en;
const born = (y: number, m: number, d: number) => ({ y, m, d });
const ageOf = (b: { y: number; m: number; d: number }) => gregorianAge(b, ON);
const hAgeOf = (b: { y: number; m: number; d: number }) => hijriAge(b, ON);
const spanEn = (a: { years: number; months: number; days: number }) => `${a.years} years, ${a.months} months, ${a.days} days`;
const spanAr = (a: { years: number; months: number; days: number }) => `${a.years} سنة و${a.months} أشهر و${a.days} يوماً`;
const greg = (loc: string, d: { y: number; m: number; d: number }) =>
  new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(d.y, d.m - 1, d.d));
const hijriBirthdayIn = (hy: number) => hijriToGregorian({ y: hy, m: bh.m, d: bh.d })!;
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
<p>For 29 February birthdays, this site counts 28 February as the birthday in common years, the last day of the month, in the same way as for the 31st. Some countries use 1 March for legal age, so check local rules when it matters.</p>`,
    },
    {
      heading: 'Skip the arithmetic',
      html: `<p>The <a href="/age-calculator/">age calculator</a> does all of this instantly, adds your age in Hijri years and shows days until your next birthday.</p>`,
    },
    {
      heading: 'Check the answer another way',
      html: `<p>Count the days and see whether they agree with the years. From 15 May 1990 to 26 September 2026 there are 36 whole years, and 9 leap days in between (1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020 and 2024):</p>
<p class="formula">36 × 365 = ${(36 * 365).toLocaleString('en')}, plus 9 leap days = ${(36 * 365 + 9).toLocaleString('en')}, plus 134 days from 15 May to 26 September = ${days.toLocaleString('en')}</p>
<p>That matches the ${days.toLocaleString('en')} days the calculator gives. As a rough test, divide by 365.2425, the average length of a Gregorian year (97 leap years in every 400): ${(days / 365.2425).toFixed(1)}, which fits 36 years and 4 months.</p>`,
    },
    {
      heading: 'Three tricky birthdays',
      html: `<p>The rule for the monthly birthday (the same day of the month, or the last day of a shorter month) gives these results on 26 September 2026:</p>
<table><thead><tr><th>Born</th><th>Age</th><th>Why</th></tr></thead><tbody>
<tr><td>31 August 2001</td><td>${spanEn(ageOf(born(2001, 8, 31)))}</td><td>September has 30 days, so the monthly birthday on 30 September has not arrived yet</td></tr>
<tr><td>30 January 2004</td><td>${spanEn(ageOf(born(2004, 1, 30)))}</td><td>The last monthly birthday was 30 August, and 27 days have passed since</td></tr>
<tr><td>29 February 2000</td><td>${spanEn(ageOf(born(2000, 2, 29)))}</td><td>The monthly birthday is the 29th: 26 years and 6 months reach 29 August 2026, and 28 days remain</td></tr></tbody></table>`,
    },
    {
      heading: 'The most common mistakes',
      html: `<ul>
<li><strong>Subtracting only the years.</strong> Someone born on 20 December 2000 is not 26 on 10 January 2026. The birthday has not happened yet, so the answer is <strong>${spanEn(gregorianAge(born(2000, 12, 20), { y: 2026, m: 1, d: 10 }))}</strong>.</li>
<li><strong>Borrowing a month of the wrong length.</strong> Count from the last monthly birthday, not from the 1st of the month.</li>
<li><strong>Forgetting leap days</strong> when you work in days. A year is 365 days only most of the time.</li>
</ul>`,
    },
    {
      heading: 'Age is not counted the same way everywhere',
      html: `<p>In the system used on this page, you are 0 on the day you are born and turn 1 on your first birthday. Traditional East Asian age counting instead starts a baby at 1 and adds a year at the New Year. South Korea moved to the international system for legal and administrative purposes in June 2023, so official documents there now use the same count as above. The Islamic calendar gives a third answer, because its year is shorter: see <a href="/guides/age-in-hijri-vs-gregorian-years/">age in Hijri vs Gregorian years</a>.</p>`,
    },
  ],
  faq: [
    {
      q: 'How do I calculate someone\'s age in days?',
      a: `Subtract the two dates. From 15 May 1990 to 26 September 2026 it is ${days.toLocaleString('en')} days.`,
    },
    {
      q: 'Is a person born on 29 February a year older on 28 February or 1 March?',
      a: 'It depends on the rule you use. This site counts 28 February in years without a leap day. Some countries treat 1 March as the legal birthday, so check the one that applies to you.',
    },
  ],
  published: P,
  updated: '2026-10-15',
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
    {
      heading: 'Why the Hijri year is shorter',
      html: `<p>A Hijri month follows the Moon, which takes about 29.53 days to go from one new moon to the next, so months last 29 or 30 days. Twelve of them make 354 or 355 days. The Gregorian year follows the Sun, 365 or 366 days. The gap is about 11 days a year, and over a lifetime it adds up: 33 Hijri years are almost exactly 32 Gregorian years (11,694 days against 11,688).</p>`,
    },
    {
      heading: 'A quick conversion table',
      html: `<table><thead><tr><th>Gregorian age</th><th>Hijri age (approx.)</th></tr></thead><tbody>
${[20, 30, 40, 50, 60].map((n) => `<tr><td>${n}</td><td>${((n * 365.2425) / 354.367).toFixed(1)}</td></tr>`).join('\n')}</tbody></table>
<p>This is only an estimate. The exact Hijri age depends on the birth date and on the Umm al-Qura month lengths, so the figure can shift by a few weeks from one person to the next.</p>`,
    },
    {
      heading: 'Three examples, all on 26 September 2026',
      html: `<table><thead><tr><th>Born</th><th>Hijri birth date</th><th>Hijri age</th><th>Gregorian age</th></tr></thead><tbody>
${[born(2000, 1, 1), born(1995, 6, 15), born(2005, 3, 20)]
  .map((b) => {
    const hb = gregorianToHijri(b);
    return `<tr><td>${greg('en', b)}</td><td>${hb.d} ${HIJRI_EN[hb.m - 1]} ${hb.y} AH</td><td>${spanEn(hAgeOf(b))}</td><td>${spanEn(ageOf(b))}</td></tr>`;
  })
  .join('\n')}</tbody></table>`,
    },
    {
      heading: 'Your Hijri birthday moves earlier every year',
      html: `<p>A birthday on ${bh.d} ${HIJRI_EN[bh.m - 1]} lands about 11 days earlier on the Gregorian calendar each year:</p>
<table><thead><tr><th>Hijri year</th><th>${bh.d} ${HIJRI_EN[bh.m - 1]} falls on</th></tr></thead><tbody>
${[1447, 1448, 1449].map((y) => `<tr><td>${y} AH</td><td>${greg('en', hijriBirthdayIn(y))}</td></tr>`).join('\n')}</tbody></table>
<p>The dates above come from the Umm al-Qura calendar, the civil calendar of Saudi Arabia, in which a month begins when the new moon is born before sunset and the Moon sets after the Sun at Mecca (the rule in force since 1423 AH, about 2002). Calendars that rely on moon sighting can differ by a day.</p>`,
    },
  ],
  faq: [
    {
      q: 'Why is my Hijri age higher than my age in years?',
      a: 'Because each Hijri year is about 11 days shorter, so you collect Hijri years faster. After 33 years the gap is about one full year.',
    },
    {
      q: 'Is there a simple formula to convert my age to Hijri?',
      a: `Multiply your Gregorian age by ${RATIO}. At 30 that gives ${((30 * 365.2425) / 354.367).toFixed(1)}. For an exact result use the date of birth.`,
    },
  ],
  published: P,
  updated: '2026-10-15',
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
    {
      heading: 'لماذا السنة الهجرية أقصر؟',
      html: `<p>الشهر الهجري يتبع القمر، وهو يحتاج نحو 29.53 يوماً من هلال إلى هلال، فتكون الأشهر 29 أو 30 يوماً. واثنا عشر شهراً تساوي 354 أو 355 يوماً. أما السنة الميلادية فتتبع الشمس، وهي 365 أو 366 يوماً. الفرق نحو 11 يوماً في السنة، وعلى مدى العمر يتراكم: 33 سنة هجرية تساوي تقريباً 32 سنة ميلادية (11,694 يوماً مقابل 11,688).</p>`,
    },
    {
      heading: 'جدول تحويل سريع',
      html: `<table><thead><tr><th>العمر بالميلادي</th><th>العمر بالهجري تقريباً</th></tr></thead><tbody>
${[20, 30, 40, 50, 60].map((n) => `<tr><td>${n}</td><td>${((n * 365.2425) / 354.367).toFixed(1)}</td></tr>`).join('\n')}</tbody></table>
<p>هذا تقدير فقط. العمر الهجري الدقيق يعتمد على تاريخ الميلاد وعلى أطوال الأشهر في أم القرى.</p>`,
    },
    {
      heading: 'ثلاثة أمثلة في 26 سبتمبر 2026م',
      html: `<table><thead><tr><th>تاريخ الميلاد</th><th>يوافق بالهجري</th><th>العمر بالهجري</th><th>العمر بالميلادي</th></tr></thead><tbody>
${[born(2000, 1, 1), born(1995, 6, 15), born(2005, 3, 20)]
  .map((b) => {
    const hb = gregorianToHijri(b);
    return `<tr><td>${greg('ar-u-nu-latn', b)}</td><td>${hb.d} ${HIJRI_AR[hb.m - 1]} ${hb.y}هـ</td><td>${spanAr(hAgeOf(b))}</td><td>${spanAr(ageOf(b))}</td></tr>`;
  })
  .join('\n')}</tbody></table>`,
    },
    {
      heading: 'عيد ميلادك الهجري يتقدم كل سنة',
      html: `<p>ميلاد في ${bh.d} ${HIJRI_AR[bh.m - 1]} يأتي بالتاريخ الميلادي قبل موعده في السنة السابقة بنحو 11 يوماً:</p>
<table><thead><tr><th>السنة الهجرية</th><th>${bh.d} ${HIJRI_AR[bh.m - 1]} يوافق</th></tr></thead><tbody>
${[1447, 1448, 1449].map((y) => `<tr><td>${y}هـ</td><td>${greg('ar-u-nu-latn', hijriBirthdayIn(y))}</td></tr>`).join('\n')}</tbody></table>
<p>هذه التواريخ بحسب تقويم أم القرى، وهو التقويم المدني المعتمد في السعودية. يبدأ الشهر فيه إذا وقع الاقتران قبل الغروب وغاب القمر بعد الشمس في مكة المكرمة، وهذه القاعدة معمول بها منذ 1423هـ تقريباً. أما التقاويم المبنية على رؤية الهلال فقد تختلف بيوم.</p>`,
    },
  ],
  faq: [
    {
      q: 'لماذا عمري بالهجري أكبر من عمري بالميلادي؟',
      a: 'لأن كل سنة هجرية أقصر بنحو 11 يوماً، فتكتمل السنوات الهجرية أسرع. وبعد 33 سنة يصبح الفرق سنة كاملة تقريباً.',
    },
    {
      q: 'هل توجد معادلة بسيطة لتحويل العمر إلى الهجري؟',
      a: `اضرب عمرك بالميلادي في ${RATIO}. عند 30 سنة تحصل على ${((30 * 365.2425) / 354.367).toFixed(1)}. وللنتيجة الدقيقة استخدم تاريخ الميلاد.`,
    },
  ],
  published: P,
  updated: '2026-10-15',
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
    {
      heading: 'Age on a fixed date',
      html: `<p>For a cut-off such as "age on 31 December 2026", put that date in B1 and use it instead of <code>TODAY()</code>: <code>=DATEDIF(A2,$B$1,"Y")</code>. The dollar signs keep B1 fixed when you fill the formula down a whole column. For 15 May 1990 the answer on 31 December 2026 is ${spanEn(gregorianAge(born(1990, 5, 15), { y: 2026, m: 12, d: 31 }))}.</p>`,
    },
    {
      heading: 'A column of birthdays with blanks',
      html: `<p>Filling the formula down a long list returns an error on empty rows. Wrap it so blank rows stay blank:</p>
<p class="formula">=IF(A2="","",DATEDIF(A2,TODAY(),"Y"))</p>`,
    },
    {
      heading: 'Errors you are likely to meet',
      html: `<ul>
<li><strong>#NUM!</strong> means the start date is later than the end date, for instance a birth date typed in the future or a year mistyped as 2099.</li>
<li><strong>#VALUE!</strong> usually means the "date" is text. Dates aligned to the left of the cell are the giveaway. Retype it, or convert it with <code>DATEVALUE</code>.</li>
<li><strong>Day and month swapped.</strong> 03/04/1990 is 3 April in most of the world and 4 March in the US. Excel reads the date the way your computer's regional settings say.</li>
<li><strong>A decimal age.</strong> <code>=(TODAY()-A2)/365.25</code> gives a decimal such as ${((days / 365.25)).toFixed(2)}. It is fine for a rough figure, but not for a birthday check, because it ignores real month lengths.</li>
</ul>`,
    },
    {
      heading: 'Google Sheets and other versions',
      html: `<p>Google Sheets accepts the same <code>DATEDIF</code> units, and <code>TODAY()</code> works unchanged. <code>DATEDIF</code> is older than the documentation: Microsoft keeps it for compatibility with Lotus 1-2-3, which is why it is missing from the function list in some versions. Sources: <a href="https://support.microsoft.com/en-us/excel/datedif-function" rel="noopener">Microsoft support, DATEDIF function</a> and <a href="https://exceljet.net/functions/datedif-function" rel="noopener">Exceljet, DATEDIF</a>.</p>`,
    },
  ],
  faq: [
    {
      q: 'Why does DATEDIF not show up when I type it?',
      a: 'It is a legacy function that Excel does not list in the autocomplete. Type the whole formula and it works.',
    },
    {
      q: 'What does #NUM! mean in an age formula?',
      a: 'The start date is later than the end date. Check that the birth date is not in the future and that both cells are real dates.',
    },
  ],
  published: P,
  updated: '2026-10-15',
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
    {
      heading: 'La edad a una fecha fija',
      html: `<p>Para un corte como "edad al 31 de diciembre de 2026", escribe esa fecha en B1 y úsala en lugar de <code>HOY()</code>: <code>=SIFECHA(A2;$B$1;"Y")</code>. Los signos de peso fijan B1 cuando arrastras la fórmula hacia abajo. Para quien nació el 15/05/1990, al 31/12/2026 son ${gregorianAge(born(1990, 5, 15), { y: 2026, m: 12, d: 31 }).years} años, ${gregorianAge(born(1990, 5, 15), { y: 2026, m: 12, d: 31 }).months} meses y ${gregorianAge(born(1990, 5, 15), { y: 2026, m: 12, d: 31 }).days} días.</p>`,
    },
    {
      heading: 'Una lista larga con filas vacías',
      html: `<p>Si arrastras la fórmula por toda la columna, las filas vacías dan error. Envuélvela para que queden en blanco:</p>
<p class="formula">=SI(A2="";"";SIFECHA(A2;HOY();"Y"))</p>`,
    },
    {
      heading: 'Errores que vas a encontrar',
      html: `<ul>
<li><strong>#¡NUM!</strong> significa que la fecha inicial es posterior a la final, por ejemplo una fecha de nacimiento en el futuro o un año mal escrito.</li>
<li><strong>#¡VALOR!</strong> casi siempre es una fecha escrita como texto. Si se alinea a la izquierda de la celda, es texto: vuelve a escribirla o conviértela con <code>FECHANUMERO</code>.</li>
<li><strong>Día y mes invertidos.</strong> 03/04/1990 es 3 de abril en México y España, pero 4 de marzo en Estados Unidos. Excel lee la fecha según la configuración regional de tu equipo.</li>
<li><strong>Edad con decimales.</strong> <code>=(HOY()-A2)/365,25</code> da un decimal como ${(days / 365.25).toFixed(2).replace('.', ',')}. Sirve para una cifra aproximada, no para saber si ya cumplió años, porque ignora la longitud real de los meses.</li>
</ul>`,
    },
    {
      heading: 'Google Sheets y otras versiones',
      html: `<p>Google Sheets acepta las mismas unidades de <code>SIFECHA</code> (en inglés, <code>DATEDIF</code>), y <code>HOY()</code> funciona igual. Es una función heredada de Lotus 1-2-3 que Microsoft mantiene por compatibilidad, y por eso no aparece en el listado de funciones de algunas versiones. Fuentes: <a href="https://support.microsoft.com/en-us/excel/datedif-function" rel="noopener">soporte de Microsoft sobre DATEDIF</a> y <a href="https://exceljet.net/functions/datedif-function" rel="noopener">Exceljet</a>.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Por qué SIFECHA no aparece al escribirla?',
      a: 'Es una función heredada que Excel no muestra en el autocompletado. Escribe la fórmula completa y funciona.',
    },
    {
      q: '¿Qué significa #¡NUM! en una fórmula de edad?',
      a: 'La fecha inicial es posterior a la final. Revisa que la fecha de nacimiento no esté en el futuro y que ambas celdas sean fechas reales.',
    },
  ],
  published: P,
  updated: '2026-10-15',
};
