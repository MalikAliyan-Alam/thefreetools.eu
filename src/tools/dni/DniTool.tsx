import { useEffect, useState } from 'preact/hooks';
import { checkId } from './engine';
import type { DniLabels } from './labels';
// Styles: ../calc/calc.css, inlined on this tool's pages by components/ToolIsland.astro.

export default function DniTool({ labels: t }: { labels: DniLabels }) {
  const key = 'tft:dni:v1:es';
  const [value, setValue] = useState('');
  const [flash, setFlash] = useState(false);

  // The document number is personal data: it stays in memory only, nothing is saved or sent.
  useEffect(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* storage blocked */
    }
  }, []);

  const r = checkId(value);
  const copy = async () => {
    if (!r.ok) return;
    try {
      await navigator.clipboard.writeText(r.full);
      setFlash(true);
      setTimeout(() => setFlash(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div class="dni">
      <label class="calc-field">
        <span>{t.field}</span>
        <input
          class="input"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellcheck={false}
          dir="ltr"
          placeholder={t.placeholder}
          aria-invalid={value !== '' && !r.ok}
          value={value}
          onInput={(e) => setValue(e.currentTarget.value)}
        />
      </label>
      <p class="calc-hint">{t.hint}</p>

      {value !== '' && !r.ok && <p class="calc-error">{r.reason === 'length' ? t.errLength : t.errFormat}</p>}

      {r.ok && (
        <div class="calc-result" aria-live="polite">
          <div class="calc-big">
            <span>{t.letter}</span>
            <b dir="ltr">{r.expected}</b>
          </div>
          <dl class="calc-list">
            <div>
              <dt>{t.full}</dt>
              <dd dir="ltr">{r.full}</dd>
            </div>
            <div>
              <dt>{r.kind === 'nie' ? t.kindNie : t.kindDni}</dt>
              <dd dir="ltr">
                {r.number} mod 23 = {r.remainder}
              </dd>
            </div>
          </dl>
          {r.valid !== undefined && (
            <p class="calc-hint" role="status">
              <b>{r.valid ? t.valid : t.invalid.replace('{letter}', r.expected)}</b>
            </p>
          )}
          <div class="calc-actions">
            <button type="button" class="btn" onClick={copy}>
              {flash ? t.copied : t.copy}
            </button>
            <button type="button" class="btn btn-ghost" onClick={() => setValue('')}>
              {t.reset}
            </button>
          </div>
        </div>
      )}

      {value === '' && (
        <div class="calc-actions">
          <button type="button" class="btn btn-ghost" onClick={() => setValue('12345678')}>
            {t.example}
          </button>
        </div>
      )}
    </div>
  );
}
