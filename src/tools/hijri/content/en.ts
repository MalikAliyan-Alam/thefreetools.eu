import type { ToolContent } from '../../types';
import type { HijriLabels } from '../labels';

const content: ToolContent<HijriLabels> = {
  slug: 'hijri-converter',
  metaTitle: 'Hijri Date Converter: Hijri to Gregorian and Back (Umm al-Qura)',
  metaDescription:
    'Convert Hijri dates to Gregorian and Gregorian to Hijri with the official Saudi Umm al-Qura calendar. See today’s Hijri date, the weekday and month length. Free.',
  eyebrow: 'Dates',
  h1: 'Hijri date converter',
  intro:
    'Pick a date and the other calendar appears instantly, with the weekday. Conversions use Umm al-Qura, the official calendar of Saudi Arabia, or the arithmetic (civil) calendar if you prefer.',
  labels: {
    today: 'Today',
    toGregorian: 'Hijri → Gregorian',
    toHijri: 'Gregorian → Hijri',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    method: 'Calculation method',
    methodUmmAlQura: 'Umm al-Qura (Saudi)',
    methodCivil: 'Arithmetic (civil)',
    swap: 'Swap',
    useToday: 'Use today',
    result: 'Conversion',
    invalid: 'That date doesn’t exist. This month may have only 29 days.',
    outOfRange: 'Pick a Hijri year between 1300 and 1500.',
    monthDays: '{month} {year} has {n} days.',
    copy: 'Copy result',
    copied: 'Copied',
    share: 'Copy share link',
    shared: 'Link copied',
    hijriSuffix: 'AH',
    gregSuffix: '',
    sightingNote:
      'Umm al-Qura is calculated in advance. Religious dates such as the start of Ramadan or Eid are set by moon sighting and can differ by a day.',
  },
  sections: [
    {
      heading: 'How the conversion works',
      html: `<p>The Hijri calendar is lunar: each month has 29 or 30 days, so a Hijri year is about 354 days, 11 days shorter than a Gregorian year. That's why Ramadan moves earlier by about 11 days each year.</p>
<p>This converter uses <strong>Umm al-Qura</strong>, the calendar Saudi Arabia uses for official dates. Its month lengths come from astronomical calculation, so conversions are exact for any date in the supported range (1300–1500 AH). The <strong>arithmetic (civil)</strong> option uses a fixed 30-year cycle and can differ from Umm al-Qura by a day or two.</p>`,
    },
    {
      heading: 'Worked example',
      html: `<p>Saudi Arabia announced that Ramadan 1446 began on <strong>Saturday 1 March 2025</strong>, and Eid al-Fitr (1 Shawwal 1446) fell on <strong>Sunday 30 March 2025</strong>. Enter 1 Ramadan 1446 or 1 Shawwal 1446 above and you get the same dates. Ramadan 1446 had 29 days.</p>`,
    },
    {
      heading: 'The Hijri months',
      html: `<table><thead><tr><th>#</th><th>Month</th><th>Arabic</th></tr></thead><tbody>
<tr><td>1</td><td>Muharram</td><td>محرم</td></tr><tr><td>2</td><td>Safar</td><td>صفر</td></tr>
<tr><td>3</td><td>Rabi al-Awwal</td><td>ربيع الأول</td></tr><tr><td>4</td><td>Rabi al-Thani</td><td>ربيع الآخر</td></tr>
<tr><td>5</td><td>Jumada al-Ula</td><td>جمادى الأولى</td></tr><tr><td>6</td><td>Jumada al-Akhirah</td><td>جمادى الآخرة</td></tr>
<tr><td>7</td><td>Rajab</td><td>رجب</td></tr><tr><td>8</td><td>Shaban</td><td>شعبان</td></tr>
<tr><td>9</td><td>Ramadan</td><td>رمضان</td></tr><tr><td>10</td><td>Shawwal</td><td>شوال</td></tr>
<tr><td>11</td><td>Dhu al-Qadah</td><td>ذو القعدة</td></tr><tr><td>12</td><td>Dhu al-Hijjah</td><td>ذو الحجة</td></tr></tbody></table>`,
    },
  ],
  faq: [
    {
      q: 'Why does my converter show a different day?',
      a: 'Converters use different methods. Umm al-Qura (used here and by Saudi government services) and the arithmetic calendar can differ by a day or two, and dates set by moon sighting can differ from both.',
    },
    {
      q: 'How many days are in a Hijri month?',
      a: 'Either 29 or 30. The converter shows the length of the month you pick, and tells you if a date like the 30th doesn’t exist that month.',
    },
    {
      q: 'Can I convert my date of birth?',
      a: 'Yes. Choose Gregorian → Hijri and enter your birth date. For your age in Hijri years, use the difference between the Hijri years, adjusted for the month and day.',
    },
  ],
  updated: '2026-09-26',
};

export default content;
