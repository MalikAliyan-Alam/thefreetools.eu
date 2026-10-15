import type { GuideContent } from '../types';
import { HIJRI_MONTHS, hijriMonthLength, hijriToGregorian, weekday, type YMD } from '../../tools/hijri/engine';

// Every date in these guides is computed from the Umm al-Qura engine at build time.
const YEAR = 1448;
const g = (m: number, d: number) => hijriToGregorian({ y: YEAR, m, d })!;

function fmt(locale: 'en' | 'ar', date: YMD, withWeekday = true) {
  const t = Date.UTC(date.y, date.m - 1, date.d);
  const loc = locale === 'ar' ? 'ar-u-nu-latn' : 'en-GB';
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
  if (withWeekday) opts.weekday = 'long';
  return new Intl.DateTimeFormat(loc, opts).format(t);
}

function monthTable(locale: 'en' | 'ar') {
  const head =
    locale === 'ar'
      ? '<tr><th>الشهر</th><th>أول يوم (ميلادي)</th><th>عدد الأيام</th></tr>'
      : '<tr><th>Month</th><th>Starts on</th><th>Days</th></tr>';
  const rows = HIJRI_MONTHS[locale]
    .map((name, i) => `<tr><td>${i + 1}. ${name}</td><td>${fmt(locale, g(i + 1, 1))}</td><td>${hijriMonthLength(YEAR, i + 1)}</td></tr>`)
    .join('\n');
  return `<table><thead>${head}</thead><tbody>\n${rows}\n</tbody></table>`;
}

const ramadanStart = (y: number) => hijriToGregorian({ y, m: 9, d: 1 })!;
const moreDates = (locale: 'en' | 'ar') => {
  const rows: [string, YMD][] =
    locale === 'ar'
      ? [
          ['رأس السنة الهجرية (1 محرم)', g(1, 1)],
          ['يوم عاشوراء (10 محرم)', g(1, 10)],
          ['المولد النبوي (12 ربيع الأول)', g(3, 12)],
          ['ليلة الإسراء والمعراج (27 رجب)', g(7, 27)],
          ['ليلة النصف من شعبان (15 شعبان)', g(8, 15)],
          ['ليلة 27 رمضان', g(9, 27)],
        ]
      : [
          ['Islamic New Year (1 Muharram)', g(1, 1)],
          ['Day of Ashura (10 Muharram)', g(1, 10)],
          ['Mawlid (12 Rabi al-Awwal)', g(3, 12)],
          ['Isra and Mi\'raj (27 Rajab)', g(7, 27)],
          ['Mid-Shaban (15 Shaban)', g(8, 15)],
          ['27 Ramadan', g(9, 27)],
        ];
  const head = locale === 'ar' ? '<tr><th>المناسبة</th><th>التاريخ المتوقع</th></tr>' : '<tr><th>Occasion</th><th>Expected date</th></tr>';
  return `<table><thead>${head}</thead><tbody>\n${rows.map(([n, d]) => `<tr><td>${n}</td><td>${fmt(locale, d)}</td></tr>`).join('\n')}\n</tbody></table>`;
};
const ramadanShift = (locale: 'en' | 'ar') => {
  const head = locale === 'ar' ? '<tr><th>السنة الهجرية</th><th>1 رمضان يوافق</th></tr>' : '<tr><th>Hijri year</th><th>1 Ramadan falls on</th></tr>';
  return `<table><thead>${head}</thead><tbody>\n${[1446, 1447, 1448, 1449]
    .map((y) => `<tr><td>${y}${locale === 'ar' ? 'هـ' : ' AH'}</td><td>${fmt(locale, ramadanStart(y))}</td></tr>`)
    .join('\n')}\n</tbody></table>`;
};
const start = g(1, 1);
const end = hijriToGregorian({ y: YEAR + 1, m: 1, d: 1 })!;
const lengthOfYear = HIJRI_MONTHS.en.reduce((sum, _, i) => sum + hijriMonthLength(YEAR, i + 1)!, 0);

const keyDates = (locale: 'en' | 'ar') => {
  const rows =
    locale === 'ar'
      ? [
          ['بداية رمضان (1 رمضان)', g(9, 1)],
          ['عيد الفطر (1 شوال)', g(10, 1)],
          ['يوم عرفة (9 ذو الحجة)', g(12, 9)],
          ['عيد الأضحى (10 ذو الحجة)', g(12, 10)],
          ['رأس السنة 1449 (1 محرم)', end],
        ]
      : [
          ['Ramadan begins (1 Ramadan)', g(9, 1)],
          ['Eid al-Fitr (1 Shawwal)', g(10, 1)],
          ['Day of Arafah (9 Dhu al-Hijjah)', g(12, 9)],
          ['Eid al-Adha (10 Dhu al-Hijjah)', g(12, 10)],
          ['Islamic New Year 1449 (1 Muharram)', end],
        ];
  const head = locale === 'ar' ? '<tr><th>المناسبة</th><th>التاريخ حسب أم القرى</th></tr>' : '<tr><th>Date</th><th>Umm al-Qura date</th></tr>';
  return `<table><thead>${head}</thead><tbody>\n${rows
    .map(([name, date]) => `<tr><td>${name}</td><td>${fmt(locale, date as YMD)}</td></tr>`)
    .join('\n')}\n</tbody></table>`;
};

