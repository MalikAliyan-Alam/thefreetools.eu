import { useEffect, useState } from 'preact/hooks';
import { PARTS, contributions, weighted, weightsTotal, type Weights } from './engine';
import type { WeightedLabels } from './labels';
// Styles: ../calc/calc.css, inlined on this tool's pages by components/ToolIsland.astro.

type State = { school: string; qudrat: string; tahsili: string; w: Record<(typeof PARTS)[number], string> };
const EMPTY: State = { school: '', qudrat: '', tahsili: '', w: { school: '30', qudrat: '30', tahsili: '40' } };
const EXAMPLE = { school: '95', qudrat: '88', tahsili: '82' };

const num = (s: string): number | null => {
  const t = s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(',', '.').trim();
  if (t === '') return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
};

export default function WeightedTool({ labels: t }: { labels: WeightedLabels }) {
  const key = 'tft:weighted:v1:ar';
  const [s, setS] = useState<State>(EMPTY);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved && typeof saved.school === 'string' && saved.w) setS({ ...EMPTY, ...saved });
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(s));
    } catch {
      /* storage blocked */
    }
  }, [s]);

  const w: Weights = { school: num(s.w.school) ?? 0, qudrat: num(s.w.qudrat) ?? 0, tahsili: num(s.w.tahsili) ?? 0 };
  const scores = { school: num(s.school), qudrat: num(s.qudrat), tahsili: num(s.tahsili) };
  const total = weightsTotal(w);
  const result = weighted(scores, w);
  const parts =
    result !== null
      ? contributions({ school: scores.school ?? 0, qudrat: scores.qudrat ?? 0, tahsili: scores.tahsili ?? 0 }, w)
      : null;
  const anyTyped = PARTS.some((k) => s[k] !== '');
  const fmt = (n: number) => new Intl.NumberFormat('ar-u-nu-latn', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);

  const copy = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(`${t.result}: ${fmt(result)}%`);
      setFlash(true);
      setTimeout(() => setFlash(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div class="weighted">
      <div class="calc-grid">
        {PARTS.map((k) => (
          <label class="calc-field">
            <span>
              {t[k]} ({s.w[k]}%)
            </span>
            <input
              class="input"
              inputMode="decimal"
              autoComplete="off"
              dir="ltr"
              placeholder="0 – 100"
              aria-invalid={s[k] !== '' && !(num(s[k]) !== null && num(s[k])! >= 0 && num(s[k])! <= 100)}
              value={s[k]}
              onInput={(e) => setS({ ...s, [k]: e.currentTarget.value })}
            />
          </label>
        ))}
      </div>
      <p class="calc-hint">{t.hint}</p>

      <details class="fold" open={total !== 100}>
        <summary>{t.weights}</summary>
        <div class="fold-body">
          <div class="calc-grid">
            {PARTS.map((k) => (
              <label class="calc-field">
                <span>{t[k]} (%)</span>
                <input
                  class="input"
                  inputMode="decimal"
                  dir="ltr"
                  value={s.w[k]}
                  onInput={(e) => setS({ ...s, w: { ...s.w, [k]: e.currentTarget.value } })}
                />
              </label>
            ))}
          </div>
          <p class="calc-hint">
            {t.weightsTotal}: <b dir="ltr">{fmt(total)}%</b>. {total !== 100 ? t.weightsNote : t.weightsDefault}
          </p>
          <button type="button" class="btn btn-ghost" onClick={() => setS({ ...s, w: EMPTY.w })}>
            {t.resetWeights}
          </button>
        </div>
      </details>

      {result !== null && parts ? (
        <div class="calc-result" aria-live="polite">
          <div class="calc-big">
            <span>{t.result}</span>
            <b dir="ltr">{fmt(result)}%</b>
          </div>
          {total > 0 && (
            <div class="calc-bar" aria-hidden="true">
              {PARTS.map((k, i) => (
                <i class={`b${i + 1}`} style={{ width: `${Math.max(0, parts[k])}%` }}></i>
              ))}
            </div>
          )}
          <dl class="calc-list">
            {PARTS.map((k) =>
              w[k] > 0 ? (
                <div>
                  <dt>
                    {t[k]} ({fmt(w[k])}%)
                  </dt>
                  <dd dir="ltr">{fmt(parts[k])}</dd>
                </div>
              ) : null,
            )}
          </dl>
          <div class="calc-actions">
            <button type="button" class="btn" onClick={copy}>
              {flash ? t.copied : t.copy}
            </button>
            <button type="button" class="btn btn-ghost" onClick={() => setS({ ...s, school: '', qudrat: '', tahsili: '' })}>
              {t.reset}
            </button>
          </div>
        </div>
      ) : (
        <div class="calc-actions">
          <button type="button" class="btn btn-ghost" onClick={() => setS({ ...s, ...EXAMPLE })}>
            {t.example}
          </button>
          {anyTyped && <span class="calc-error">{t.incomplete}</span>}
        </div>
      )}
    </div>
  );
}
