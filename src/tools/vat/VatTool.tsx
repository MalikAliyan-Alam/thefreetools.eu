import { useEffect, useMemo, useState } from 'preact/hooks';
import { COUNTRIES, mxWithholding, solve, type Field } from './engine';
import { CURRENCIES, parseAmount, toWords, type Lang } from '../words/engine';
import type { VatLabels } from './labels';
import './vat.css';

type State = { country: string; rate: string; from: Field; value: string; ivaRet: boolean; isr: string };
const FIELDS: Field[] = ['net', 'vat', 'gross'];
const ES_LOCALES: Record<string, string> = { MX: 'es-MX', MXF: 'es-MX', CL: 'es-CL', ES: 'es-ES', PE: 'es-PE', CO: 'es-CO', AR: 'es-AR' };

const toNumber = (s: string) => {
  const a = parseAmount(s);
  return a && a !== 'too-big' && !a.negative ? Number(`${a.int}.${a.frac || 0}`) : null;
};

export default function VatTool({ labels: t, locale }: { labels: VatLabels; locale: Lang }) {
  const storageKey = `tft:vat:v1:${locale}`;
  const baseLocale = locale === 'ar' ? 'ar-u-nu-latn' : locale;
  const initial = (country: string): State => ({
    country,
    rate: String(COUNTRIES[country]?.rate ?? 15),
    from: 'net',
    value: '',
    ivaRet: false,
    isr: '0',
  });
  const [state, setState] = useState<State>(initial(t.defaultCountry));
  const [flash, setFlash] = useState<'' | 'copied' | 'shared'>('');

  useEffect(() => {
    try {
      const h = location.hash.match(/^#s=(.+)$/);
      const saved = h ? JSON.parse(decodeURIComponent(h[1])) : JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved && t.countries.some((c) => c.id === saved.country) && FIELDS.includes(saved.from)) setState((s) => ({ ...s, ...saved }));
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
  const c = COUNTRIES[state.country];
  // Mexico writes 1,160.00 and Chile 11.900: format money the way each country does.
  const numLocale = locale === 'es' ? (ES_LOCALES[state.country] ?? 'es') : baseLocale;
  const decimals = c?.decimals ?? 2;
  const rate = toNumber(state.rate);
  const value = toNumber(state.value);
  const nf = useMemo(
    () => new Intl.NumberFormat(numLocale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
    [numLocale, decimals],
  );

  const b = value !== null && rate !== null && rate <= 100 ? solve(state.from, value, rate, decimals) : null;
  const shown = (f: Field) => (f === state.from ? state.value : b ? nf.format(b[f]) : '');
  const rateText = `${new Intl.NumberFormat(numLocale, { maximumFractionDigits: 4 }).format(rate ?? 0)}%`;

  const words = useMemo(() => {
    if (!b || !c?.currency || !(c.currency in CURRENCIES[locale])) return '';
    const a = parseAmount(b.gross.toFixed(decimals));
    return a && a !== 'too-big' ? toWords(locale, a, { currency: c.currency, only: locale === 'ar' }) : '';
  }, [b?.gross, c, locale, decimals]);

  const wh = b && c?.mx && (state.ivaRet || state.isr !== '0') ? mxWithholding(b, state.ivaRet, Number(state.isr)) : null;
  const netShare = b && b.gross > 0 ? Math.max(0, Math.min(100, (b.net / b.gross) * 100)) : 100;

  const flashFor = (k: 'copied' | 'shared') => {
    setFlash(k);
    setTimeout(() => setFlash(''), 1800);
  };
  const copy = async () => {
    if (!b) return;
    const lines = [`${t.net}: ${nf.format(b.net)}`, `${t.vat} (${rateText}): ${nf.format(b.vat)}`, `${t.gross}: ${nf.format(b.gross)}`];
    if (wh) lines.push(`${t.ivaRet}: −${nf.format(wh.ivaRet)}`, `${t.isr}: −${nf.format(wh.isrRet)}`, `${t.receive}: ${nf.format(wh.receive)}`);
    if (words) lines.push(words);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
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
    <div class="vat">
      <div class="vat-bar">
        <label>
          <span>{t.country}</span>
          <select
            class="input"
            value={state.country}
            onChange={(e) => {
              const id = e.currentTarget.value;
              set({ country: id, ...(COUNTRIES[id] ? { rate: String(COUNTRIES[id].rate) } : {}) });
            }}
          >
            {t.countries.map((x) => (
              <option value={x.id}>{x.name}</option>
            ))}
          </select>
        </label>
        <label class="vat-rate">
          <span>{t.rate}</span>
          <input
            class="input"
            inputMode="decimal"
            dir="ltr"
            value={state.rate}
            onInput={(e) => set({ rate: e.currentTarget.value, country: 'custom' })}
          />
        </label>
      </div>

      <p class="vat-type">{t.typeAny}</p>
      <div class="vat-fields">
        {FIELDS.map((f) => (
          <label class={`vat-field${state.from === f ? ' is-source' : ''}${f === 'gross' ? ' is-gross' : ''}`}>
            <span>{f === 'vat' ? `${t.vat} (${rateText})` : t[f]}</span>
            <input
              class="input"
              inputMode="decimal"
              autoComplete="off"
              dir="ltr"
              placeholder="0"
              value={shown(f)}
              onInput={(e) => set({ from: f, value: e.currentTarget.value })}
            />
          </label>
        ))}
      </div>

      {b && b.gross > 0 && (
        <div class="vat-result" aria-live="polite">
          <div class="vat-split" role="img" aria-label={`${t.share}: ${nf.format(b.net)} + ${nf.format(b.vat)}`}>
            <span class="vat-split-net" style={{ width: `${netShare}%` }}></span>
            <span class="vat-split-vat"></span>
          </div>
          <div class="vat-legend">
            <span>
              <i class="dot dot-net"></i>
              {t.net} <b dir="ltr">{nf.format(b.net)}</b>
            </span>
            <span>
              <i class="dot dot-vat"></i>
              {t.vat} <b dir="ltr">{nf.format(b.vat)}</b>
            </span>
          </div>

          {c?.mx && (
            <details class="fold" open={state.ivaRet || state.isr !== '0'}>
              <summary>{t.withholdings}</summary>
              <div class="fold-body vat-wh">
                <label class="vat-check">
                  <input type="checkbox" checked={state.ivaRet} onChange={(e) => set({ ivaRet: e.currentTarget.checked })} />
                  {t.ivaRet}
                </label>
                <label>
                  <span>{t.isr}</span>
                  <select class="input" value={state.isr} onChange={(e) => set({ isr: e.currentTarget.value })}>
                    <option value="0">{t.isrNone}</option>
                    <option value="10">{t.isr10}</option>
                    <option value="1.25">{t.isrResico}</option>
                  </select>
                </label>
                {wh && (
                  <dl class="vat-wh-list">
                    <div>
                      <dt>{t.ivaRet}</dt>
                      <dd dir="ltr">−{nf.format(wh.ivaRet)}</dd>
                    </div>
                    <div>
                      <dt>{t.isr}</dt>
                      <dd dir="ltr">−{nf.format(wh.isrRet)}</dd>
                    </div>
                    <div class="is-total">
                      <dt>{t.receive}</dt>
                      <dd dir="ltr">{nf.format(wh.receive)}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </details>
          )}

          {words && (
            <p class="vat-words">
              <span>{t.inWords}</span>
              {words}
            </p>
          )}

          <div class="vat-actions">
            <button type="button" class="btn" onClick={copy}>
              {flash === 'copied' ? t.copied : t.copy}
            </button>
            <button type="button" class="btn btn-ghost" onClick={share}>
              {flash === 'shared' ? t.shared : t.shareLink}
            </button>
            <button type="button" class="btn btn-ghost" onClick={() => setState(initial(state.country === 'custom' ? t.defaultCountry : state.country))}>
              {t.reset}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
