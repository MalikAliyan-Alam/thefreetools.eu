import { useEffect, useMemo, useState } from 'preact/hooks';
import { HIJRI_MONTHS, gregorianToHijri, hijriToGregorian, isValidGregorian, todayGregorian, weekday, type YMD } from '../hijri/engine';
import { compare, gregorianAge, hijriAge, nextBirthday, totalDays, type Span } from './engine';
import type { AgeLabels } from './labels';
// Styles: age.css, inlined on this tool's pages by components/ToolIsland.astro.

type Cal = 'gregorian' | 'hijri';
type State = { cal: Cal; d: number; m: number; y: string; on: string };
const STORAGE_KEY = 'tft:age:v1';

const isoOf = (g: YMD) => `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}`;
const parseIso = (s: string): YMD | null => {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? { y: +m[1], m: +m[2], d: +m[3] } : null;
};

export default function AgeTool({ labels: t, locale }: { labels: AgeLabels; locale: 'en' | 'ar' | 'es' }) {
  const numLocale = locale === 'ar' ? 'ar-u-nu-latn' : locale;
  const nf = new Intl.NumberFormat(numLocale);
  const plural = new Intl.PluralRules(locale);
  const unit = (n: number, u: 'y' | 'm' | 'd') => {
    const forms = t.units[u];
    return `${nf.format(n)} ${forms[plural.select(n)] ?? forms.other}`;
  };
  const gregMonths = useMemo(
    () => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(numLocale, { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2020, i, 1))),
    [numLocale],
  );
  const weekdays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(numLocale, { weekday: 'long', timeZone: 'UTC' }).format(Date.UTC(2023, 0, 1 + i))),
    [numLocale],
  );
  const hMonths = HIJRI_MONTHS[locale === 'ar' ? 'ar' : 'en'];

  const [state, setState] = useState<State>({ cal: t.primary, d: 1, m: 1, y: '', on: '' });
  const [today, setToday] = useState<YMD | null>(null);
  const [flash, setFlash] = useState<'' | 'copied' | 'shared'>('');

  // Today comes from the visitor's clock, so read it (and saved input) after hydration.
  useEffect(() => {
    setToday(todayGregorian());
    try {
      const h = location.hash.match(/^#s=(.+)$/);
      const saved = h ? JSON.parse(decodeURIComponent(h[1])) : JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && (saved.cal === 'gregorian' || saved.cal === 'hijri')) setState((s) => ({ ...s, ...saved }));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage blocked */
    }
  }, [state]);

  const set = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }));

  const on = (state.on && parseIso(state.on)) || today;

  const birth = useMemo((): YMD | null | 'invalid' => {
    const y = Number(state.y);
    if (!state.y || !Number.isInteger(y)) return null;
    const input = { y, m: state.m, d: state.d };
    if (state.cal === 'gregorian') return isValidGregorian(input) ? input : 'invalid';
    return hijriToGregorian(input) ?? 'invalid';
  }, [state]);

  const out = useMemo(() => {
    if (!on || !birth) return { hint: t.enterBirth };
    if (birth === 'invalid') return { hint: t.invalid };
    if (compare(birth, on) > 0) return { hint: t.future };
    const g = gregorianAge(birth, on);
    const h = hijriAge(birth, on);
    const days = totalDays(birth, on);
    const next = nextBirthday(birth, on);
    return { g, h, days, next, birth };
  }, [birth, on, t]);

  const fmtSpan = (s: Span) => t.ageFormat.replace('{y}', unit(s.years, 'y')).replace('{m}', unit(s.months, 'm')).replace('{d}', unit(s.days, 'd'));
  const fmtG = (g: YMD) => `${g.d} ${gregMonths[g.m - 1]} ${g.y}`;
  const fmtH = (g: YMD) => {
    const h = gregorianToHijri(g);
    return `${h.d} ${hMonths[h.m - 1]} ${h.y} ${t.hijriSuffix}`;
  };

  const primaryIsHijri = t.primary === 'hijri';

  const flashFor = (k: 'copied' | 'shared') => {
    setFlash(k);
    setTimeout(() => setFlash(''), 1800);
  };
  const copy = async () => {
    if (!('g' in out) || !out.g) return;
    const text = `${t.gregAgeLabel}: ${fmtSpan(out.g)} · ${t.hijriAgeLabel}: ${fmtSpan(out.h)}`;
    try {
      await navigator.clipboard.writeText(text);
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
      /* link stays in the address bar */
    }
  };

  const switchCal = (cal: Cal) => {
    if (cal === state.cal) return;
    // Keep the same birthday when switching the input calendar.
    if (birth && birth !== 'invalid') {
      const next = cal === 'hijri' ? gregorianToHijri(birth) : birth;
      set({ cal, d: next.d, m: next.m, y: String(next.y) });
    } else set({ cal });
  };

  const months = state.cal === 'hijri' ? hMonths : gregMonths;

  return (
    <div class="age">
      <div class="age-bar">
        <span class="age-bar-label">{t.birthIn}</span>
        <div class="segmented" role="radiogroup" aria-label={t.birthIn}>
          {(['gregorian', 'hijri'] as Cal[]).map((c) => (
            <button type="button" role="radio" aria-checked={state.cal === c} class={state.cal === c ? 'is-on' : ''} onClick={() => switchCal(c)}>
              {c === 'gregorian' ? t.gregorian : t.hijri}
            </button>
          ))}
        </div>
      </div>

      <div class="age-inputs">
        <label>
          <span>{t.day}</span>
          <select class="input" value={state.d} onChange={(e) => set({ d: Number(e.currentTarget.value) })}>
            {Array.from({ length: state.cal === 'hijri' ? 30 : 31 }, (_, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.month}</span>
          <select class="input" value={state.m} onChange={(e) => set({ m: Number(e.currentTarget.value) })}>
            {months.map((name, i) => (
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
            maxLength={4}
            placeholder={t.yearPlaceholder}
            value={state.y}
            onInput={(e) => set({ y: e.currentTarget.value.replace(/\D/g, '') })}
          />
        </label>
      </div>

      <details class="fold">
        <summary>{t.onDate}</summary>
        <div class="fold-body">
          <label>
            <span>{t.onDateHint}</span>
            <input class="input" type="date" value={state.on || (today ? isoOf(today) : '')} onInput={(e) => set({ on: e.currentTarget.value })} />
          </label>
        </div>
      </details>

      <div class={`age-result${'hint' in out ? ' is-empty' : ''}`} aria-live="polite">
        {'hint' in out ? (
          <p class="age-hint">{out.hint}</p>
        ) : (
          <>
            <p class="age-label">{primaryIsHijri ? t.hijriAgeLabel : t.ageLabel}</p>
            <p class="age-big">{fmtSpan(primaryIsHijri ? out.h : out.g)}</p>
            <p class="age-second">
              {primaryIsHijri ? t.gregAgeLabel : t.hijriAgeLabel}: <strong>{fmtSpan(primaryIsHijri ? out.g : out.h)}</strong>
            </p>
            <dl class="age-stats">
              <div>
                <dt>{t.totalDays}</dt>
                <dd>{nf.format(out.days)}</dd>
              </div>
              <div>
                <dt>{t.totalWeeks}</dt>
                <dd>{nf.format(Math.floor(out.days / 7))}</dd>
              </div>
              <div>
                <dt>{t.totalMonths}</dt>
                <dd>{nf.format(out.g.years * 12 + out.g.months)}</dd>
              </div>
              <div>
                <dt>{t.nextBirthday}</dt>
                <dd>
                  {out.next.inDays === 0
                    ? t.birthdayToday
                    : t.nextBirthdayIn.replace('{n}', unit(out.next.inDays, 'd')).replace('{weekday}', weekdays[weekday(out.next.date)])}
                </dd>
              </div>
            </dl>
            <p class="age-born">
              {t.bornOn}: {weekdays[weekday(out.birth)]} · {fmtG(out.birth)} · {fmtH(out.birth)}
            </p>
            <div class="age-actions">
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
    </div>
  );
}
