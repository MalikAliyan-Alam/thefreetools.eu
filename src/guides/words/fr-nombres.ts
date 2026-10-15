import type { GuideContent } from '../types';
import { frWords } from '../../tools/words/engine.ts';

// Every number written out below comes from the engine; tests/guides.test.ts pins the strings.
const w = (n: string) => frWords(n);
const r = (n: string) => frWords(n, { reform: true });

/** French typography: a no-break space before ? ! : ; and inside « ». */
const nb = (s: string) => s.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');

export const frNombres: GuideContent = {
  key: 'fr-nombre-mille-trait-union',
  tool: 'words',
  slug: 'comment-ecrire-170-000-en-lettres',
  metaTitle: nb('170 000 en lettres : mille, cent et traits d’union (exemples)'),
  metaDescription: nb(
    `Comment écrire 170 000, 130 000 ou 4 500 000 en lettres : ${w('170000')}. Mille ne prend jamais de s, et les traits d’union diffèrent selon l’orthographe.`,
  ),
  h1: nb('Comment écrire 170 000 en lettres'),
  answer: nb(
    `170 000 s’écrit « ${w('170000')} ». Mille ne prend jamais de s, cent n’en prend pas ici parce qu’un autre mot le suit, et les traits d’union se placent seulement entre les nombres inférieurs à cent (orthographe traditionnelle).`,
  ),
  sections: [
    {
      heading: 'Les montants qu’on cherche le plus',
      html: nb(`<table><thead><tr><th>En chiffres</th><th>Orthographe traditionnelle</th><th>Rectification de 1990</th></tr></thead><tbody>
<tr><td>130 000</td><td>${w('130000')}</td><td>${r('130000')}</td></tr>
<tr><td>170 000</td><td>${w('170000')}</td><td>${r('170000')}</td></tr>
<tr><td>200 000</td><td>${w('200000')}</td><td>${r('200000')}</td></tr>
<tr><td>1 100</td><td>${w('1100')}</td><td>${r('1100')}</td></tr>
<tr><td>4 060 039</td><td>${w('4060039')}</td><td>${r('4060039')}</td></tr>
<tr><td>4 500 000</td><td>${w('4500000')}</td><td>${r('4500000')}</td></tr>
<tr><td>1 000 000 000</td><td>${w('1000000000')}</td><td>${r('1000000000')}</td></tr></tbody></table>
<p>Les deux colonnes sont correctes. La première est celle qu’on voit sur la plupart des chèques et des contrats. La seconde est la graphie recommandée depuis la réforme de 1990 et acceptée partout. Choisissez-en une et gardez-la dans tout le document.</p>`),
    },
    {
      heading: 'Mille ne prend jamais de s',
      html: nb(`<p>Quand <em>mille</em> désigne le nombre 1 000, il est invariable : <em>${w('3000')}</em>, <em>${w('170000')}</em>. Ce n’est pas un nom, c’est un adjectif numéral, donc il ne varie pas.</p>
<p>Attention à <em>mille</em> au sens de distance, qui est un nom et prend un s : <em>trois milles marins</em>. Dans un montant, on ne rencontre que le premier cas.</p>`),
    },
    {
      heading: 'Cent prend un s seulement à la fin',
      html: nb(`<p><em>Cent</em> prend un s quand il est multiplié et qu’aucun autre mot ne le suit : <em>deux cents</em>. Dans <em>${w('200000')}</em>, il est suivi de <em>mille</em>, donc pas de s. Dans <em>${w('170000')}</em>, il n’est pas multiplié du tout. La règle complète, avec les pièges, est dans <a href="/fr/guides/cent-ou-cents/">cent ou cents</a>.</p>`),
    },
    {
      heading: 'Les traits d’union : traditionnel ou 1990',
      html: nb(`<p>Dans l’orthographe traditionnelle, le trait d’union relie seulement les nombres inférieurs à cent (<em>soixante-dix</em>, <em>trente-neuf</em>) et jamais <em>cent</em> ou <em>mille</em> aux mots voisins. Avec la rectification de 1990, tous les éléments d’un nombre composé sont reliés (<em>${r('170000')}</em>).</p>
<p>Les mots <em>million</em> et <em>milliard</em> sont des noms : ils ne sont jamais reliés par un trait d’union, quelle que soit l’orthographe (<em>${r('4500000')}</em>).</p>`),
    },
    {
      heading: 'En Belgique et en Suisse',
      html: nb(`<p>Pour 170 000, un Belge ou un Suisse romand dit <em>${frWords('170000', { variant: 'be' })}</em> : septante au lieu de soixante-dix. Pour 80 000, la Suisse romande dit <em>${frWords('80000', { variant: 'ch' })}</em>, la Belgique <em>${frWords('80000', { variant: 'be' })}</em>. Le reste des règles est identique. Détails dans <a href="/fr/guides/quatre-vingt-ou-quatre-vingts/">quatre-vingt ou quatre-vingts</a>.</p>`),
    },
    {
      heading: 'Sur un chèque ou un virement',
      html: nb(`<p>Sur un chèque, le montant en lettres est celui qui fait foi si les chiffres sont différents. Écrivez-le en toutes lettres, sans abréviation, et terminez par la devise. Pour un montant en euros avec des centimes, voir <a href="/fr/guides/ecrire-montant-cheque-en-lettres/">écrire le montant d’un chèque en lettres</a>. Pour vérifier un nombre long, collez-le dans le <a href="/fr/chiffres-en-lettres/">convertisseur de chiffres en lettres</a>.</p>`),
    },
  ],
  faq: [
    {
      q: nb('Comment écrire 170 000 en lettres ?'),
      a: nb(`${w('170000')}. Avec la rectification de 1990 : ${r('170000')}.`),
    },
    {
      q: nb('Comment écrire 130 000 en lettres ?'),
      a: nb(`${w('130000')}. Avec la rectification de 1990 : ${r('130000')}.`),
    },
    {
      q: nb('Mille prend-il un s ?'),
      a: nb('Non. Quand il désigne le nombre 1 000, mille est invariable : trois mille, cent soixante-dix mille.'),
    },
    {
      q: nb('Comment écrire 4 500 000 en lettres ?'),
      a: nb(`${w('4500000')}. Million est un nom et prend un s dès qu’il est multiplié.`),
    },
    {
      q: nb('Comment écrire un milliard en lettres ?'),
      a: nb(`${w('1000000000')}. Pour deux milliards : ${w('2000000000')}.`),
    },
  ],
  published: '2026-10-14',
  updated: '2026-10-14',
};