export const hijri1448En: GuideContent = {
  key: 'hijri-1448',
  tool: 'hijri',
  slug: 'hijri-calendar-1448',
  metaTitle: `Hijri Year ${YEAR} Starts ${fmt('en', start, false)}: Full Calendar`,
  metaDescription: `${YEAR} AH is ${start.y}–${end.y} in the Gregorian calendar. Hijri year ${YEAR} runs from ${fmt('en', start, false)} to ${fmt('en', g(12, hijriMonthLength(YEAR, 12)!), false)}. Start date and length of every month, plus Ramadan, Eid and Arafah dates (Umm al-Qura).`,
  h1: `Hijri calendar ${YEAR} with Gregorian dates`,
  answer: `Hijri year ${YEAR} began on ${fmt('en', start)} and has ${lengthOfYear} days under the Umm al-Qura calendar. Ramadan ${YEAR} is expected to begin on ${fmt('en', g(9, 1))}, subject to moon sighting.`,
  sections: [
    { heading: `Start of every month in ${YEAR} AH`, html: monthTable('en') },
    {
      heading: 'Ramadan, Eid and Arafah',
      html: `${keyDates('en')}
<p>These are Umm al-Qura dates, calculated in advance. The official start of Ramadan and the Eids is announced after the crescent moon is sighted, so it can move by one day. Check the announcement in your country close to the date.</p>`,
    },
    {
      heading: 'Convert any other date',
      html: `<p>Use the <a href="/hijri-converter/">Hijri date converter</a> to turn any Hijri date into a Gregorian one, or the other way round, with the weekday.</p>`,
    },
    {
      heading: 'Other dates people look for',
      html: `${moreDates('en')}
<p>Ashura, the Mawlid and the nights of Rajab and Shaban are observed by some communities and not by others, and Laylat al-Qadr is sought in the last ten nights of Ramadan rather than fixed on one date. The 27th is the night many people observe. Treat the dates above as the calendar position of each day, not as a ruling.</p>`,
    },
    {
      heading: 'Why Ramadan keeps moving earlier',
      html: `${ramadanShift('en')}
<p>A Hijri year is 354 or 355 days, about 11 days shorter than a Gregorian year, so every date moves roughly 11 days earlier on the Gregorian calendar each year. Ramadan therefore travels through all the seasons over about 33 years. In ${YEAR} it falls in the second week of February.</p>`,
    },
    {
      heading: 'How Umm al-Qura decides each month',
      html: `<p>The Umm al-Qura calendar, the civil calendar of Saudi Arabia, starts a month the day after the 29th if two conditions are met in Mecca: the new moon (the conjunction) happens before sunset, and the Moon sets after the Sun. If either is missed, the month has 30 days. This rule has been used since 1423 AH (about 2002). Because it works from calculation, it does not check that the crescent can actually be seen, which is one reason why moon-sighting countries sometimes start a month a day later. More in <a href="/guides/umm-al-qura-vs-moon-sighting/">Umm al-Qura vs moon sighting</a>.</p>`,
    },
  ],
  faq: [
    {
      q: `How many days are in Hijri year ${YEAR}?`,
      a: `${lengthOfYear} days under Umm al-Qura. Hijri years have 354 or 355 days because each month has 29 or 30 days.`,
    },
    {
      q: 'Why might my country’s dates differ from this table?',
      a: 'Some countries follow local moon sighting instead of Umm al-Qura, so a month can start a day earlier or later.',
    },
    {
      q: `When does Ramadan ${YEAR} start?`,
      a: `Umm al-Qura gives ${fmt('en', g(9, 1))}. The local start depends on the crescent being sighted the evening before.`,
    },
    {
      q: `When is Eid al-Adha ${YEAR}?`,
      a: `10 Dhu al-Hijjah ${YEAR} is ${fmt('en', g(12, 10))} by Umm al-Qura, and the Day of Arafah is the day before (${fmt('en', g(12, 9))}).`,
    },
  ],
  published: '2026-09-26',
  updated: '2026-10-15',
};

