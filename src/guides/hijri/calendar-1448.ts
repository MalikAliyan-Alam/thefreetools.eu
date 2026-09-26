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
  metaTitle: `Hijri Calendar ${YEAR}: Month Start Dates in Gregorian (${start.y}–${end.y})`,
  metaDescription: `Hijri year ${YEAR} runs from ${fmt('en', start, false)} to ${fmt('en', g(12, hijriMonthLength(YEAR, 12)!), false)}. Start date and length of every month, plus Ramadan, Eid and Arafah dates (Umm al-Qura).`,
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
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};

export const hijri1448Ar: GuideContent = {
  key: 'hijri-1448',
  tool: 'hijri',
  slug: 'hijri-calendar-1448',
  metaTitle: `التقويم الهجري ${YEAR} بالميلادي: بداية كل شهر وعدد أيامه`,
  metaDescription: `تبدأ السنة الهجرية ${YEAR} في ${fmt('ar', start, false)} وتنتهي في ${fmt('ar', g(12, hijriMonthLength(YEAR, 12)!), false)}. بداية كل شهر وعدد أيامه، ومواعيد رمضان والعيدين ويوم عرفة حسب تقويم أم القرى.`,
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
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};
