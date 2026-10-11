import { useEffect, useMemo, useState } from 'preact/hooks';
import { groupDigits, parseFrench } from './engine';
import type { UnwordsLabels } from './labels';
// Styles: shares words.css (see components/ToolIsland.astro).

const EXAMPLES = ['quatre millions cinq cent mille', 'cent soixante-dix mille', 'quatre-vingt-dix-sept', 'un milliard deux cent mille'];

export default function UnwordsTool({ labels: t }: { labels: UnwordsLabels }) {
  const storageKey = 'tft:unwords:v1:fr';
  const [input, setInput] = useState('');
  const [flash, setFlash] = useState<'' | 'spaced' | 'plain'>('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setInput(saved);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, input);
    } catch {
      /* storage blocked */
    }
  }, [input]);

  const result = useMemo(() => {
    if (!input.trim()) return { hint: t.empty };
    const r = parseFrench(input);
    if (r.ok) return { r };
    if (r.kind === 'empty') return { hint: t.empty };
    if (r.kind === 'too-big') return { hint: t.tooBig, bad: true };
    return { hint: (r.kind === 'unknown' ? t.unknown : t.order).replace('{word}', r.word), bad: true };
  }, [input, t]);

  const copy = async (kind: 'spaced' | 'plain') => {
    if (!('r' in result) || !result.r) return;
    const text = kind === 'plain' ? result.r.value.toString() : groupDigits(result.r.value);
    try {
      await navigator.clipboard.writeText(text);
      setFlash(kind);
      setTimeout(() => setFlash(''), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div class="words">
      <label class="words-amount">
        <span>{t.input}</span>
        <input
          class="input"
          style={{ fontSize: '20px' }}
          autoComplete="off"
          autoCapitalize="off"
          spellcheck={false}
          lang="fr"
          placeholder={t.placeholder}
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        />
      </label>
      <div class="words-examples">
        <span>{t.examples}</span>
        {EXAMPLES.map((x) => (
          <button type="button" class="chip" onClick={() => setInput(x)}>
            {x}
          </button>
        ))}
      </div>

      <div class={`words-result${'hint' in result ? (result.bad ? ' is-bad' : ' is-empty') : ''}`} aria-live="polite">
        {'hint' in result ? (
          <p class="words-hint">{result.hint}</p>
        ) : (
          <>
            <p class="words-label">{t.resultLabel}</p>
            <p class="words-text" dir="ltr" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {groupDigits(result.r.value)}
            </p>
            <p class="words-read">
              {(result.r.spelling === 'usual' ? t.usualSpelling : t.otherSpelling).replace('{words}', result.r.usual)}
            </p>
            <div class="words-actions">
              <button type="button" class="btn" onClick={() => copy('plain')}>
                {flash === 'plain' ? t.copied : t.copyPlain}
              </button>
              <button type="button" class="btn btn-ghost" onClick={() => copy('spaced')}>
                {flash === 'spaced' ? t.copied : t.copy}
              </button>
              <button type="button" class="btn btn-ghost" onClick={() => setInput('')}>
                {t.clear}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
