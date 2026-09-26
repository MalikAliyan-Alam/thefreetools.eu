import { LOCALES, LOCALE_META, localePath } from '../i18n/locales';
import { UI } from '../i18n/ui';
import { TOOLS } from '../tools/registry';
import { SITE } from '../site';
import { htmlToMarkdown } from './markdown';
import { GUIDES, guidePath } from '../guides/registry';

const abs = (p: string) => new URL(p, SITE.url).href;

/** Short index for AI agents: what the site is and where each tool lives. */
export function llmsIndex(): string {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${UI.en.homeIntro}`,
    '',
    'All tools are free, need no sign-up and run entirely in the browser. Each page explains the formula it uses, with a worked example.',
    '',
    `Full text of every tool page: ${abs('/llms-full.txt')}`,
    '',
    '## Tools',
  ];
  for (const tool of TOOLS) {
    for (const l of LOCALES) {
      const c = tool.content[l];
      if (!c) continue;
      lines.push(`- [${c.h1}](${abs(localePath(l, c.slug))}) (${LOCALE_META[l].name}): ${c.metaDescription}`);
    }
  }
  lines.push('', '## Guides');
  for (const l of LOCALES) {
    for (const g of GUIDES[l]) lines.push(`- [${g.h1}](${abs(guidePath(l, g))}) (${LOCALE_META[l].name}): ${g.answer}`);
  }
  lines.push('', '## About', `- [About](${abs('/about/')})`, `- [Privacy](${abs('/privacy/')})`, `- [Contact](${abs('/contact/')})`);
  return lines.join('\n') + '\n';
}

/** Every tool page as plain Markdown: intro, method, worked examples, FAQ. */
export function llmsFull(): string {
  const out = [`# ${SITE.name}: full tool reference`, ''];
  for (const tool of TOOLS) {
    for (const l of LOCALES) {
      const c = tool.content[l];
      if (!c) continue;
      out.push(`## ${c.h1}`, '', `URL: ${abs(localePath(l, c.slug))}`, `Language: ${LOCALE_META[l].name}`, `Last updated: ${c.updated}`, '', c.intro, '');
      for (const s of c.sections) out.push(`### ${s.heading}`, '', htmlToMarkdown(s.html), '');
      out.push(`### ${UI[l].faq}`, '');
      for (const f of c.faq) out.push(`**${f.q}**`, '', f.a, '');
      out.push('---', '');
    }
  }
  return out.join('\n');
}
