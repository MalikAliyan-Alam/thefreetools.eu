import { useEffect, useMemo, useState } from 'preact/hooks';
import { CURRENCIES, DEFAULT_CURRENCY, hasThreeDecimals, parseAmount, toWords, type FrVariant, type Lang, type LetterCase } from './engine';
import type { WordsLabels } from './labels';
// Styles: words.css, inlined on this tool's pages by components/ToolIsland.astro.

type State = {
  lang: Lang;
  input: string;
  currency: string;
  cheque: boolean;
  and: boolean;
  indian: boolean;
  only: boolean;
  letterCase: LetterCase;
  frVariant: FrVariant;
  reform: boolean;
};
const LANGS: Lang[] = ['en', 'es', 'fr', 'ar'];
const FR_VARIANTS: FrVariant[] = ['fr', 'be', 'ch'];
const CASES: LetterCase[] = ['sentence', 'upper', 'title', 'lower'];
const EXAMPLES = ['1234.56', '2000', '1500000', '21'];
// French writes a space for thousands and a comma for decimals.
const EXAMPLES_FR = ['1 234,56', '2 000', '1 500 000', '21'];
const isIndian = (c: string) => c === 'INR' || c === 'PKR';

export default function WordsTool({ labels: t, locale }: { labels: WordsLabels; locale: Lang }) {
  const storageKey = `tft:words:v1:${locale}`;
  const numLocale = locale === 'ar' ? 'ar-u-nu-latn' : locale;
  const [state, setState] = useState<State>({
    lang: locale,
    input: '',
    currency: DEFAULT_CURRENCY[locale],
    cheque: false,
    and: false,
    indian: false,
    only: locale === 'ar',
    letterCase: 'sentence',
    frVariant: 'fr',
    reform: false,
  });
  const [flash, setFlash] = useState<'' | 'copied' | 'shared'>('');

  useEffect(() => {
    try {
      const h = location.hash.match(/^#s=(.+)$/);
      const saved = h ? JSON.parse(decodeURIComponent(h[1])) : JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved && LANGS.includes(saved.lang)) {
        const currencyOk = saved.currency === '' || saved.currency in CURRENCIES[saved.lang as Lang];
        setState((s) => ({ ...s, ...saved, currency: currencyOk ? saved.currency : DEFAULT_CURRENCY[saved.lang as Lang] }));
      }
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* storage blocked */
    }
  }, [state]);

  const set = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }));
  const setLang = (lang: Lang) => {
    const currency = DEFAULT_CURRENCY[lang];
    set({ lang, currency, indian: isIndian(currency), only: lang === 'ar' });
  };

  const currencyNames = useMemo(() => {
    let dn: Intl.DisplayNames | null = null;
    try {
      dn = new Intl.DisplayNames([numLocale], { type: 'currency' });
    } catch {
      /* old browser: show codes only */
    }
    return (code: string) => (dn ? `${code} · ${dn.of(code)}` : code);
  }, [numLocale]);

  const codes = Object.keys(CURRENCIES[state.lang]);
  const parsed = parseAmount(state.input, hasThreeDecimals(state.lang, state.currency), locale === 'fr' || state.lang === 'fr');

  const result = useMemo(() => {
    if (!state.input.trim()) return { hint: t.empty };
    if (parsed === 'too-big') return { hint: t.tooBig, bad: true };
    if (!parsed) return { hint: t.invalid, bad: true };
    const text = toWords(state.lang, parsed, state);
    const nf = new Intl.NumberFormat(numLocale);
    const decimalSep = nf.formatToParts(1.5).find((p) => p.type === 'decimal')?.value ?? '.';
    const n = (parsed.negative ? '−' : '') + nf.format(BigInt(parsed.int)) + (parsed.frac ? decimalSep + parsed.frac : '');
    return { text, readAs: t.readAs.replace('{n}', state.currency ? `${n} ${state.currency}` : n) };
  }, [state, parsed, t]);

  const flashFor = (k: 'copied' | 'shared') => {
    setFlash(k);
    setTimeout(() => setFlash(''), 1800);
  };
  const copy = async () => {
    if (!('text' in result) || !result.text) return;
    try {
      await navigator.clipboard.writeText(result.text);
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

  return (
    <div class="words">
      <label class="words-amount">
        <span>{t.amount}</span>
        <input
          class="input"
          inputMode="decimal"
          autoComplete="off"
          placeholder={t.amountPlaceholder}
          value={state.input}
          dir="ltr"
          onInput={(e) => set({ input: e.currentTarget.value })}
        />
      </label>
      <div class="words-examples">
        <span>{t.examples}</span>
        {(locale === 'fr' ? EXAMPLES_FR : EXAMPLES).map((x) => (
          <button type="button" class="chip" dir="ltr" onClick={() => set({ input: x })}>
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
            <p class="words-text" lang={state.lang} dir={state.lang === 'ar' ? 'rtl' : 'ltr'}>
              {result.text}
            </p>
            <p class="words-read">{result.readAs}</p>
            <div class="words-actions">
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

      <div class="words-bar">
        <label>
          <span>{t.language}</span>
          <select class="input" value={state.lang} onChange={(e) => setLang(e.currentTarget.value as Lang)}>
            {LANGS.map((l) => (
              <option value={l}>{t.langNames[l]}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.currency}</span>
          <select
            class="input"
            value={state.currency}
            onChange={(e) => {
              const currency = e.currentTarget.value;
              set({ currency, indian: isIndian(currency) });
            }}
          >
            <option value="">{t.plainNumber}</option>
            {codes.map((c) => (
              <option value={c}>{currencyNames(c)}</option>
            ))}
          </select>
        </label>
      </div>

      <div class="words-options" role="group" aria-label={t.options}>
        {state.lang === 'en' && state.currency && (
          <label class="words-check">
            <input type="checkbox" checked={state.cheque} onChange={(e) => set({ cheque: e.currentTarget.checked })} />
            {t.cheque}
          </label>
        )}
        {state.lang === 'en' && (
          <>
            <label class="words-check">
              <input type="checkbox" checked={state.and} onChange={(e) => set({ and: e.currentTarget.checked })} />
              {t.andOption}
            </label>
            <label class="words-check">
              <input type="checkbox" checked={state.indian} onChange={(e) => set({ indian: e.currentTarget.checked })} />
              {t.indianOption}
            </label>
          </>
        )}
        {state.lang === 'fr' && (
          <>
            <label class="words-variant">
              <span>{t.frVariant}</span>
              <select class="input" value={state.frVariant} onChange={(e) => set({ frVariant: e.currentTarget.value as FrVariant })}>
                {FR_VARIANTS.map((v) => (
                  <option value={v}>{t.frVariantNames[v]}</option>
                ))}
              </select>
            </label>
            <label class="words-check">
              <input type="checkbox" checked={state.reform} onChange={(e) => set({ reform: e.currentTarget.checked })} />
              {t.reformOption}
            </label>
          </>
        )}
        {(state.lang === 'en' || state.lang === 'ar') && state.currency && (
          <label class="words-check">
            <input type="checkbox" checked={state.only} onChange={(e) => set({ only: e.currentTarget.checked })} />
            {t.onlyOption[state.lang]}
          </label>
        )}
        {state.lang !== 'ar' && (
          <label class="words-case">
            <span>{t.letterCase}</span>
            <select class="input" value={state.letterCase} onChange={(e) => set({ letterCase: e.currentTarget.value as LetterCase })}>
              {CASES.map((c) => (
                <option value={c}>{t.caseNames[c]}</option>
              ))}
            </select>
          </label>
        )}
      </div>

    </div>
  );
}
