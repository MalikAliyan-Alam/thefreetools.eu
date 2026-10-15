import { useEffect, useState } from 'preact/hooks';
import { UMA_2026, aguinaldo, dailyFromMonthly, daysWorkedInYear } from './engine';
import type { AguinaldoLabels } from './labels';
// Styles: ../calc/calc.css, inlined on this tool's pages by components/ToolIsland.astro.

type State = { type: 'daily' | 'monthly'; salary: string; days: string; worked: string; start: string; uma: string };
const DEFAULT: State = { type: 'monthly', salary: '', days: '15', worked: '365', start: '', uma: String(UMA_2026) };

const num = (s: string): number | null => {
  const t = s.replace(/[\s,]/g, '').trim();
  if (t === '') return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
};
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

export default function AguinaldoTool({ labels: t }: { labels: AguinaldoLabels }) {
  const key = 'tft:aguinaldo:v1:es';
  const [s, setS] = useState<State>(DEFAULT);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved && typeof saved.salary === 'string') setS({ ...DEFAULT, ...saved });
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

  const salary = num(s.salary);
  const days = num(s.days);
  const worked = num(s.worked);
  const uma = num(s.uma);
  const daily = salary !== null && salary > 0 ? (s.type === 'monthly' ? dailyFromMonthly(salary) : salary) : null;
  const valid = daily !== null && days !== null && days >= 0 && worked !== null && worked >= 0 && uma !== null && uma > 0;
  const r = valid ? aguinaldo({ daily: daily!, days: days!, daysWorked: worked!, uma: uma! }) : null;

  const setStart = (value: string) => {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return setS({ ...s, start: value });
    const year = new Date().getFullYear();
    setS({ ...s, start: value, worked: String(daysWorkedInYear({ y: +m[1], m: +m[2], d: +m[3] }, year)) });
  };

  const copy = async () => {
    if (!r) return;
    const lines = [`${t.gross}: ${money.format(r.gross)}`, `${t.exempt}: ${money.format(r.exempt)}`, `${t.taxable}: ${money.format(r.taxable)}`];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setFlash(true);
      setTimeout(() => setFlash(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div class="aguinaldo">
      <div class="calc-grid">
        <label class="calc-field">
          <span>{t.salaryType}</span>
          <select class="input" value={s.type} onChange={(e) => setS({ ...s, type: e.currentTarget.value as State['type'] })}>
            <option value="monthly">{t.monthly}</option>
            <option value="daily">{t.daily}</option>
          </select>
        </label>
        <label class="calc-field">
          <span>{t.salary}</span>
          <input
            class="input"
            inputMode="decimal"
            autoComplete="off"
            dir="ltr"
            placeholder="0.00"
            value={s.salary}
            onInput={(e) => setS({ ...s, salary: e.currentTarget.value })}
          />
        </label>
        <label class="calc-field">
          <span>{t.worked}</span>
          <input class="input" inputMode="numeric" dir="ltr" value={s.worked} onInput={(e) => setS({ ...s, worked: e.currentTarget.value })} />
        </label>
      </div>
      <p class="calc-hint">{s.type === 'monthly' ? t.monthlyNote : t.workedFull}</p>

      <details class="fold">
        <summary>{t.advanced}</summary>
        <div class="fold-body">
          <div class="calc-grid">
            <label class="calc-field">
              <span>{t.days}</span>
              <input class="input" inputMode="numeric" dir="ltr" value={s.days} onInput={(e) => setS({ ...s, days: e.currentTarget.value })} />
            </label>
            <label class="calc-field">
              <span>{t.startDate}</span>
              <input class="input" type="date" value={s.start} onInput={(e) => setStart(e.currentTarget.value)} />
            </label>
            <label class="calc-field">
              <span>{t.uma}</span>
              <input class="input" inputMode="decimal" dir="ltr" value={s.uma} onInput={(e) => setS({ ...s, uma: e.currentTarget.value })} />
            </label>
          </div>
          <p class="calc-hint">
            {t.daysHint} {t.startHint} {t.umaHint}
          </p>
        </div>
      </details>

      {r ? (
        <div class="calc-result" aria-live="polite">
          <div class="calc-big">
            <span>{t.gross}</span>
            <b dir="ltr">{money.format(r.gross)}</b>
          </div>
          <dl class="calc-list">
            <div>
              <dt>{t.dailyUsed}</dt>
              <dd dir="ltr">{money.format(daily!)}</dd>
            </div>
            <div>
              <dt>{t.exempt}</dt>
              <dd dir="ltr">{money.format(r.exempt)}</dd>
            </div>
            <div class="is-total">
              <dt>{t.taxable}</dt>
              <dd dir="ltr">{money.format(r.taxable)}</dd>
            </div>
          </dl>
          <p class="calc-hint">{t.taxNote}</p>
          <div class="calc-actions">
            <button type="button" class="btn" onClick={copy}>
              {flash ? t.copied : t.copy}
            </button>
            <button type="button" class="btn btn-ghost" onClick={() => setS(DEFAULT)}>
              {t.reset}
            </button>
          </div>
        </div>
      ) : (
        <div class="calc-actions">
          <button type="button" class="btn btn-ghost" onClick={() => setS({ ...DEFAULT, salary: '15000' })}>
            {t.example}
          </button>
          {s.salary !== '' && <span class="calc-error">{t.invalid}</span>}
        </div>
      )}
    </div>
  );
}
