import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  SCALES,
  type Course,
  type Scale,
  type ScaleId,
  cumulative,
  roundTo,
  parseNumber,
  requiredAverage,
  scaleMin,
  summarize,
} from './engine';
import type { GpaLabels } from './labels';
import './gpa.css';

type State = {
  scaleId: ScaleId;
  courses: Course[];
  prevAvg: string;
  prevWeight: string;
  targetAvg: string;
  targetWeight: string;
  /** Per-scale overrides for letter grade points, e.g. { sa5: { F: 0 } }. */
  points: Partial<Record<ScaleId, Record<string, number>>>;
};

const EXAMPLE_GRADES: Record<ScaleId, string[]> = {
  us4: ['A', 'B+', 'A-', 'C+'],
  sa5: ['A+', 'B+', 'A', 'C+'],
  sa4: ['A+', 'B+', 'A', 'C+'],
  pct100: ['91', '84', '77', '68'],
  cl7: ['6,3', '5,5', '4,8', '6,0'],
};

const blankRows = (): Course[] => Array.from({ length: 4 }, () => ({ name: '', grade: '', weight: 0 }));

const storageKey = (locale: string) => `tft:gpa:v1:${locale}`;

function applyPoints(scale: Scale, overrides?: Record<string, number>): Scale {
  if (scale.kind !== 'letter' || !overrides) return scale;
  return { ...scale, grades: scale.grades.map((g) => ({ ...g, points: overrides[g.label] ?? g.points })) };
}

