import type { GuideContent } from '../types';

const guide: GuideContent = {
  key: 'gpa-cumulative',
  tool: 'gpa',
  slug: 'how-to-calculate-cumulative-gpa',
  metaTitle: 'How to Calculate Cumulative GPA (Retakes, Pass/Fail, Transfers)',
  metaDescription:
    'Cumulative GPA is total grade points divided by total graded credits, not the average of your semester GPAs. Worked examples for retakes, pass/fail and transfer credits.',
  h1: 'How to calculate your cumulative GPA',
  answer:
    'Add up the grade points from every graded course you have taken, then divide by the total graded credits. It is not the average of your semester GPAs unless every semester had the same number of credits.',
  sections: [
    {
      heading: 'The formula',
      html: `<p class="formula">Cumulative GPA = (sum of grade points × credits, all terms) ÷ (sum of graded credits, all terms)</p>
<p>If your transcript already shows a cumulative GPA, you don't need your old courses. Multiply that GPA by the credits it covers to get your total points so far, add this term's points, and divide by the new credit total.</p>`,
    },
    {
      heading: 'Why averaging semester GPAs gives the wrong answer',
      html: `<p>Say you earned a 3.8 in a light fall term and a 3.0 in a heavy spring term:</p>
<table><thead><tr><th>Term</th><th>GPA</th><th>Credits</th><th>Grade points</th></tr></thead><tbody>
<tr><td>Fall</td><td>3.8</td><td>12</td><td>45.6</td></tr>
<tr><td>Spring</td><td>3.0</td><td>18</td><td>54.0</td></tr>
<tr><td><strong>Total</strong></td><td></td><td><strong>30</strong></td><td><strong>99.6</strong></td></tr></tbody></table>
<p>The simple average of 3.8 and 3.0 is 3.40. Your real cumulative GPA is 99.6 ÷ 30 = <strong>3.32</strong>, because the spring term carried more credits.</p>`,
    },
    {
      heading: 'What counts and what usually doesn’t',
      html: `<table><thead><tr><th>On your transcript</th><th>Counts in GPA?</th></tr></thead><tbody>
<tr><td>Letter-graded courses (A–D)</td><td>Yes</td></tr>
<tr><td>F</td><td>Yes, with 0 points on the 4.0 scale</td></tr>
<tr><td>Pass/Fail, Credit/No credit</td><td>Usually no</td></tr>
<tr><td>W (withdrawn)</td><td>Usually no</td></tr>
<tr><td>Incomplete</td><td>Not until a final grade is entered</td></tr>
<tr><td>Transfer credits</td><td>Usually count toward your degree, but many universities leave them out of GPA</td></tr></tbody></table>
<p>These are the most common rules at US universities. Your registrar's handbook has the final word, so check it for anything that looks unusual.</p>`,
    },
    {
      heading: 'Retaken courses: replacement vs averaging',
      html: `<p>Universities handle a retaken course in one of two ways. Here is the same case under both. You have 90 grade points over 30 credits (a 3.00), and you retake a 4-credit course where you first got a D (1.0) and then a B (3.0):</p>
<ul><li><strong>Grade replacement:</strong> only the new B counts. (90 + 3.0 × 4) ÷ (30 + 4) = 102 ÷ 34 = <strong>3.00</strong>.</li>
<li><strong>Averaging:</strong> both attempts count. (90 + 1.0 × 4 + 3.0 × 4) ÷ (30 + 8) = 106 ÷ 38 = <strong>2.79</strong>.</li></ul>
<p>The difference is large, so find out which policy your university uses before you plan a retake.</p>`,
    },
    {
      heading: 'Doing it with the calculator',
      html: `<p>In the <a href="/gpa-calculator/">GPA calculator</a>, open <em>Include previous semesters</em> and enter the cumulative GPA and credits from your transcript. Then add this term's courses. The result ring switches to your cumulative GPA, and the term GPA is shown below it.</p>`,
    },
  ],
  faq: [
    {
      q: 'Is cumulative GPA the same as overall GPA?',
      a: 'Yes, in most places the two terms mean the same thing: your GPA across every term so far. Some transcripts also show a "major GPA" that only includes courses in your major.',
    },
    {
      q: 'Does a withdrawal (W) lower my GPA?',
      a: 'Usually not. A W normally carries no grade points and no graded credits, so it doesn’t enter the calculation, though it stays on your transcript.',
    },
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};

export default guide;
