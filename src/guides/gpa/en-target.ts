import type { GuideContent } from '../types';

const guide: GuideContent = {
  key: 'gpa-target',
  tool: 'gpa',
  slug: 'what-gpa-do-i-need-next-semester',
  metaTitle: 'What GPA Do I Need Next Semester? Target GPA Formula',
  metaDescription:
    'Work out the semester GPA you need to reach a target cumulative GPA, and how many credits it takes when the target is out of reach in one term. Worked examples.',
  h1: 'What GPA do I need next semester?',
  answer:
    'Needed GPA = (target × total credits after next term − your grade points so far) ÷ next term’s credits. If the result is above 4.0, the target can’t be reached in one term and you need more credits.',
  sections: [
    {
      heading: 'The formula',
      html: `<p class="formula">Needed GPA = (target GPA × (current credits + next credits) − current GPA × current credits) ÷ next credits</p>
<p>"Current credits" are the graded credits behind your cumulative GPA, not every credit you have earned. Pass/fail and transfer credits usually don't count.</p>`,
    },
    {
      heading: 'Example: from 2.8 to 3.0',
      html: `<p>You have a 2.8 over 60 credits and take 15 credits next term. You want a 3.0 overall.</p>
<ul><li>Points so far: 2.8 × 60 = 168</li>
<li>Points needed overall: 3.0 × 75 = 225</li>
<li>Points needed next term: 225 − 168 = 57</li>
<li>Needed GPA: 57 ÷ 15 = <strong>3.80</strong></li></ul>
<p>So you'd need roughly an A−/A average next term.</p>`,
    },
    {
      heading: 'When the target is out of reach in one term',
      html: `<p>With the same record, a 3.2 target would need (3.2 × 75 − 168) ÷ 15 = <strong>4.80</strong>, which is impossible on a 4.0 scale. The question becomes how many straight-A credits it takes:</p>
<table><thead><tr><th>Target (from 2.8 over 60 credits)</th><th>Credits of straight A needed</th></tr></thead><tbody>
<tr><td>3.0</td><td>12</td></tr>
<tr><td>3.2</td><td>30</td></tr>
<tr><td>3.5</td><td>84</td></tr></tbody></table>
<p>Each step up costs more than the last, because every new A is diluted by all the credits already on your record. That is why early semesters matter so much.</p>`,
    },
    {
      heading: 'Check your own numbers',
      html: `<p>The <a href="/gpa-calculator/">GPA calculator</a> has a <em>What do I need next term?</em> box. Enter your cumulative GPA and credits under <em>Include previous semesters</em>, then type a target and next term's credits. It tells you the average you need, or says the target is out of reach.</p>`,
    },
    {
      heading: 'How far one perfect term goes',
      html: `<p>Starting from a 2.8 over 60 credits, a term of straight A's (4.0) gives:</p>
<table><thead><tr><th>Credits in the term</th><th>New cumulative GPA</th></tr></thead><tbody>
<tr><td>15</td><td>3.04</td></tr><tr><td>18</td><td>3.08</td></tr><tr><td>30 (two terms of 15)</td><td>3.20</td></tr></tbody></table>
<p>So even a flawless term only takes you from 2.8 to about 3.0. If you need a 3.5, plan for several terms or for a recovery plan that includes retaking low grades where your school allows replacement.</p>`,
    },
    {
      heading: 'Check your school’s rules before relying on a retake',
      html: `<p>Some schools replace the old grade with the new one, others average the two, and some leave both on the transcript but count only one. The effect on your GPA is very different, so read your registrar's policy before you plan around it. The retake limit, the deadline and whether the old grade stays visible are also set by the school.</p>`,
    },
  ],
  faq: [
    {
      q: 'Why is it so hard to raise a GPA late in a degree?',
      a: 'Your GPA is weighted by credits. With 90 credits already recorded, one 15-credit term is only a sixth of the total, so even straight A’s move the number a little.',
    },
    {
      q: 'Can retaking a course raise my GPA faster?',
      a: 'If your university uses grade replacement, yes: the old low grade drops out. If it averages attempts, the old grade stays and the gain is smaller.',
    },
  ],
  published: '2026-09-26',
  updated: '2026-10-15',
};

export default guide;
