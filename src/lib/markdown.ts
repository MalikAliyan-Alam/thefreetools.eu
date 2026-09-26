/**
 * Minimal HTML → Markdown for our own hand-written content sections
 * (p, ul/li, strong, em, table). Not a general converter.
 */
export function htmlToMarkdown(html: string): string {
  let s = html;
  s = s.replace(/<table>[\s\S]*?<\/table>/g, (table) => {
    const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
      [...r[1].matchAll(/<t[hd]>([\s\S]*?)<\/t[hd]>/g)].map((c) => c[1].trim()),
    );
    if (!rows.length) return '';
    const head = `| ${rows[0].join(' | ')} |\n| ${rows[0].map(() => '---').join(' | ')} |`;
    const body = rows.slice(1).map((r) => `| ${r.join(' | ')} |`);
    return `\n${[head, ...body].join('\n')}\n`;
  });
  s = s
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<em>([\s\S]*?)<\/em>/g, '*$1*')
    .replace(/<li>([\s\S]*?)<\/li>/g, '- $1\n')
    .replace(/<\/?ul>/g, '\n')
    .replace(/<p class="formula">([\s\S]*?)<\/p>/g, '\n`$1`\n')
    .replace(/<p>([\s\S]*?)<\/p>/g, '\n$1\n')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)')
    .replace(/<[^>]+>/g, '');
  return s.replace(/\n{3,}/g, '\n\n').trim();
}
