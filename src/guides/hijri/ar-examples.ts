import type { GuideContent } from '../types';
import { HIJRI_MONTHS, hijriToGregorian } from '../../tools/hijri/engine.ts';

// Every date below is computed from the Umm al-Qura engine at build time.
const D = '2026-10-11';
const Y = 1448;
const ar = HIJRI_MONTHS.ar;

const greg = (m: number, d: number, withDay = true) => {
  const g = hijriToGregorian({ y: Y, m, d })!;
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' };
  if (withDay) opts.weekday = 'long';
  return new Intl.DateTimeFormat('ar-u-nu-latn', opts).format(Date.UTC(g.y, g.m - 1, g.d));
};
const row = (m: number, d: number) => `<tr><td>${d}/${m}/${Y}</td><td>${d} ${ar[m - 1]} ${Y}</td><td>${greg(m, d)}</td></tr>`;

export const hijriExamplesAr: GuideContent = {
  key: 'hijri-examples-1448',
  tool: 'hijri',
  slug: 'hijri-to-gregorian-1448-examples',
  metaTitle: `تحويل التاريخ الهجري ${Y} إلى ميلادي: أمثلة محلولة بأم القرى`,
  metaDescription: `كم يوافق 8/5/${Y} بالميلادي؟ ${greg(5, 8, false)}. طريقة التحويل خطوة بخطوة مع أمثلة من جمادى الأولى ورمضان وذي الحجة ${Y}.`,
  h1: `تحويل التاريخ الهجري ${Y} إلى ميلادي بأمثلة`,
  answer: `بحسب تقويم أم القرى، 8/5/${Y} هو ${greg(5, 8)}. الطريقة أن تأخذ أول يوم في الشهر الهجري بالميلادي ثم تضيف إليه عدد الأيام بعد اليوم الأول.`,
  sections: [
    {
      heading: 'الطريقة في ثلاث خطوات',
      html: `<ol>
<li>اعرف رقم الشهر الهجري. الشهر الخامس هو ${ar[4]}، والتاسع ${ar[8]}، والثاني عشر ${ar[11]}.</li>
<li>ابحث عن أول يوم في هذا الشهر بالميلادي. أول ${ar[4]} ${Y} هو ${greg(5, 1)}.</li>
<li>أضف إلى هذا التاريخ عدد الأيام ناقص واحد. اليوم الثامن يعني إضافة 7 أيام، فيصبح التاريخ ${greg(5, 8)}.</li>
</ol>
<p>أسهل من الحساب باليد أن تكتب التاريخ في <a href="/ar/hijri-converter/">محول التاريخ الهجري والميلادي</a>، فيعطيك اليوم والتاريخ مباشرة.</p>`,
    },
    {
      heading: 'أمثلة محلولة',
      html: `<table><thead><tr><th>بالأرقام</th><th>بالأسماء</th><th>يوافق بالميلادي</th></tr></thead><tbody>
${row(5, 1)}
${row(5, 3)}
${row(5, 8)}
${row(5, 15)}
${row(9, 1)}
${row(10, 1)}
${row(12, 10)}</tbody></table>
<p>لاحظ أن 8/5/${Y} تعني اليوم الثامن من الشهر الخامس، وليس الخامس من الشهر الثامن. في الكتابة بالأرقام يأتي اليوم أولاً ثم الشهر ثم السنة.</p>`,
    },
    {
      heading: 'لماذا قد يختلف يوم عن موقع آخر',
      html: `<p>هذه التواريخ بحسب تقويم أم القرى المعتمد في السعودية، وهو تقويم محسوب مسبقاً. بعض الجهات تعتمد رؤية الهلال، فقد يتأخر بداية الشهر يوماً واحداً. لهذا يختلف أحياناً تاريخ رمضان أو العيد بين دولة وأخرى بيوم. عند المعاملات الرسمية اعتمد التاريخ الذي تعلنه الجهة المعنية.</p>
<p>للتفاصيل، اقرأ <a href="/ar/guides/umm-al-qura-vs-moon-sighting/">الفرق بين أم القرى والرؤية</a>، أو <a href="/ar/guides/hijri-calendar-1448/">التقويم الهجري ${Y} كاملاً</a>.</p>`,
    },
  ],
  faq: [
    {
      q: `كم يوافق 8/5/${Y} بالميلادي؟`,
      a: `${greg(5, 8)}، بحسب تقويم أم القرى.`,
    },
    {
      q: `متى يبدأ رمضان ${Y}؟`,
      a: `بحسب أم القرى، أول رمضان ${Y} هو ${greg(9, 1)}.`,
    },
    {
      q: `متى عيد الأضحى ${Y}؟`,
      a: `10 ذو الحجة ${Y} يوافق ${greg(12, 10)} بحسب أم القرى.`,
    },
  ],
  published: D,
  updated: D,
};
