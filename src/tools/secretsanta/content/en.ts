import type { ToolContent } from '../../types';
import type { SecretSantaLabels } from '../labels';

const labels: SecretSantaLabels = {
  names: 'Participants (one per line)',
  namesHint: 'Add at least 3 names. Duplicates are removed.',
  namesPlaceholder: 'Ana\nLuis\nMarta\nPedro',
  exclusions: 'Who can not draw whom (optional)',
  exclusionsHint: 'One pair per line, for example "Ana - Luis". Useful for couples or siblings.',
  exclusionsPlaceholder: 'Ana - Luis\nMarta - Pedro',
  budget: 'Budget (optional)',
  budgetPlaceholder: 'For example $20',
  draw: 'Draw names',
  redraw: 'Draw again',
  example: 'Try an example',
  reset: 'Start over',
  count: '{n} participants',
  errFew: 'You need at least 3 people.',
  errMany: 'The limit is 60 people.',
  errImpossible: 'These exclusions leave no valid draw. Remove a pair or add more people.',
  done: 'The draw is done. Choose how to hand out the results so nobody sees anyone else\'s.',
  modeHand: 'Pass the phone',
  modeLinks: 'Links by text or WhatsApp',
  passTo: 'Hand the phone to {name}.',
  showMine: 'Show who I give to',
  hide: 'Finish',
  next: 'Hide and pass to the next person',
  youGive: '{name}, you give to',
  finished: 'Done: everyone has seen their result. You can start over.',
  linksIntro: 'Each person gets their own link that shows only who they give to. No email, no sign-up.',
  message: 'Hi {name}, the Secret Santa draw is done. Open this link to see who you are buying for, and keep it secret: {link}',
  messageBudget: 'Hi {name}, the Secret Santa draw is done (budget: {budget}). Open this link to see who you are buying for, and keep it secret: {link}',
  copyMessage: 'Copy message',
  copyLink: 'Copy link',
  copied: 'Copied',
  openWhatsapp: 'Send on WhatsApp',
  revealTitle: 'Hi {giver}:',
  revealBody: 'Your Secret Santa match is',
  revealBudget: 'Budget: {budget}.',
  revealKeep: 'Keep it secret until the day of the exchange.',
  makeOwn: 'Make another draw',
  organizerNote: 'The organizer holds the links and could open them. If nobody should know the pairings, use "Pass the phone".',
};

const content: ToolContent<SecretSantaLabels> = {
  slug: 'secret-santa-generator',
  metaTitle: 'Secret Santa generator: draw names online, no email needed',
  metaDescription:
    'Draw Secret Santa names in your browser: no sign-up, no emails, exclusions for couples, and results by text, WhatsApp or by passing the phone. Names never leave your device.',
  eyebrow: 'Christmas',
  h1: 'Secret Santa generator',
  intro:
    'Type the names, say who can not draw whom, and draw. Everyone sees only their own match, by text message, WhatsApp or by passing the phone. No email and no account, and the names never leave your browser.',
  labels,
  sections: [
    {
      heading: 'How to run the draw in three steps',
      html: `<ol>
<li>Add the participants, one per line. You need at least 3, and the limit is 60.</li>
<li>If couples or siblings should not draw each other, list them in the second box, one pair per line (for example "Ana - Luis").</li>
<li>Press "Draw names" and pick how to hand out the results: pass the phone from person to person, or send each person a private link by text or WhatsApp.</li>
</ol>
<p>Every draw follows three rules: each person gives to exactly one person and receives from exactly one, nobody draws themselves, and excluded pairs never draw each other in either direction.</p>`,
    },
    {
      heading: 'No email, no sign-up: two ways to hand out the results',
      html: `<p><strong>Pass the phone.</strong> The tool tells you whose turn it is. That person taps to see who they give to, remembers it, taps "hide" and hands the phone on. Nobody, not even the organizer, sees anyone else's match.</p>
<p><strong>Links by text or WhatsApp.</strong> Each person receives a link that opens a page showing only their match. The pairing travels inside the address, after the # sign, and browsers never send that part to a server, so there are no accounts and no database. One honest warning: the organizer holds the links and can see the pairings by opening them. If nobody at all should know, use the pass-the-phone method.</p>`,
    },
    {
      heading: 'Exclusions and how many people you need',
      html: `<p>With 3 people you can not exclude even one pair: in a three-person draw everyone is paired with both of the others, so any exclusion leaves someone with no valid choice. With 4 people you can exclude one pair, and with more people several. If the exclusions make a draw impossible, the tool says so instead of giving a wrong result.</p>
<p>Whether the number of players is odd or even does not matter. It works the same with 3, 4, 7 or 25 people.</p>`,
    },
    {
      heading: 'What to agree on before the exchange',
      html: `<ul>
<li><strong>Budget:</strong> one maximum amount so everyone spends about the same. Type it in the budget box and it appears in every message.</li>
<li><strong>Date and place</strong> of the exchange, and whether gifts are opened together.</li>
<li><strong>Hints:</strong> each person can give three likes or a wish list to whoever draws them.</li>
<li><strong>Anyone who can not attend:</strong> agree how their gift will reach them.</li>
</ul>`,
    },
    {
      heading: 'Privacy',
      html: `<p>The names you type are processed in your browser. They are not stored on your device and not sent to our servers. If you close the page the draw is gone, and the only way to recover a result is the link you sent. So run the draw once everyone has confirmed they are playing.</p>`,
    },
  ],
  faq: [
    {
      q: 'Do I need an account or an email address?',
      a: 'No. You type the names, draw, and hand out results by passing the phone or with a private link by text or WhatsApp. There is no sign-up and no email.',
    },
    {
      q: 'Can you do Secret Santa with an odd number of people?',
      a: 'Yes. Any number from 3 to 60 works, odd or even.',
    },
    {
      q: 'How many people do you need for Secret Santa?',
      a: 'At least 3. With 3 people no pair can be excluded; with 4 you can exclude one pair.',
    },
    {
      q: 'Can I stop two people, like a couple, from drawing each other?',
      a: 'Yes. Put the pair in the exclusions box, for example "Ana - Luis", and they will never draw each other in either direction.',
    },
    {
      q: 'Can the organizer see who has whom?',
      a: 'Not with "Pass the phone". With links, the organizer holds them and could open them, so use the pass-the-phone method if nobody should know.',
    },
    {
      q: 'Are the names saved?',
      a: 'No. Everything happens in your browser and nothing is sent to a server. When you close the page the draw is gone.',
    },
  ],
  updated: '2026-10-17',
};

export default content;
