import type { GuideContent } from '../types';
import { hijriToGregorian, type YMD } from '../../tools/hijri/engine';

// Example dates come from the engine so the prose can't drift from the tool.
const ummAlQura = hijriToGregorian({ y: 1446, m: 10, d: 1 })!;
const civil = hijriToGregorian({ y: 1446, m: 10, d: 1 }, 'islamic-civil')!;
const startsOn = (y: number, m: number, cal: 'islamic-umalqura' | 'islamic-civil') => hijriToGregorian({ y, m, d: 1 }, cal)!;
const differing = Array.from({ length: 12 }, (_, i) => i + 1).filter((m) => {
  const a = startsOn(1448, m, 'islamic-umalqura');
  const b = startsOn(1448, m, 'islamic-civil');
  return a.y !== b.y || a.m !== b.m || a.d !== b.d;
});
const ramadan1448 = startsOn(1448, 9, 'islamic-umalqura');
const f = (loc: string, d: YMD) =>
  new Intl.DateTimeFormat(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(d.y, d.m - 1, d.d));

export const ummAlQuraEn: GuideContent = {
  key: 'hijri-methods',
  tool: 'hijri',
  slug: 'umm-al-qura-vs-moon-sighting',
  metaTitle: 'Umm al-Qura vs Moon Sighting: Why Hijri Dates Differ',
  metaDescription:
    'Why Hijri dates can differ by a day: the Umm al-Qura calendar, moon sighting and the arithmetic (civil) calendar explained with a real example.',
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
    {
      heading: 'The Umm al-Qura rule',
      html: `<p>On the 29th day of a Hijri month the calendar asks two questions, both at Mecca: did the new moon (the astronomical conjunction) happen before sunset, and does the Moon set after the Sun? If both answers are yes, the next day is the 1st of the new month. If not, the month runs to 30 days. This version has been in use since 1423 AH (about 2002). Earlier versions used other tests: for 1420 to 1422 AH the only test was moonset after sunset, and before that the conjunction time was compared with midnight UT.</p>
<p>The calendar was moved from clerical to astronomical supervision in the 1970s and became the civil calendar of Saudi Arabia, used for official dates. It is a calculation, not an observation, and it does not check whether the crescent is visible to the eye.</p>`,
    },
    {
      heading: 'What Saudi Arabia does for Ramadan and Eid',
      html: `<p>For religious months, the announcement follows sighting. The Supreme Court calls for crescent sighting on the evening of the 29th of Shaban, Ramadan and Dhu al-Qadah, and the start of Ramadan, Eid al-Fitr and the month of Hajj is declared from the result. So the tables are right for most dates in the year, but on these dates the official day can differ from the Umm al-Qura table by one day.</p>`,
    },
    {
      heading: 'How often the arithmetic calendar disagrees',
      html: `<p>In ${1448} AH the arithmetic (civil) calendar starts <strong>${differing.length} of the 12 months</strong> on a different day from Umm al-Qura, always one or two days later. Ramadan ${1448} happens to match: both give <strong>${f('en-GB', ramadan1448)}</strong>. This is why a converter should say which calendar it uses.</p>`,
    },
  ],
  faq: [
    {
      q: 'Is Umm al-Qura the same as the moon sighting?',
      a: 'No. Umm al-Qura is calculated in advance and does not check whether the crescent can be seen. Sighting is observed on the evening of the 29th, so the two can differ by a day.',
    },
    {
      q: 'Which calendar does Saudi Arabia use for official dates?',
      a: 'Umm al-Qura. For the start of Ramadan and the Eids, the announcement follows crescent sighting.',
    },
  ],
  published: '2026-09-26',
  updated: '2026-10-15',
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
    {
      heading: 'قاعدة أم القرى',
      html: `<p>في يوم 29 من الشهر الهجري يُطرح سؤالان في مكة المكرمة: هل وقع الاقتران (ولادة الهلال فلكياً) قبل غروب الشمس؟ وهل يغيب القمر بعد غروب الشمس؟ فإن تحقق الشرطان فاليوم التالي هو أول الشهر الجديد، وإلا أُتم الشهر ثلاثين يوماً. وهذه الصيغة معمول بها منذ 1423هـ تقريباً. وكانت قبلها اختبارات أخرى: ففي 1420 إلى 1422هـ كان الاختبار الوحيد غياب القمر بعد الغروب، وقبل ذلك كان وقت الاقتران يُقارن بمنتصف الليل بتوقيت غرينتش.</p>
<p>انتقل الإشراف على التقويم من الجهة الشرعية إلى الفلكيين في السبعينيات الميلادية، وأصبح التقويم المدني للتواريخ الرسمية في السعودية. وهو حساب وليس رصداً، ولا يتحقق من أن الهلال يُرى بالعين.</p>`,
    },
    {
      heading: 'ماذا تفعل السعودية في رمضان والعيدين؟',
      html: `<p>للأشهر الشرعية يتبع الإعلان رؤية الهلال. تدعو المحكمة العليا إلى تحري الهلال مساء التاسع والعشرين من شعبان ورمضان وذي القعدة، ويُعلن بداية رمضان وعيد الفطر وشهر الحج بحسب النتيجة. لذلك فالجداول صحيحة في معظم أيام السنة، لكن في هذه المواعيد قد يختلف اليوم الرسمي عن جدول أم القرى بيوم واحد.</p>`,
    },
    {
      heading: 'كم مرة يختلف التقويم الحسابي؟',
      html: `<p>في عام 1448هـ يبدأ التقويم الحسابي <strong>${differing.length} شهراً من 12</strong> في يوم مختلف عن أم القرى، دائماً بعده بيوم أو يومين. ويتفق التقويمان في رمضان 1448: كلاهما يعطي <strong>${f('ar-u-nu-latn', ramadan1448)}</strong>. ولهذا ينبغي أن تذكر أي أداة تحويل التقويم الذي تعتمده.</p>`,
    },
  ],
  faq: [
    {
      q: 'هل أم القرى هو نفسه رؤية الهلال؟',
      a: 'لا. أم القرى تقويم محسوب مسبقاً ولا يتحقق من إمكانية رؤية الهلال، أما الرؤية فتكون مساء التاسع والعشرين، فقد يختلف الاثنان بيوم.',
    },
    {
      q: 'أي تقويم تعتمده السعودية في التواريخ الرسمية؟',
      a: 'أم القرى. أما بداية رمضان والعيدين فيتبع الإعلان فيها رؤية الهلال.',
    },
  ],
  published: '2026-09-26',
  updated: '2026-10-15',
};
