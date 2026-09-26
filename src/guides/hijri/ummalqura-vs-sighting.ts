import type { GuideContent } from '../types';
import { hijriToGregorian, type YMD } from '../../tools/hijri/engine';

// Example dates come from the engine so the prose can't drift from the tool.
const ummAlQura = hijriToGregorian({ y: 1446, m: 10, d: 1 })!;
const civil = hijriToGregorian({ y: 1446, m: 10, d: 1 }, 'islamic-civil')!;
const f = (loc: string, d: YMD) =>
  new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(d.y, d.m - 1, d.d));

export const ummAlQuraEn: GuideContent = {
  key: 'hijri-methods',
  tool: 'hijri',
  slug: 'umm-al-qura-vs-moon-sighting',
  metaTitle: 'Umm al-Qura vs Moon Sighting: Why Hijri Dates Differ',
  metaDescription:
    'Why Hijri converters and countries sometimes disagree by a day: the Umm al-Qura calendar, moon sighting and the arithmetic (civil) calendar explained with an example.',
  h1: 'Umm al-Qura vs moon sighting: why Hijri dates differ',
  answer:
    'Umm al-Qura is a calculated calendar used for official dates in Saudi Arabia; religious dates like Ramadan and Eid are confirmed by sighting the new crescent; and the arithmetic (civil) calendar follows a fixed cycle. They usually agree, but can differ by a day or two.',
  sections: [
    {
      heading: 'Three ways to set a Hijri date',
      html: `<table><thead><tr><th>Method</th><th>How it works</th><th>Used for</th></tr></thead><tbody>
<tr><td>Umm al-Qura</td><td>Month starts are calculated in advance from the moon's position as seen from Mecca</td><td>Official and administrative dates in Saudi Arabia</td></tr>
<tr><td>Moon sighting</td><td>A month starts when the new crescent is seen after sunset</td><td>Start of Ramadan, Eid al-Fitr, Eid al-Adha in many countries</td></tr>
<tr><td>Arithmetic (civil)</td><td>Fixed rule: months alternate 30 and 29 days, with 11 leap years in each 30-year cycle</td><td>Software and historical conversions</td></tr></tbody></table>`,
    },
    {
      heading: 'An example where they differ',
      html: `<p>For 1 Shawwal 1446 (Eid al-Fitr), Umm al-Qura gives <strong>${f('en-GB', ummAlQura)}</strong>, while the arithmetic calendar gives <strong>${f('en-GB', civil)}</strong>. A converter using the arithmetic rule would be a day off from the official Saudi date.</p>`,
    },
    {
      heading: 'Which one should I use?',
      html: `<ul><li>Saudi government forms, contracts, iqama and official documents: <strong>Umm al-Qura</strong>.</li>
<li>When Ramadan or Eid starts where you live: your country's <strong>official announcement</strong>.</li>
<li>Matching another program that uses the fixed rule: <strong>arithmetic</strong>.</li></ul>
<p>The <a href="/hijri-converter/">Hijri date converter</a> uses Umm al-Qura by default; switch to arithmetic under "Calculation method".</p>`,
    },
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};

export const ummAlQuraAr: GuideContent = {
  key: 'hijri-methods',
  tool: 'hijri',
  slug: 'umm-al-qura-vs-moon-sighting',
  metaTitle: 'الفرق بين تقويم أم القرى ورؤية الهلال والتقويم الحسابي',
  metaDescription:
    'لماذا تختلف التواريخ الهجرية بيوم أحياناً؟ شرح مبسط لتقويم أم القرى ورؤية الهلال والتقويم الحسابي مع مثال عيد الفطر 1446.',
  h1: 'الفرق بين تقويم أم القرى ورؤية الهلال',
  answer:
    'تقويم أم القرى تقويم محسوب مسبقاً للتواريخ الرسمية في السعودية، ورؤية الهلال تحدد بدايات رمضان والأعياد، والتقويم الحسابي يتبع قاعدة ثابتة. غالباً تتفق الثلاثة، لكنها قد تختلف بيوم أو يومين.',
  sections: [
    {
      heading: 'ثلاث طرق لتحديد التاريخ الهجري',
      html: `<table><thead><tr><th>الطريقة</th><th>كيف تعمل</th><th>أين تُستخدم</th></tr></thead><tbody>
<tr><td>أم القرى</td><td>تُحسب بدايات الأشهر مسبقاً بحسب موقع القمر بالنسبة لمكة المكرمة</td><td>التواريخ الرسمية والإدارية في السعودية</td></tr>
<tr><td>رؤية الهلال</td><td>يبدأ الشهر عند رؤية الهلال بعد غروب الشمس</td><td>بداية رمضان وعيد الفطر وعيد الأضحى في دول كثيرة</td></tr>
<tr><td>الحسابي</td><td>قاعدة ثابتة: الأشهر 30 و29 يوماً بالتناوب، مع 11 سنة كبيسة في كل 30 سنة</td><td>البرامج والتحويلات التاريخية</td></tr></tbody></table>`,
    },
    {
      heading: 'مثال على الاختلاف',
      html: `<p>بالنسبة إلى 1 شوال 1446 (عيد الفطر)، يعطي تقويم أم القرى <strong>${f('ar-u-nu-latn', ummAlQura)}</strong>، بينما يعطي التقويم الحسابي <strong>${f('ar-u-nu-latn', civil)}</strong>. أي أن أداة تعتمد القاعدة الحسابية ستخطئ بيوم عن التاريخ الرسمي في السعودية.</p>`,
    },
    {
      heading: 'أيها أستخدم؟',
      html: `<ul><li>المعاملات الحكومية والعقود والإقامة والوثائق الرسمية في السعودية: <strong>أم القرى</strong>.</li>
<li>موعد رمضان أو العيد في بلدك: <strong>الإعلان الرسمي</strong> في بلدك.</li>
<li>مطابقة برنامج آخر يعتمد القاعدة الثابتة: <strong>الحسابي</strong>.</li></ul>
<p>تعتمد <a href="/ar/hijri-converter/">أداة تحويل التاريخ</a> على أم القرى افتراضياً، ويمكنك التبديل إلى الحسابي من "طريقة الحساب".</p>`,
    },
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};
