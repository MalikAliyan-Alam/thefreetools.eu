import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlToMarkdown } from '../src/lib/markdown.ts';

test('converts our content markup to markdown', () => {
  const md = htmlToMarkdown(
    '<p>Hello <strong>world</strong>.</p><ul><li>One</li><li>Two</li></ul><p class="formula">a = b</p>' +
      '<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>',
  );
  assert.match(md, /Hello \*\*world\*\*\./);
  assert.match(md, /- One\n- Two/);
  assert.match(md, /`a = b`/);
  assert.match(md, /\| A \| B \|\n\| --- \| --- \|\n\| 1 \| 2 \|/);
  assert.doesNotMatch(md, /<[a-z]/);
});
