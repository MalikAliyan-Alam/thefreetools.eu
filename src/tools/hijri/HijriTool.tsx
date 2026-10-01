import { useEffect, useMemo, useState } from 'preact/hooks';
import {
  HIJRI_MAX_YEAR,
  HIJRI_MIN_YEAR,
  HIJRI_MONTHS,
  type HijriCalendar,
  type YMD,
  gregorianToHijri,
  hijriMonthLength,
  hijriToGregorian,
  isValidGregorian,
  todayGregorian,
  weekday,
} from './engine';
import type { HijriLabels } from './labels';
// Styles: hijri.css, inlined on this tool's pages by components/ToolIsland.astro.

type Dir = 'toGregorian' | 'toHijri';
type State = { dir: Dir; cal: HijriCalendar; input: YMD };
const STORAGE_KEY = 'tft:hijri:v1';

export default function HijriTool({ labels: t, locale }: { labels: HijriLabels; locale: 'en' | 'ar' }) {
  const numLocale = locale === 'ar' ? 'ar-u-nu-latn' : locale;
  const gregMonths = useMemo(
    () => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(numLocale, { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2020, i, 1))),
    [numLocale],
  );
  const weekdays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(numLocale, { weekday: 'long', timeZone: 'UTC' }).format(Date.UTC(2023, 0, 1 + i))),
    [numLocale],
  );
  const hMonths = HIJRI_MONTHS[locale];

  // "Today" depends on the visitor's clock, so it is filled in after hydration.
  const [today, setToday] = useState<YMD | null>(null);
  const [state, setState] = useState<State>({ dir: 'toGregorian', cal: 'islamic-umalqura', input: { y: 1447, m: 1, d: 1 } });
  const [flash, setFlash] = useState<'' | 'copied' | 'shared'>('');

  useEffect(() => {
    const g = todayGregorian();
    setToday(g);
    let next: State = { dir: 'toGregorian', cal: 'islamic-umalqura', input: gregorianToHijri(g) };
    try {
      const m = location.hash.match(/^#s=(.+)$/);
      const saved = m ? JSON.parse(decodeURIComponent(m[1])) : JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && (saved.dir === 'toGregorian' || saved.dir === 'toHijri') && saved.input) next = { ...next, ...saved };
    } catch {
      /* ignore bad saved state */
    }
    setState(next);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage blocked */
    }
  }, [state]);

  const { dir, cal, input } = state;
  const setInput = (patch: Partial<YMD>) => setState((s) => ({ ...s, input: { ...s.input, ...patch } }));

  const result = useMemo(() => {
    if (dir === 'toGregorian') {
      if (input.y < HIJRI_MIN_YEAR || input.y > HIJRI_MAX_YEAR) return { error: t.outOfRange };
      const g = hijriToGregorian(input, cal);
      return g ? { g, h: input } : { error: t.invalid };
    }
    if (!isValidGregorian(input)) return { error: t.invalid };
    const h = gregorianToHijri(input, cal);
    if (h.y < HIJRI_MIN_YEAR || h.y > HIJRI_MAX_YEAR) return { error: t.outOfRange };
    return { g: input, h };
  }, [dir, cal, input, t]);

  const fmtH = (h: YMD) => `${h.d} ${hMonths[h.m - 1]} ${h.y} ${t.hijriSuffix}`;
  const fmtG = (g: YMD) => `${g.d} ${gregMonths[g.m - 1]} ${g.y}${t.gregSuffix ? ' ' + t.gregSuffix : ''}`;
  const iso = (g: YMD) => `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}`;

  const monthInfo =
    'h' in result && result.h
      ? (() => {
          const n = hijriMonthLength(result.h.y, result.h.m, cal);
          return n ? t.monthDays.replace('{month}', hMonths[result.h.m - 1]).replace('{year}', String(result.h.y)).replace('{n}', String(n)) : '';
        })()
      : '';

  const switchDir = (next: Dir) => {
    if (next === dir) return;
    // Carry the current answer over so switching direction shows the same day.
    const carry = 'g' in result && result.g ? (next === 'toHijri' ? result.g : result.h) : next === 'toHijri' ? today ?? input : input;
    setState((s) => ({ ...s, dir: next, input: carry! }));
  };

  const useToday = () => {
    const g = todayGregorian();
    setState((s) => ({ ...s, input: s.dir === 'toHijri' ? g : gregorianToHijri(g, s.cal) }));
  };

  const flashFor = (k: 'copied' | 'shared') => {
    setFlash(k);
    setTimeout(() => setFlash(''), 1800);
  };
  const copy = async () => {
    if (!('g' in result) || !result.g) return;
    try {
      await navigator.clipboard.writeText(`${fmtH(result.h)} = ${fmtG(result.g)} (${weekdays[weekday(result.g)]})`);
      flashFor('copied');
    } catch {
      /* clipboard blocked */
    }
  };
  const share = async () => {
    const url = `${location.origin}${location.pathname}#s=${encodeURIComponent(JSON.stringify(state))}`;
    history.replaceState(null, '', url);
    try {
      await navigator.clipboard.writeText(url);
      flashFor('shared');
    } catch {
      /* link is in the address bar */
    }
  };

  const years = dir === 'toGregorian' ? { min: HIJRI_MIN_YEAR, max: HIJRI_MAX_YEAR } : { min: 1883, max: 2077 };
  const monthNames = dir === 'toGregorian' ? hMonths : gregMonths;
  const maxDay = dir === 'toGregorian' ? 30 : 31;

  return (
    <div class="hijri">
      <div class="hijri-today" aria-live="polite">
        <span class="hijri-today-label">{t.today}</span>
        {today ? (
          <>
            <strong>{fmtH(gregorianToHijri(today))}</strong>
            <span>
              {weekdays[weekday(today)]} · {fmtG(today)}
            </span>
          </>
        ) : (
          <>
            {/* Same two lines as the filled state so nothing shifts after hydration. */}
            <strong>&nbsp;</strong>
            <span>&nbsp;</span>
          </>
        )}
      </div>

      <div class="hijri-bar">
        <div class="segmented" role="radiogroup" aria-label={t.result}>
          {(['toGregorian', 'toHijri'] as Dir[]).map((d) => (
            <button type="button" role="radio" aria-checked={dir === d} class={dir === d ? 'is-on' : ''} onClick={() => switchDir(d)}>
              {d === 'toGregorian' ? t.toGregorian : t.toHijri}
            </button>
          ))}
        </div>
        <button type="button" class="chip" onClick={useToday}>
          {t.useToday}
        </button>
      </div>

      <div class="hijri-inputs">
        <label>
          <span>{t.day}</span>
          <select class="input" value={input.d} onChange={(e) => setInput({ d: Number(e.currentTarget.value) })}>
            {Array.from({ length: maxDay }, (_, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <label class="hijri-month">
          <span>{t.month}</span>
          <select class="input" value={input.m} onChange={(e) => setInput({ m: Number(e.currentTarget.value) })}>
            {monthNames.map((name, i) => (
              <option value={i + 1}>
                {i + 1} · {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.year}</span>
          <input
            class="input"
            inputMode="numeric"
            value={String(input.y)}
            min={years.min}
            max={years.max}
            onInput={(e) => {
              const y = Number(e.currentTarget.value);
              if (Number.isInteger(y)) setInput({ y });
            }}
          />
        </label>
      </div>

      <div class={`hijri-result${'error' in result ? ' is-bad' : ''}`} aria-live="polite">
        {'error' in result ? (
          <p class="hijri-error">{result.error}</p>
        ) : (
          <>
            <p class="hijri-big">{dir === 'toGregorian' ? fmtG(result.g) : fmtH(result.h)}</p>
            <p class="hijri-sub">
              {weekdays[weekday(result.g)]} · {dir === 'toGregorian' ? fmtH(result.h) : fmtG(result.g)} · <span dir="ltr">{iso(result.g)}</span>
            </p>
            {monthInfo && <p class="hijri-info">{monthInfo}</p>}
            <div class="hijri-actions">
              <button type="button" class="btn" onClick={copy}>
                {flash === 'copied' ? t.copied : t.copy}
              </button>
              <button type="button" class="btn btn-ghost" onClick={share}>
                {flash === 'shared' ? t.shared : t.share}
              </button>
            </div>
          </>
        )}
      </div>

      <details class="fold">
        <summary>{t.method}</summary>
        <div class="fold-body">
          <div class="segmented" role="radiogroup" aria-label={t.method}>
            {(['islamic-umalqura', 'islamic-civil'] as HijriCalendar[]).map((c) => (
              <button
                type="button"
                role="radio"
                aria-checked={cal === c}
                class={cal === c ? 'is-on' : ''}
                onClick={() => setState((s) => ({ ...s, cal: c }))}
              >
                {c === 'islamic-umalqura' ? t.methodUmmAlQura : t.methodCivil}
              </button>
            ))}
          </div>
          <p class="hijri-note">{t.sightingNote}</p>
        </div>
      </details>
    </div>
  );
}