function readHash(): Partial<State> | null {
  try {
    const m = location.hash.match(/^#s=(.+)$/);
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
  } catch {
    return null;
  }
}

function readStored(locale: string): Partial<State> | null {
  try {
    const raw = localStorage.getItem(storageKey(locale));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function GpaTool({ labels: t, locale }: { labels: GpaLabels; locale: string }) {
  const initial: State = {
    scaleId: t.scales[0],
    courses: blankRows(),
    prevAvg: '',
    prevWeight: '',
    targetAvg: '',
    targetWeight: '',
    points: {},
  };
  const [state, setState] = useState<State>(initial);
  const [showPrev, setShowPrev] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [flash, setFlash] = useState<'' | 'copied' | 'shared'>('');
  const [resultVisible, setResultVisible] = useState(true);
  const hydrated = useRef(false);
  const resultRef = useRef<HTMLElement>(null);

  // On phones the result card sits below the course list; show a small
  // floating summary while it is off screen.
  useEffect(() => {
    const el = resultRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setResultVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Restore from a shared link first, then from this browser's last session.
  useEffect(() => {
    const saved = readHash() ?? readStored(locale);
    if (saved && saved.scaleId && t.scales.includes(saved.scaleId) && Array.isArray(saved.courses)) {
      const next = { ...initial, ...saved } as State;
      setState(next);
      if (next.prevAvg || next.prevWeight) setShowPrev(true);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(storageKey(locale), JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode): the tool still works */
    }
  }, [state]);

  const scale = useMemo(
    () => applyPoints(SCALES[state.scaleId], state.points[state.scaleId]),
    [state.scaleId, state.points],
  );
  const term = useMemo(() => summarize(scale, state.courses), [scale, state.courses]);
  const total = useMemo(
    () => cumulative(term, parseNumber(state.prevAvg), parseNumber(state.prevWeight)),
    [term, state.prevAvg, state.prevWeight],
  );
  const hasPrev = total !== term;
  const shown = total.average;
  const min = scaleMin(scale);
  const fraction = shown === null ? 0 : Math.max(0, Math.min(1, (shown - min) / (scale.max - min)));

  const need = useMemo(() => {
    const target = parseNumber(state.targetAvg);
    const next = parseNumber(state.targetWeight);
    if (target === null || next === null || total.weight === 0) return null;
    return requiredAverage(total, target, next);
  }, [total, state.targetAvg, state.targetWeight]);

  const update = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }));
  const updateCourse = (i: number, patch: Partial<Course>) =>
    setState((s) => ({ ...s, courses: s.courses.map((c, j) => (j === i ? { ...c, ...patch } : c)) }));

  const changeScale = (scaleId: ScaleId) => {
    // Grades don't translate between systems, so keep names and weights only.
    setState((s) => ({ ...s, scaleId, courses: s.courses.map((c) => ({ ...c, grade: '' })) }));
  };

  const fillExample = () => {
    const grades = EXAMPLE_GRADES[state.scaleId];
    update({ courses: t.exampleCourses.map((c, i) => ({ ...c, grade: grades[i % grades.length] })) });
  };

  const reset = () => {
    setState({ ...initial, scaleId: state.scaleId });
    setShowPrev(false);
    history.replaceState(null, '', location.pathname);
  };

  const flashFor = (kind: 'copied' | 'shared') => {
    setFlash(kind);
    setTimeout(() => setFlash(''), 1800);
  };

  const copyResult = async () => {
    if (shown === null) return;
    const text = t.copyTemplate
      .replace('{avg}', fmt(shown))
      .replace('{max}', fmt(scale.max))
      .replace('{weight}', String(total.weight));
    try {
      await navigator.clipboard.writeText(text);
      flashFor('copied');
    } catch {
      /* clipboard blocked; nothing to do */
    }
  };

  const shareLink = async () => {
    const url = `${location.origin}${location.pathname}#s=${encodeURIComponent(JSON.stringify(state))}`;
    history.replaceState(null, '', url);
    try {
      await navigator.clipboard.writeText(url);
      flashFor('shared');
    } catch {
      /* the link is still in the address bar */
    }
  };

  // Arabic pages keep Latin digits, which is what Gulf and Jordanian university portals use.
  const numLocale = locale === 'ar' ? 'ar-u-nu-latn' : locale;
  const numberFmt = new Intl.NumberFormat(numLocale, { maximumFractionDigits: 2 });
  const avgFmt = new Intl.NumberFormat(numLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt = (n: number) => avgFmt.format(roundTo(n));

  return (
    <div class="gpa">
      <div class="gpa-bar">
        <div class="segmented" role="radiogroup" aria-label={t.scale}>
          {t.scales.map((id) => (
            <button
              type="button"
              role="radio"
              aria-checked={state.scaleId === id}
              class={state.scaleId === id ? 'is-on' : ''}
              onClick={() => changeScale(id)}
            >
              {t.scaleNames[id]}
            </button>
          ))}
        </div>
        <div class="gpa-actions">
          <button type="button" class="chip" onClick={fillExample}>
            {t.example}
          </button>
          <button type="button" class="chip chip-quiet" onClick={reset}>
            {t.reset}
          </button>
        </div>
      </div>

      <div class="gpa-grid">
        <div class="gpa-main">
          <div class="rows">
            <div class="row row-head">
              <span>{t.course}</span>
              <span>{t.grade}</span>
              <span title={t.weightHint}>
                {t.weight}
              </span>
              <span />
            </div>
            {state.courses.map((c, i) => {
              const bad = term.invalid.includes(i);
              return (
                <div class={`row${bad ? ' is-bad' : ''}`} key={i}>
                  <input
                    class="input"
                    value={c.name}
                    placeholder={`${t.coursePlaceholder} ${i + 1}`}
                    aria-label={`${t.course} ${i + 1}`}
                    onInput={(e) => updateCourse(i, { name: e.currentTarget.value })}
                  />
                  {scale.kind === 'letter' ? (
                    <select
                      class="input"
                      value={c.grade}
                      aria-label={`${t.grade} ${i + 1}`}
                      aria-invalid={bad}
                      onChange={(e) => updateCourse(i, { grade: e.currentTarget.value })}
                    >
                      <option value="">{t.gradePick}</option>
                      {scale.grades.map((g) => (
                        <option value={g.label}>
                          {g.label} · {numberFmt.format(g.points)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      class="input"
                      inputMode="decimal"
                      value={c.grade}
                      placeholder={`${scale.min}–${scale.max}`}
                      aria-label={`${t.grade} ${i + 1}`}
                      aria-invalid={bad}
                      onInput={(e) => updateCourse(i, { grade: e.currentTarget.value })}
                    />
                  )}
                  <input
                    class="input"
                    inputMode="decimal"
                    value={c.weight || ''}
                    placeholder="3"
                    aria-label={`${t.weight} ${i + 1}`}
                    aria-invalid={bad}
                    onInput={(e) => updateCourse(i, { weight: parseNumber(e.currentTarget.value) ?? 0 })}
                  />
                  <button
                    type="button"
                    class="icon-btn"
                    aria-label={`${t.removeCourse} ${i + 1}`}
                    onClick={() => setState((s) => ({ ...s, courses: s.courses.filter((_, j) => j !== i) }))}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            class="add-row"
            onClick={() => setState((s) => ({ ...s, courses: [...s.courses, { name: '', grade: '', weight: 0 }] }))}
          >
            + {t.addCourse}
          </button>
          {term.invalid.length > 0 && (
            <p class="note-bad" role="status">
              {t.invalidRows}
            </p>
          )}

          <details class="fold" open={showPrev} onToggle={(e) => setShowPrev(e.currentTarget.open)}>
            <summary>{t.previousToggle}</summary>
            <div class="fold-body two">
              <label>
                <span>{t.previousAverage}</span>
                <input
                  class="input"
                  inputMode="decimal"
                  value={state.prevAvg}
                  placeholder={fmt(scale.max * 0.75)}
                  onInput={(e) => update({ prevAvg: e.currentTarget.value })}
                />
              </label>
              <label>
                <span>{t.previousWeight}</span>
                <input
                  class="input"
                  inputMode="decimal"
                  value={state.prevWeight}
                  placeholder="60"
                  onInput={(e) => update({ prevWeight: e.currentTarget.value })}
                />
              </label>
            </div>
          </details>

          {scale.kind === 'letter' && (
            <details class="fold" open={showPoints} onToggle={(e) => setShowPoints(e.currentTarget.open)}>
              <summary>{t.editPoints}</summary>
              <div class="fold-body points">
                {scale.grades.map((g) => (
                  <label>
                    <span>
                      {t.pointsFor} {g.label}
                    </span>
                    <input
                      class="input"
                      inputMode="decimal"
                      value={String(g.points)}
                      onInput={(e) => {
                        const v = parseNumber(e.currentTarget.value);
                        if (v === null) return;
                        setState((s) => ({
                          ...s,
                          points: { ...s.points, [s.scaleId]: { ...s.points[s.scaleId], [g.label]: v } },
                        }));
                      }}
                    />
                  </label>
                ))}
              </div>
            </details>
          )}
        </div>

        <aside class="result" aria-live="polite" ref={resultRef}>
          <div class="ring">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" class="ring-track" />
              <circle
                cx="60"
                cy="60"
                r="52"
                class="ring-fill"
                style={{ strokeDashoffset: `${326.73 * (1 - fraction)}` }}
              />
            </svg>
            <div class="ring-text">
              {shown === null ? (
                <span class="ring-empty">—</span>
              ) : (
                <>
                  <span class="ring-value">{fmt(shown)}</span>
                  <span class="ring-max">
                    {t.outOf} {fmt(scale.max)}
                  </span>
                </>
              )}
            </div>
          </div>
          <p class="result-label">{hasPrev ? t.resultCumulative : t.resultTerm}</p>
          {shown === null ? (
            <p class="result-hint">{t.emptyResult}</p>
          ) : (
            <dl class="result-stats">
              {hasPrev && term.average !== null && (
                <div>
                  <dt>{t.resultTerm}</dt>
                  <dd>{fmt(term.average)}</dd>
                </div>
              )}
              <div>
                <dt>{t.totalWeight}</dt>
                <dd>{numberFmt.format(total.weight)}</dd>
              </div>
            </dl>
          )}
          <div class="result-actions">
            <button type="button" class="btn" onClick={copyResult} disabled={shown === null}>
              {flash === 'copied' ? t.copied : t.copy}
            </button>
            <button type="button" class="btn btn-ghost" onClick={shareLink}>
              {flash === 'shared' ? t.shared : t.share}
            </button>
          </div>

          <div class="target">
            <p class="target-title">{t.targetTitle}</p>
            <div class="two">
              <label>
                <span>{t.targetAverage}</span>
                <input
                  class="input"
                  inputMode="decimal"
                  value={state.targetAvg}
                  placeholder={fmt(scale.max * 0.8)}
                  onInput={(e) => update({ targetAvg: e.currentTarget.value })}
                />
              </label>
              <label>
                <span>{t.targetWeight}</span>
                <input
                  class="input"
                  inputMode="decimal"
                  value={state.targetWeight}
                  placeholder="15"
                  onInput={(e) => update({ targetWeight: e.currentTarget.value })}
                />
              </label>
            </div>
            {need !== null && (
              <p class="target-out">
                {need > scale.max
                  ? t.targetImpossible
                  : need <= min
                    ? t.targetAlready
                    : t.targetNeed.replace('{need}', fmt(need))}
              </p>
            )}
          </div>
        </aside>
      </div>

      {shown !== null && !resultVisible && (
        <button
          type="button"
          class="mini-result"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        >
          {hasPrev ? t.resultCumulative : t.resultTerm}: <strong>{fmt(shown)}</strong> / {fmt(scale.max)}
        </button>
      )}
    </div>
  );
}
