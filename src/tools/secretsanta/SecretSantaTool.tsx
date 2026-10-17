import { useEffect, useState } from 'preact/hooks';
import { MAX_PEOPLE, MIN_PEOPLE, cleanNames, decodeReveal, draw, encodeReveal, parseExclusions, type Draw, type Reveal } from './engine';
import type { SecretSantaLabels } from './labels';
// Styles: ../calc/calc.css, inlined on this tool's pages by components/ToolIsland.astro.
// Names are personal data: they stay in memory only and are never saved or sent anywhere.

type Mode = 'hand' | 'links';

const EXAMPLE_NAMES = 'Ana\nLuis\nMarta\nPedro\nSol\nJuan';
const EXAMPLE_EX = 'Ana - Luis\nMarta - Pedro';

export default function SecretSantaTool({ labels: t }: { labels: SecretSantaLabels }) {
  const [names, setNames] = useState('');
  const [ex, setEx] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<Draw | null>(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('hand');
  const [turn, setTurn] = useState(0);
  const [shown, setShown] = useState(false);
  const [flash, setFlash] = useState('');
  const [reveal, setReveal] = useState<Reveal | null>(null);

  // A private link carries the pairing in the URL fragment (after #), which is never sent to a server.
  useEffect(() => {
    const read = () => {
      const m = location.hash.match(/^#r=([A-Za-z0-9_-]+)$/);
      setReveal(m ? decodeReveal(m[1]) : null);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const list = cleanNames(names);

  const run = () => {
    setError('');
    if (list.length < MIN_PEOPLE) return setError(t.errFew);
    if (list.length > MAX_PEOPLE) return setError(t.errMany);
    const d = draw(list, parseExclusions(ex));
    if (!d) return setError(t.errImpossible);
    setResult(d);
    setTurn(0);
    setShown(false);
  };

  const linkFor = (r: Reveal) => `${location.origin}${location.pathname}#r=${encodeReveal(r)}`;
  const messageFor = (giver: string, link: string) =>
    (budget ? t.messageBudget : t.message).replace('{name}', giver).replace('{link}', link).replace('{budget}', budget);
  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlash(id);
      setTimeout(() => setFlash(''), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  if (reveal) {
    return (
      <div class="secretsanta">
        <div class="calc-result" aria-live="polite">
          <p class="calc-hint">{t.revealTitle.replace('{giver}', reveal.giver)}</p>
          <div class="calc-big">
            <span>{t.revealBody}</span>
            <b>{reveal.receiver}</b>
          </div>
          {reveal.budget && <p class="calc-hint">{t.revealBudget.replace('{budget}', reveal.budget)}</p>}
          <p class="calc-hint">{t.revealKeep}</p>
          <div class="calc-actions">
            <a class="btn btn-ghost" href={location.pathname}>
              {t.makeOwn}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="secretsanta">
      <div class="calc-grid">
        <label class="calc-field">
          <span>{t.names}</span>
          <textarea class="input" rows={7} placeholder={t.namesPlaceholder} value={names} onInput={(e) => setNames(e.currentTarget.value)} />
        </label>
        <label class="calc-field">
          <span>{t.exclusions}</span>
          <textarea class="input" rows={7} placeholder={t.exclusionsPlaceholder} value={ex} onInput={(e) => setEx(e.currentTarget.value)} />
        </label>
      </div>
      <p class="calc-hint">
        {t.namesHint} {t.exclusionsHint}
      </p>
      <div class="calc-grid" style={{ marginTop: '10px' }}>
        <label class="calc-field">
          <span>{t.budget}</span>
          <input class="input" placeholder={t.budgetPlaceholder} value={budget} onInput={(e) => setBudget(e.currentTarget.value)} />
        </label>
        <div class="calc-field">
          <span>{t.count.replace('{n}', String(list.length))}</span>
          <button type="button" class="btn" onClick={run}>
            {result ? t.redraw : t.draw}
          </button>
        </div>
      </div>
      {error && <p class="calc-error">{error}</p>}
      {!result && names === '' && (
        <div class="calc-actions">
          <button
            type="button"
            class="btn btn-ghost"
            onClick={() => {
              setNames(EXAMPLE_NAMES);
              setEx(EXAMPLE_EX);
            }}
          >
            {t.example}
          </button>
        </div>
      )}

      {result && (
        <div class="calc-result" aria-live="polite">
          <p class="calc-hint">{t.done}</p>
          <div class="calc-actions">
            <button type="button" class={mode === 'hand' ? 'btn' : 'btn btn-ghost'} onClick={() => setMode('hand')}>
              {t.modeHand}
            </button>
            <button type="button" class={mode === 'links' ? 'btn' : 'btn btn-ghost'} onClick={() => setMode('links')}>
              {t.modeLinks}
            </button>
          </div>

          {mode === 'hand' && (
            <div style={{ marginTop: '12px' }}>
              {turn < result.length ? (
                <>
                  <p class="calc-hint">{t.passTo.replace('{name}', result[turn].giver)}</p>
                  {shown ? (
                    <div class="calc-big">
                      <span>{t.youGive.replace('{name}', result[turn].giver)}</span>
                      <b>{result[turn].receiver}</b>
                    </div>
                  ) : null}
                  <div class="calc-actions">
                    {!shown ? (
                      <button type="button" class="btn" onClick={() => setShown(true)}>
                        {t.showMine}
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn"
                        onClick={() => {
                          setShown(false);
                          setTurn(turn + 1);
                        }}
                      >
                        {turn + 1 < result.length ? t.next : t.hide}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <p class="calc-hint">{t.finished}</p>
              )}
            </div>
          )}

          {mode === 'links' && (
            <div style={{ marginTop: '12px' }}>
              <p class="calc-hint">{t.linksIntro}</p>
              <p class="calc-hint">{t.organizerNote}</p>
              <dl class="calc-list">
                {result.map((x) => {
                  const link = linkFor({ giver: x.giver, receiver: x.receiver, budget: budget || undefined });
                  const text = messageFor(x.giver, link);
                  return (
                    <div>
                      <dt>{x.giver}</dt>
                      <dd>
                        <button type="button" class="btn btn-ghost" onClick={() => copy(text, `m-${x.giver}`)}>
                          {flash === `m-${x.giver}` ? t.copied : t.copyMessage}
                        </button>{' '}
                        <a class="btn btn-ghost" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener">
                          {t.openWhatsapp}
                        </a>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}
          <div class="calc-actions">
            <button
              type="button"
              class="btn btn-ghost"
              onClick={() => {
                setResult(null);
                setNames('');
                setEx('');
                setBudget('');
              }}
            >
              {t.reset}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
