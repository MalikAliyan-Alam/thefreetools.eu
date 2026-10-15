import type { ToolContent } from '../../types';
import type { VatLabels } from '../labels';

const content: ToolContent<VatLabels> = {
  slug: 'vat-calculator',
  metaTitle: 'VAT Calculator: Add or Remove VAT (Saudi 15%, UAE 5%)',
  metaDescription:
    'Add VAT to a price or take it out of a VAT-inclusive total. Saudi 15%, UAE 5%, Bahrain 10%, UK 20% or any rate, with the total in words for invoices. Free.',
  eyebrow: 'Tax',
  h1: 'VAT calculator',
  intro:
    'Type an amount in any box: before VAT, the VAT itself, or the total including VAT. The other two fill in instantly, and the total is written out in words for your invoice.',
  labels: {
    countries: [
      { id: 'SA', name: 'Saudi Arabia 15%' },
      { id: 'AE', name: 'UAE 5%' },
      { id: 'BH', name: 'Bahrain 10%' },
      { id: 'OM', name: 'Oman 5%' },
      { id: 'EG', name: 'Egypt 14%' },
      { id: 'GB', name: 'United Kingdom 20%' },
      { id: 'custom', name: 'Other rate' },
    ],
    defaultCountry: 'SA',
    country: 'Country',
    rate: 'Rate %',
    net: 'Before VAT',
    vat: 'VAT',
    gross: 'Total incl. VAT',
    typeAny: 'Type in any box; the others are calculated.',
    share: 'VAT share of the total',
    inWords: 'Total in words',
    withholdings: '',
    ivaRet: '',
    isr: '',
    isrNone: '',
    isr10: '',
    isrResico: '',
    receive: '',
    copy: 'Copy breakdown',
    copied: 'Copied',
    shareLink: 'Copy link',
    shared: 'Link copied',
    reset: 'Clear',
  },
  sections: [
    {
      heading: 'How to add VAT',
      html: `<p class="formula">VAT = net × rate · Total = net × (1 + rate)</p>
<p>A service priced at SAR 1,000 before VAT in Saudi Arabia: VAT is 1,000 × 15% = <strong>SAR 150</strong>, total <strong>SAR 1,150</strong>.</p>`,
    },
    {
      heading: 'How to remove VAT from a total',
      html: `<p>Divide the VAT-inclusive total by 1 + the rate:</p>
<p class="formula">Net = total ÷ 1.15 → 1,150 ÷ 1.15 = 1,000</p>
<p>Don't subtract 15% from the total: 1,150 × 0.85 = 977.50, which is SAR 22.50 short, because VAT was charged on the net price, not on the total. For the UAE divide by 1.05, for the UK by 1.2.</p>`,
    },
    {
      heading: 'VAT rates',
      html: `<table><thead><tr><th>Country</th><th>Standard rate</th><th>Since</th></tr></thead><tbody>
<tr><td>Saudi Arabia</td><td>15%</td><td>1 July 2020 (5% from 2018)</td></tr>
<tr><td>United Arab Emirates</td><td>5%</td><td>1 January 2018</td></tr>
<tr><td>Bahrain</td><td>10%</td><td>1 January 2022</td></tr>
<tr><td>Oman</td><td>5%</td><td>16 April 2021</td></tr>
<tr><td>Egypt</td><td>14%</td><td>1 July 2017</td></tr>
<tr><td>United Kingdom</td><td>20%</td><td>4 January 2011</td></tr></tbody></table>
<p>Kuwait and Qatar have not introduced VAT yet. Some goods are exempt or zero-rated; check ZATCA, the UAE Federal Tax Authority or HMRC for your case.</p>`,
    },
    {
      heading: 'Rounding on an invoice',
      html: `<p>The VAT is rounded to two decimals first, and the total is net plus that rounded VAT, so the three numbers always add up. Example: SAR 99.99 including 15% VAT is 86.95 net plus 13.04 VAT.</p>`,
    },
    {
      heading: 'VAT after a discount',
      html: `<p>VAT is charged on the price after the discount. An item priced at 1,000 before VAT with a 10% discount becomes 900, VAT at 15% is 135, and the total is 1,035. A discount taken off the VAT-inclusive price gives the same total, because a percentage discount passes straight through the tax.</p>`,
    },
    {
      heading: 'What a VAT invoice shows',
      html: `<p>A VAT invoice usually lists the seller's name and VAT registration number, the invoice date, a description of the goods or services, the amount before VAT, the VAT charged and the total. Requirements differ by country: Saudi Arabia, for example, has its own e-invoicing system run by ZATCA, so check the authority's current rules before you issue invoices.</p>`,
    },
  ],
  faq: [
    {
      q: 'How do I calculate 15% VAT?',
      a: 'Multiply the net amount by 0.15 for the VAT, or by 1.15 for the total. 2,000 × 0.15 = 300, so the total is 2,300.',
    },
    {
      q: 'How do I find the price without VAT?',
      a: 'Divide the total by 1.15 (Saudi Arabia), 1.05 (UAE) or 1.2 (UK). Or type the total into "Total incl. VAT" above.',
    },
    {
      q: 'Is anything sent to a server?',
      a: 'No. Everything is calculated in your browser, and your last input is saved only in your browser.',
    },
    {
      q: 'Is VAT charged before or after a discount?',
      a: 'After. An item at 1,000 before VAT with a 10% discount is 900, the 15% VAT on it is 135, and the total is 1,035.',
    },
  ],
  updated: '2026-10-15',
};

export default content;
