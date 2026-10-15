import { useEffect, useMemo, useState } from 'preact/hooks';
import { gradeFor, minScoreFor, passingScore, scaleTable } from './engine';
import type { GradeScaleLabels } from './labels';
// Styles: ../calc/calc.css, inlined on this tool's pages by components/ToolIsland.astro.

type State = { max: string; exigency: string; score: string; want: string };
const DEFAULT: State = { max: '60', exigency: '60', score: '', want: '4' };
const MAX_ROWS = 200;

const num = (s: string): number | null => {
  const t = s.replace(',', '.').trim();
  if (t === '') return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
};
const nf = new Intl.NumberFormat('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nfp = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 });

export default function GradeScaleTool({ labels: t }: { labels: GradeScaleLabels }) {
  const key = 'tft:gradescale:v1:es';
  const [s, setS] = useState<State>(DEFAULT);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved && typeof saved.max === 'string') setS({ ...DEFAULT, ...saved });
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

  const max = num(s.max);
  const ex = num(s.exigency);
  const score = num(s.score);
  const want = num(s.want);
  const okSetup = max !== null && Number.isInteger(max) && max >= 1 && ex !== null && ex > 0 && ex < 100;
  const e = okSetup ? ex! / 100 : 0;
  const bigTable = okSetup && max! > MAX_ROWS;
  const grade = okSetup && score !== null && score >= 0 ? gradeFor(score, max!, e) : null;
  const pass = okSetup ? passingScore(max!, e) : null;
  const need = okSetup && want !== null && want >= 1 && want <= 7 ? minScoreFor(Math.round(want * 10) / 10, max!, e) : null;
  const rows = useMemo(() => (okSetup && !bigTable ? scaleTable(max!, e) : []), [okSetup, bigTable, max, e]);

  const copy = async () => {
    if (grade === null) return;
    try {
      await navigator.clipboard.writeText(`${nfp.format(score!)}/${max} (${nfp.format(ex!)}%): ${t.grade} ${nf.format(grade)}`);
      setFlash(true);
      setTimeout(() => setFlash(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div class="gradescale">
      <div class="calc-grid">
        <label class="calc-field">
          <span>{t.max}</span>
          <input class="input" inputMode="numeric" dir="ltr" value={s.max} onInput={(e) => setS({ ...s, max: e.currentTarget.value })} />
        </label>
        <label class="calc-field">
          <span>{t.exigency} (%)</span>
          <input class="input" inputMode="decimal" dir="ltr" value={s.exigency} onInput={(e) => setS({ ...s, exigency: e.currentTarget.value })} />
        </label>
        <label class="calc-field">
          <span>{t.score}</span>
          <input
            class="input"
            inputMode="decimal"
            dir="ltr"
            autoComplete="off"
            placeholder="0"
            value={s.score}
            onInput={(e) => setS({ ...s, score: e.currentTarget.value })}
          />
        </label>
      </div>
      <p class="calc-hint">{t.exigencyHint}</p>

      {!okSetup && <p class="calc-error">{t.invalid}</p>}

      {okSetup && (
        <div class="calc-result" aria-live="polite">
          <div class="calc-big">
            <span>{t.grade}</span>
            <b dir="ltr">{grade !== null ? nf.format(grade) : '—'}</b>
          </div>
          <dl class="calc-list">
            <div>
              <dt>{t.passAt}</dt>
              <dd dir="ltr">{t.passAtValue.replace('{n}', nfp.format(pass!))}</dd>
            </div>
          </dl>
          <div class="calc-grid" style={{ marginTop: '12px' }}>
            <label class="calc-field">
              <span>{t.wantGrade}</span>
              <input class="input" inputMode="decimal" dir="ltr" value={s.want} onInput={(e) => setS({ ...s, want: e.currentTarget.value })} />
            </label>
            <div class="calc-field">
              <span>{t.needScore}</span>
              <div class="input" dir="ltr" style={{ display: 'flex', alignItems: 'center' }}>
                {need !== null ? `${need} / ${max}` : '—'}
              </div>
            </div>
          </div>
          <div class="calc-actions">
            {grade !== null && (
              <button type="button" class="btn" onClick={copy}>
                {flash ? t.copied : t.copy}
              </button>
            )}
            <button type="button" class="btn btn-ghost" onClick={() => setS({ ...s, score: '' })}>
              {t.reset}
            </button>
            {score === null && (
              <button type="button" class="btn btn-ghost" onClick={() => setS({ ...s, score: String(Math.round(max! * 0.75)) })}>
                {t.example}
              </button>
            )}
          </div>
        </div>
      )}

      {okSetup && (
        <details class="fold" open>
          <summary>{t.table}</summary>
          <div class="fold-body">
            {bigTable ? (
              <p class="calc-error">{t.tooBig}</p>
            ) : (
              <div class="calc-scroll">
                <table class="calc-table">
                  <thead>
                    <tr>
                      <th>{t.tableScore}</th>
                      <th>{t.tableGrade}</th>
                    </tr>
                  </thead>
                  <tbody dir="ltr">
                    {rows.map((r) => (
                      <tr class={score !== null && Math.round(score) === r.score ? 'is-hit' : ''}>
                        <td>{r.score}</td>
                        <td>{nf.format(r.grade)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
