import type { ToolContent } from '../../types';
import type { AgeLabels } from '../labels';

export const ageLabelsEn: Omit<AgeLabels, 'primary'> = {
  birthIn: 'Date of birth in',
  gregorian: 'Gregorian',
  hijri: 'Hijri',
  day: 'Day',
  month: 'Month',
  year: 'Year',
  yearPlaceholder: '1995',
  onDate: 'Age on another date',
  onDateHint: 'Calculate the age on',
  enterBirth: 'Enter your date of birth to see your age.',
  invalid: 'That date doesn’t exist. Check the day and month.',
  future: 'The date of birth is after the chosen date.',
  ageLabel: 'Your age',
  hijriAgeLabel: 'Age in Hijri years',
  gregAgeLabel: 'Age in Gregorian years',
  ageFormat: '{y}, {m}, {d}',
  units: { y: { one: 'year', other: 'years' }, m: { one: 'month', other: 'months' }, d: { one: 'day', other: 'days' } },
  totalDays: 'Days lived',
  totalWeeks: 'Weeks',
  totalMonths: 'Months',
  nextBirthday: 'Next birthday',
  nextBirthdayIn: 'in {n} ({weekday})',
  birthdayToday: 'Today. Happy birthday!',
  bornOn: 'Born on',
  copy: 'Copy result',
  copied: 'Copied',
  share: 'Copy share link',
  shared: 'Link copied',
  hijriSuffix: 'AH',
};

const content: ToolContent<AgeLabels> = {
  slug: 'age-calculator',
  metaTitle: 'Age Calculator: Exact Age in Years, Months, Days (+ Hijri)',
  metaDescription:
    'Work out your exact age in years, months and days, in Gregorian and Hijri years. See days lived, your next birthday and the weekday you were born. Free.',
  eyebrow: 'Dates',
  h1: 'Age calculator',
  intro:
    'Enter your date of birth to see your exact age in years, months and days, plus your age in Hijri years. You can also work out your age on any other date.',
  labels: { ...ageLabelsEn, primary: 'gregorian' },
  sections: [
    {
      heading: 'How your age is calculated',
      html: `<p>We count whole years first, then whole months, then the days left over. Months are counted from your birth date: if you were born on the 31st, a shorter month ends on its last day.</p>
<p class="formula">Born 31 January 2000, on 1 March 2025 → 25 years, 1 month, 1 day</p>`,
    },
    {
      heading: 'Worked example',
      html: `<p>Someone born on <strong>15 May 1990</strong> is, on 26 September 2026:</p>
<ul><li><strong>36 years, 4 months, 11 days</strong> old in Gregorian years</li>
<li><strong>37 years, 5 months, 24 days</strong> old in Hijri years (born 20 Shawwal 1410)</li>
<li>13,283 days old</li></ul>`,
    },
    {
      heading: 'Why the Hijri age is higher',
      html: `<p>A Hijri year has 354 or 355 days, about 11 days fewer than a Gregorian year. Those days add up to roughly one extra Hijri year every 33 years, so your Hijri age is usually a year ahead of your Gregorian age by your early thirties. Hijri ages here use the Umm al-Qura calendar.</p>`,
    },
  ],
  faq: [
    {
      q: 'What if I was born on 29 February?',
      a: 'In years without 29 February, the calculator counts your birthday as 1 March. Some countries use 28 February for legal purposes, so check if it matters.',
    },
    {
      q: 'Can I calculate my age on a past or future date?',
      a: 'Yes. Open "Age on another date" and pick any date. This is handy for application deadlines that ask for your age on a specific day.',
    },
    {
      q: 'Is my date of birth saved?',
      a: 'Only in your own browser, so it’s there next time. Nothing is sent to a server.',
    },
  ],
  updated: '2026-09-26',
};

export default content;
