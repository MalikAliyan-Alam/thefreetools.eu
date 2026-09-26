import type { ToolContent } from '../../types';
import type { GpaLabels } from '../labels';

const content: ToolContent<GpaLabels> = {
  slug: 'gpa-calculator',
  metaTitle: 'GPA Calculator: Semester and Cumulative GPA (4.0, 5.0 and %)',
  metaDescription:
    'Work out your semester and cumulative GPA on the 4.0, Saudi 5.0 or percentage scale. Add previous credits, see what you need for a target GPA. Free, no sign-up.',
  eyebrow: 'Students',
  h1: 'GPA calculator',
  intro:
    'Enter your courses, grades and credit hours. Your GPA updates as you type. Add your previous GPA to get the cumulative figure, or set a target to see the average you need next term.',
  labels: {
    scale: 'Grading scale',
    scales: ['us4', 'sa5', 'sa4', 'pct100'],
    scaleNames: { us4: '4.0 scale', sa5: '5.0 scale', sa4: 'Saudi 4.0', pct100: 'Percentage' },
    course: 'Course',
    coursePlaceholder: 'Course',
    grade: 'Grade',
    gradePick: 'Pick',
    weight: 'Credits',
    weightHint: 'Credit hours for the course',
    addCourse: 'Add course',
    removeCourse: 'Remove course',
    example: 'Try an example',
    reset: 'Clear',
    editPoints: 'My university uses different points',
    pointsFor: 'Points for',
    previousToggle: 'Include previous semesters',
    previousAverage: 'Current cumulative GPA',
    previousWeight: 'Credits completed',
    resultTerm: 'Semester GPA',
    resultCumulative: 'Cumulative GPA',
    outOf: 'out of',
    totalWeight: 'Credits counted',
    emptyResult: 'Add a grade and its credits to see your GPA.',
    invalidRows: 'Some rows were skipped. Check the highlighted grade or credits.',
    targetTitle: 'What do I need next term?',
    targetAverage: 'Target GPA',
    targetWeight: 'Credits next term',
    targetNeed: 'You need an average of {need} next term.',
    targetImpossible: 'That target is out of reach in one term. Try adding more credits.',
    targetAlready: 'You will stay at or above that target whatever you score.',
    copy: 'Copy result',
    copied: 'Copied',
    share: 'Copy share link',
    shared: 'Link copied',
    copyTemplate: 'My GPA: {avg} out of {max} ({weight} credits)',
    exampleCourses: [
      { name: 'Calculus I', weight: 4 },
      { name: 'Intro to Economics', weight: 3 },
      { name: 'English Writing', weight: 3 },
      { name: 'Chemistry Lab', weight: 1 },
    ],
  },
  sections: [
    {
      heading: 'How your GPA is calculated',
      html: `<p>Each grade is turned into grade points, multiplied by the course's credit hours, and added up. That total is divided by the number of credits you took.</p>
<p class="formula">GPA = (points × credits + points × credits + …) ÷ total credits</p>
<p>A 4-credit course therefore moves your GPA four times as much as a 1-credit lab. Courses with an F still count; courses graded pass/fail usually don't, so leave them out.</p>`,
    },
    {
      heading: 'A worked example',
      html: `<p>Say you took Calculus (4 credits, A), Economics (3 credits, B+) and a lab (1 credit, C) on the 4.0 scale:</p>
<ul><li>Calculus: 4.0 × 4 = 16.0</li><li>Economics: 3.3 × 3 = 9.9</li><li>Lab: 2.0 × 1 = 2.0</li></ul>
<p>That's 27.9 points over 8 credits, so your semester GPA is <strong>3.49</strong>.</p>`,
    },
    {
      heading: 'Cumulative GPA',
      html: `<p>Your cumulative GPA covers every semester so far. Open <em>Include previous semesters</em>, type the cumulative GPA on your transcript and the credits it covers, and the calculator folds this term in. It's the same formula, just with more credits.</p>`,
    },
    {
      heading: 'Which scale should I pick?',
      html: `<table><thead><tr><th>Scale</th><th>Top grade</th><th>Used by</th></tr></thead><tbody>
<tr><td>4.0 scale</td><td>A = 4.0</td><td>Most universities in the US and many worldwide</td></tr>
<tr><td>5.0 scale</td><td>A+ = 5.0</td><td>Many Saudi universities</td></tr>
<tr><td>Saudi 4.0</td><td>A+ = 4.0</td><td>Saudi universities that report out of 4</td></tr>
<tr><td>Percentage</td><td>100</td><td>Schools that grade each course out of 100</td></tr></tbody></table>
<p>Grade points differ between universities, especially for plus and minus grades. If yours are different, open <em>My university uses different points</em> and type the values from your student handbook.</p>`,
    },
  ],
  faq: [
    {
      q: 'Is a 3.5 GPA good?',
      a: 'On the 4.0 scale a 3.5 is a B+/A- average. Many scholarships and graduate programs ask for 3.0 or higher, and honors lists often start around 3.5.',
    },
    {
      q: 'Do failed courses count in my GPA?',
      a: 'Yes, in most systems an F counts with 0 points (1 point on the Saudi 5.0 scale) and its credits are included. If you retake the course, many universities replace the old grade; check your university’s rules.',
    },
    {
      q: 'Can I convert a percentage to GPA?',
      a: 'There is no single official conversion. Each university publishes its own table, so use the scale your transcript uses or type your university’s grade points.',
    },
    {
      q: 'Is my data saved?',
      a: 'Your last entries are kept in this browser so you can come back to them. Nothing is sent to a server. Use Clear to remove them.',
    },
  ],
  updated: '2026-09-27',
};

export default content;