export const hijri1448Ar: GuideContent = {
  key: 'hijri-1448',
  tool: 'hijri',
  slug: 'hijri-calendar-1448',
  metaTitle: `السنة الهجرية ${YEAR} تبدأ ${fmt('ar', start, false)}: التقويم الكامل بالميلادي`,
  metaDescription: `${YEAR} هـ يوافق ${start.y}–${end.y} م. تبدأ السنة الهجرية ${YEAR} في ${fmt('ar', start, false)} وتنتهي في ${fmt('ar', g(12, hijriMonthLength(YEAR, 12)!), false)}. بداية كل شهر وعدد أيامه، ومواعيد رمضان والعيدين ويوم عرفة حسب تقويم أم القرى.`,
  h1: `التقويم الهجري ${YEAR} بالميلادي`,
  answer: `بدأت السنة الهجرية ${YEAR} يوم ${fmt('ar', start)}، وعدد أيامها ${lengthOfYear} يوماً حسب تقويم أم القرى. ويُتوقع أن يبدأ رمضان ${YEAR} يوم ${fmt('ar', g(9, 1))}، والموعد النهائي يتحدد برؤية الهلال.`,
  sections: [
    { heading: `بداية كل شهر في عام ${YEAR} هـ`, html: monthTable('ar') },
    {
      heading: 'رمضان والعيدان ويوم عرفة',
      html: `${keyDates('ar')}
<p>هذه تواريخ تقويم أم القرى المحسوبة مسبقاً. أما بداية رمضان والعيدين رسمياً فتُعلن بعد تحري الهلال، وقد تتقدم أو تتأخر يوماً واحداً، لذلك تابع الإعلان الرسمي قرب الموعد.</p>`,
    },
    {
      heading: 'حوّل أي تاريخ آخر',
      html: `<p>استخدم <a href="/ar/hijri-converter/">أداة تحويل التاريخ</a> لتحويل أي تاريخ هجري إلى ميلادي أو العكس مع اسم اليوم.</p>`,
    },
    {
      heading: 'مناسبات أخرى يبحث عنها الناس',
      html: `${moreDates('ar')}
<p>عاشوراء والمولد النبوي وليالي رجب وشعبان يحييها بعض الناس دون بعض، وليلة القدر تُطلب في العشر الأواخر من رمضان ولا تُحدد بتاريخ واحد، وليلة السابع والعشرين هي الأشهر عند كثيرين. فاعتبر التواريخ أعلاه موقع اليوم في التقويم، وليست حكماً شرعياً.</p>`,
    },
    {
      heading: 'لماذا يتقدم رمضان كل سنة؟',
      html: `${ramadanShift('ar')}
<p>السنة الهجرية 354 أو 355 يوماً، أي أقصر من الميلادية بنحو 11 يوماً، فيتقدم كل تاريخ هجري نحو 11 يوماً في التقويم الميلادي كل عام. ولذلك يدور رمضان على الفصول الأربعة خلال نحو 33 سنة. وفي ${YEAR}هـ يقع في الأسبوع الثاني من فبراير.</p>`,
    },
    {
      heading: 'كيف يحدد تقويم أم القرى بداية كل شهر؟',
      html: `<p>تقويم أم القرى هو التقويم المدني في السعودية. يبدأ الشهر في اليوم التالي للتاسع والعشرين إذا تحقق شرطان في مكة المكرمة: أن يقع الاقتران (ولادة الهلال) قبل غروب الشمس، وأن يغيب القمر بعد غروب الشمس. فإن لم يتحقق أحدهما أُتم الشهر ثلاثين يوماً. وهذه القاعدة معمول بها منذ 1423هـ تقريباً. ولأن التقويم يعتمد الحساب، فهو لا يتأكد من إمكانية رؤية الهلال فعلاً، وهذا أحد أسباب تأخر بداية الشهر يوماً في الدول التي تعتمد الرؤية. المزيد في <a href="/ar/guides/umm-al-qura-vs-moon-sighting/">الفرق بين أم القرى ورؤية الهلال</a>.</p>`,
    },
  ],
  faq: [
    {
      q: `كم عدد أيام السنة الهجرية ${YEAR}؟`,
      a: `${lengthOfYear} يوماً حسب تقويم أم القرى. السنة الهجرية 354 أو 355 يوماً لأن كل شهر 29 أو 30 يوماً.`,
    },
    {
      q: 'لماذا قد تختلف التواريخ في بلدي عن هذا الجدول؟',
      a: 'بعض الدول تعتمد الرؤية المحلية للهلال بدلاً من تقويم أم القرى، فقد يبدأ الشهر عندها قبل أو بعد يوم واحد.',
    },
    {
      q: `متى يبدأ رمضان ${YEAR}؟`,
      a: `${fmt('ar', g(9, 1))} بحسب أم القرى، والبداية المحلية تعتمد على رؤية الهلال مساء اليوم السابق.`,
    },
    {
      q: `متى عيد الأضحى ${YEAR}؟`,
      a: `10 ذو الحجة ${YEAR} يوافق ${fmt('ar', g(12, 10))} بحسب أم القرى، ويوم عرفة قبله بيوم (${fmt('ar', g(12, 9))}).`,
    },
  ],
  published: '2026-09-26',
  updated: '2026-10-15',
};
