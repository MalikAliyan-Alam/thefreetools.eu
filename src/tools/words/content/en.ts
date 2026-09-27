import type { ToolContent } from '../../types';
import type { WordsLabels } from '../labels';

export const wordsLabelsEn: WordsLabels = {
  amount: 'Number or amount',
  amountPlaceholder: '1,234.56',
  readAs: 'Read as {n}',
  language: 'Write it in',
  langNames: { en: 'English', es: 'Spanish (Español)', ar: 'Arabic (العربية)' },
  currency: 'Currency',
  plainNumber: 'No currency, just the number',
  options: 'Options',
  cheque: 'Cheque style (56/100)',
  andOption: 'British "and" (hundred and five)',
  indianOption: 'Lakh and crore',
  onlyOption: { en: 'Add "only"', es: '', ar: 'Add فقط … لا غير' },
  letterCase: 'Letter case',
  caseNames: { sentence: 'Sentence case', upper: 'UPPERCASE', title: 'Title Case', lower: 'lowercase' },
  resultLabel: 'In words',
  empty: 'Type a number to see it in words.',
  invalid: 'Use digits only, with a dot or comma for decimals.',
  tooBig: 'That is more than 15 digits. The largest number is 999 trillion.',
  examples: 'Try',
  copy: 'Copy text',
  copied: 'Copied',
  share: 'Copy share link',
  shared: 'Link copied',
};

const content: ToolContent<WordsLabels> = {
  slug: 'number-to-words',
  metaTitle: 'Number to Words Converter: Amounts for Cheques and Invoices',
  metaDescription:
    'Convert any number or amount to words in English, Spanish or Arabic. Cheque format, dollars and cents, lakh and crore, British "and". Free, instant, no sign-up.',
  eyebrow: 'Numbers',
  h1: 'Number to words converter',
  intro:
    'Type a number and it is written out in words as you type. Pick a currency to get the amount the way it goes on a cheque, invoice or contract: dollars and cents, pounds and pence, or rupees in lakh and crore.',
  labels: wordsLabelsEn,
  sections: [
    {
      heading: 'How numbers are written in words',
      html: `<p>The number is split into groups of three digits from the right. Each group is written as a number under 1,000 and followed by its scale word: thousand, million, billion, trillion.</p>
<p class="formula">4,305,017 → four million · three hundred five thousand · seventeen</p>
<p>Numbers from 21 to 99 take a hyphen (<em>forty-two</em>). A group of zeros is skipped, so 1,000,050 is <em>one million fifty</em>. American usage leaves out "and"; British usage puts it before the last two digits: <em>one hundred and five</em>, <em>one thousand and twenty</em>. Tick <em>British "and"</em> for that style.</p>`,
    },
    {
      heading: 'Writing an amount on a cheque',
      html: `<p>On a US or Canadian cheque the dollars are written in words and the cents as a fraction of 100, then a line fills the rest of the space so nothing can be added:</p>
<p class="formula">$1,234.56 → One thousand two hundred thirty-four and 56/100 dollars</p>
<p>Turn on <em>Cheque style</em> to get that format. If there are no cents, write <em>00/100</em>. On invoices and contracts the fully spelled-out form is more common: <em>one thousand two hundred thirty-four dollars and fifty-six cents</em>.</p>`,
    },
    {
      heading: 'Lakh and crore (India and Pakistan)',
      html: `<p>In India and Pakistan large amounts are grouped as 1,00,000 (one lakh) and 1,00,00,000 (one crore). Choosing INR or PKR switches to this system automatically, and cheques there usually start with the currency and end with "only":</p>
<p class="formula">₹1,50,000 → Rupees one lakh fifty thousand only</p>
<table><thead><tr><th>Figure</th><th>Indian system</th><th>International</th></tr></thead><tbody>
<tr><td>1,00,000</td><td>one lakh</td><td>one hundred thousand</td></tr>
<tr><td>10,00,000</td><td>ten lakh</td><td>one million</td></tr>
<tr><td>1,00,00,000</td><td>one crore</td><td>ten million</td></tr>
<tr><td>100,00,00,000</td><td>one hundred crore</td><td>one billion</td></tr></tbody></table>`,
    },
    {
      heading: 'Spanish and Arabic amounts',
      html: `<p>Switch <em>Write it in</em> to Spanish for Mexican invoices (<em>mil doscientos treinta y cuatro pesos 56/100 M.N.</em>), Colombian (<em>M/CTE</em>), Peruvian, euro or dollar amounts. Arabic gives the tafqeet used on Gulf cheques and invoices, with the counted noun in the right form: <em>فقط ألف ومائتان وأربعة وثلاثون ريالاً سعودياً وست وخمسون هللة لا غير</em>.</p>`,
    },
  ],
  faq: [
    {
      q: 'Do you write "and" in numbers like 105?',
      a: 'In American English, usually not: one hundred five. In British English, yes: one hundred and five. On US cheques "and" is kept only between the dollars and the cents fraction.',
    },
    {
      q: 'How do I write 1,000,000 in words?',
      a: 'One million. 1,000,000,000 is one billion in English (short scale). In Spanish, mil millones is 10^9 and un billón is 10^12, so the words do not translate one to one.',
    },
    {
      q: 'Is it forty or fourty?',
      a: 'Forty. Four, fourteen and four hundred keep the "u"; forty drops it.',
    },
    {
      q: 'How does the tool read 1,234 and 1.234?',
      a: 'A single comma or dot followed by exactly three digits is treated as a thousands separator, so both are 1234. Any other single separator is the decimal point. The line under the result shows the number as it was read.',
    },
    {
      q: 'Is anything sent to a server?',
      a: 'No. The words are generated in your browser, and your last input is saved only in your browser.',
    },
  ],
  updated: '2026-09-27',
};

export default content;
