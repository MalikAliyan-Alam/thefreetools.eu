import type { GuideContent } from '../types';
import { frWords, parseAmount, toWords, type Amount } from '../../tools/words/engine.ts';

// Every number written out below comes from the engine, so these pages can never
// disagree with the converter. tests/guides.test.ts pins the exact strings.
const w = (n: string) => frWords(n);
const money = (n: string, currency: string) =>
  toWords('fr', parseAmount(n, false, true) as Amount, { currency, letterCase: 'lower' });

/** French typography: a no-break space before ? ! : ; and inside « ». */
const nb = (s: string) => s.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');

const D = '2026-10-11';
const r = (n: string) => frWords(n, { reform: true });

export const fr80: GuideContent = {
  key: 'fr-quatre-vingt',
  tool: 'words',
  slug: 'quatre-vingt-ou-quatre-vingts',
  metaTitle: nb('Quatre-vingt ou quatre-vingts ? La règle avec des exemples'),
  metaDescription: nb(
    `Quatre-vingts prend un s quand il termine le nombre, pas quand un autre mot le suit : ${w('80')}, ${w('81')}, ${w('80000')}, ${w('80000000')}.`,
  ),
  h1: nb('Quatre-vingt ou quatre-vingts ?'),
  answer: nb(
    `Quatre-vingt prend un s quand il est le dernier mot du nombre : ${w('80')}, ${w('280')}. Il n'en prend pas quand un autre mot le suit : ${w('81')}, ${w('90')}, ${w('80000')}.`,
  ),
  sections: [
    {
      heading: 'La règle en une phrase',
      html: nb(`<p>Quatre-vingts, c'est quatre fois vingt. Comme <em>deux cents</em>, il prend un s parce qu'il est multiplié, mais seulement s'il termine le nombre. Dès qu'un autre mot arrive derrière, le s disparaît.</p>
<p>Il y a un cas qui surprend&nbsp;: devant <em>mille</em>, on n'écrit pas de s, parce que <em>mille</em> ne varie jamais et ne compte pas comme un nom. En revanche, devant <em>million</em> et <em>milliard</em>, le s revient, car ce sont des noms.</p>`),
    },
    {
      heading: 'Les cas qu’on rencontre vraiment',
      html: nb(`<table><thead><tr><th>En chiffres</th><th>En lettres</th></tr></thead><tbody>
<tr><td>80</td><td>${w('80')}</td></tr>
<tr><td>81</td><td>${w('81')}</td></tr>
<tr><td>90</td><td>${w('90')}</td></tr>
<tr><td>180</td><td>${w('180')}</td></tr>
<tr><td>280</td><td>${w('280')}</td></tr>
<tr><td>80 000</td><td>${w('80000')}</td></tr>
<tr><td>80 080</td><td>${w('80080')}</td></tr>
<tr><td>80 000 000</td><td>${w('80000000')}</td></tr></tbody></table>
<p>Regardez 80 080&nbsp;: le premier <em>quatre-vingt</em> est suivi de <em>mille</em>, donc pas de s. Le second termine le nombre, donc il en prend un.</p>`),
    },
    {
      heading: 'Les erreurs les plus fréquentes',
      html: nb(`<ul>
<li><em>Quatre-vingts mille</em> est faux. On écrit <em>${w('80000')}</em>.</li>
<li><em>Quatre-vingts-un</em> est faux. On écrit <em>${w('81')}</em>.</li>
<li><em>Quatre-vingt millions</em> est faux. On écrit <em>${w('80000000')}</em>, avec un s, parce que <em>millions</em> est un nom.</li>
<li>Avec l'orthographe de 1990, on relie tout par des traits d'union, mais le s final reste&nbsp;: le nombre 80 s'écrit toujours <em>quatre-vingts</em>.</li>
</ul>`),
    },
    {
      heading: 'En Suisse romande, la question ne se pose pas toujours',
      html: nb(`<p>Les Belges disent <em>septante</em> et <em>nonante</em>, mais gardent <em>quatre-vingts</em> pour 80. Les Suisses romands disent aussi <em>septante</em> et <em>nonante</em>, et <em>huitante</em> dans les cantons de Vaud, du Valais et de Fribourg (à Genève, on dit <em>quatre-vingts</em>). <em>Huitante</em> ne prend jamais de s. Ces mots sont plus simples à écrire que <em>soixante-dix</em> et <em>quatre-vingt-dix</em>.</p>
<p>Le convertisseur de chiffres en lettres propose ces variantes dans le choix du pays. Pour vérifier un nombre, tapez-le et lisez le résultat&nbsp;: <a href="/fr/chiffres-en-lettres/">convertir des chiffres en lettres</a>.</p>`),
    },
    {
      heading: nb('Quand « quatre-vingt » reste invariable'),
      html: nb(`<p>Les adjectifs numéraux <em>vingt</em> et <em>cent</em> ne prennent pas de s quand ils servent à numéroter (adjectifs ordinaux) : <em>page quatre-vingt</em>, <em>l'article deux cent</em>, <em>l'an quatre-vingt</em>. Même chose pour une adresse ou une date : <em>le numéro quatre-vingt</em>. En revanche, pour compter des objets, des personnes ou des euros, le s est de retour : <em>quatre-vingts pages</em>, <em>quatre-vingts euros</em>.</p>`),
    },
    {
      heading: nb('Pourquoi dit-on quatre-vingts ?'),
      html: nb(`<p>Le français a gardé une trace d'un ancien comptage par vingt : quatre-vingts, c'est quatre fois vingt. Au Moyen Âge, d'autres formes existaient aussi (<em>octante</em>, <em>huitante</em>), et certaines régions les ont conservées. C'est pour cela qu'en Belgique et en Suisse romande vous entendrez <em>septante</em> et <em>nonante</em>, et en Suisse parfois <em>huitante</em>. Le Québec, comme la France, dit quatre-vingts et quatre-vingt-dix.</p>`),
    },
  ],
  faq: [
    {
      q: nb('Comment écrit-on 80 en lettres ?'),
      a: nb(`${w('80')}, avec un s, parce que le nombre se termine par quatre-vingts.`),
    },
    {
      q: nb('Faut-il un s à quatre-vingt dans 80 000 ?'),
      a: nb(`Non. On écrit ${w('80000')}, car mille est invariable et empêche le s.`),
    },
    {
      q: nb('Quatre-vingt-un s’écrit-il avec un s ?'),
      a: nb(`Non, ${w('81')}. Le s n'apparaît que lorsque quatre-vingts est le dernier mot.`),
    },
    {
      q: nb('Et pour 80 millions ?'),
      a: nb(`${w('80000000')}. Million est un nom, donc le s de quatre-vingts reste.`),
    },
  ],
  published: D,
  updated: '2026-10-15',
};

export const fr100: GuideContent = {
  key: 'fr-cent',
  tool: 'words',
  slug: 'cent-ou-cents',
  metaTitle: nb('Cent ou cents ? La règle et les cas pièges en exemples'),
  metaDescription: nb(
    `Cent prend un s quand il est multiplié et termine le nombre : ${w('200')}, mais ${w('201')} et ${w('200000')}. Tous les cas avec des exemples.`,
  ),
  h1: nb('Cent ou cents ?'),
  answer: nb(
    `Cent prend un s quand il est multiplié et qu'il termine le nombre : ${w('200')}, ${w('700')}. Il n'en prend pas quand un autre mot le suit : ${w('201')}, ${w('200000')}.`,
  ),
  sections: [
    {
      heading: 'Deux conditions, pas une',
      html: nb(`<p>Pour mettre un s à <em>cent</em>, il faut que deux choses soient vraies en même temps&nbsp;: le mot est multiplié (deux cents, trois cents, pas «&nbsp;un cent&nbsp;») et aucun autre nombre ne vient après lui. Si l'une des deux manque, pas de s.</p>
<p>C'est pour cela que <em>cent</em> tout seul ne prend jamais de s (${w('100')}), et que <em>${w('200')}</em> en prend un mais pas <em>${w('201')}</em>.</p>`),
    },
    {
      heading: 'Les cas qu’on rencontre vraiment',
      html: nb(`<table><thead><tr><th>En chiffres</th><th>En lettres</th></tr></thead><tbody>
<tr><td>100</td><td>${w('100')}</td></tr>
<tr><td>200</td><td>${w('200')}</td></tr>
<tr><td>201</td><td>${w('201')}</td></tr>
<tr><td>700</td><td>${w('700')}</td></tr>
<tr><td>200 000</td><td>${w('200000')}</td></tr>
<tr><td>200 000 000</td><td>${w('200000000')}</td></tr>
<tr><td>2 000 300</td><td>${w('2000300')}</td></tr></tbody></table>
<p>Le cas de 200 000 est celui qui fait hésiter. <em>Mille</em> est invariable et se comporte comme un autre nombre qui suit, donc <em>cent</em> reste sans s. Avec 200 000 000, c'est différent&nbsp;: <em>millions</em> est un nom, et <em>cents</em> le précède comme il précéderait n'importe quel nom.</p>`),
    },
    {
      heading: 'Un montant en euros, par exemple',
      html: nb(`<p>Sur un chèque, <em>${money('300', 'EUR')}</em> prend un s, parce que le mot suivant est <em>euros</em>, un nom, et non un nombre. En revanche <em>${money('350', 'EUR')}</em> n'en prend pas, puisque <em>cinquante</em> suit <em>cent</em>.</p>
<p>Pour contrôler vos montants sans réfléchir à la règle, essayez le <a href="/fr/chiffres-en-lettres/">convertisseur de chiffres en lettres</a>, qui applique ces accords et les vérifie à chaque saisie.</p>`),
    },
    {
      heading: nb('Cent ordinal : pas de s'),
      html: nb(`<p>Comme <em>vingt</em>, <em>cent</em> reste sans s quand il numérote : <em>page deux cent</em>, <em>le numéro trois cent</em>, <em>l'an sept cent</em>. Si vous parlez de quantités, le s revient : <em>deux cents pages</em>, <em>trois cents euros</em>.</p>`),
    },
    {
      heading: nb('Ne pas confondre avec « cent » comme nom'),
      html: nb(`<p>Dans <em>pour cent</em> (<em>dix pour cent</em>), <em>cent</em> désigne la centaine et reste invariable. Au sens de la monnaie (les <em>cents</em> américains ou canadiens), c'est au contraire un nom qui prend la marque du pluriel : <em>cinq cents</em> peut donc dire 5 cents ou 500, et c'est le contexte qui tranche.</p>`),
    },
    {
      heading: nb('Avec l’orthographe de 1990'),
      html: nb(`<p>La rectification de 1990 relie tous les éléments d'un nombre par un trait d'union. La règle du s ne change pas : <em>${r('200')}</em>, <em>${r('201')}</em>, <em>${r('200000')}</em>. Les deux graphies sont admises.</p>`),
    },
  ],
  faq: [
    {
      q: nb('Comment écrit-on 200 en lettres ?'),
      a: nb(`${w('200')}, avec un s, car cent est multiplié par deux et termine le nombre.`),
    },
    {
      q: nb('Y a-t-il un s à cent dans 200 000 ?'),
      a: nb(`Non. On écrit ${w('200000')}. Mille est invariable et le s ne se met que si cent termine le nombre.`),
    },
    {
      q: nb('Pourquoi 201 s’écrit-il sans s ?'),
      a: nb(`Parce qu'un nombre suit cent : ${w('201')}. Le s ne se met que si cent est le dernier mot.`),
    },
    {
      q: nb('Cent prend-il un s dans 300 euros ?'),
      a: nb(`Oui : ${money('300', 'EUR')}. Euros est un nom, pas un nombre, donc cents termine bien le nombre.`),
    },
  ],
  published: D,
  updated: '2026-10-15',
};

export const frCheque: GuideContent = {
  key: 'fr-cheque',
  tool: 'words',
  slug: 'ecrire-montant-cheque-en-lettres',
  metaTitle: nb('Écrire le montant d’un chèque en lettres : exemples en euros'),
  metaDescription: nb(
    `Comment remplir la ligne du montant d'un chèque : ${money('1234,56', 'EUR')}. Les étapes, les accords et les erreurs à éviter.`,
  ),
  h1: nb('Écrire le montant d’un chèque en lettres'),
  answer: nb(
    `On écrit le montant en toutes lettres, avec la monnaie, puis les centimes : ${money('1234,56', 'EUR')}. Si le chiffre et les lettres ne correspondent pas, c'est la somme en lettres qui fait foi.`,
  ),
  sections: [
    {
      heading: 'Les étapes sur la ligne du montant',
      html: nb(`<ol>
<li>Commencez tout à gauche de la ligne, sans laisser de blanc au début.</li>
<li>Écrivez le nombre, puis le mot <em>euros</em> (ou la monnaie du chèque).</li>
<li>Ajoutez les centimes s'il y en a, après <em>et</em>. Sans centimes, vous n'écrivez rien de plus.</li>
<li>Tracez un trait jusqu'à la fin de la ligne, pour qu'on ne puisse rien ajouter.</li>
<li>Recopiez ensuite le montant en chiffres dans la case prévue. Les deux doivent dire exactement la même chose.</li>
</ol>`),
    },
    {
      heading: 'Des montants écrits en toutes lettres',
      html: nb(`<table><thead><tr><th>Montant</th><th>En lettres</th></tr></thead><tbody>
<tr><td>85,00 €</td><td>${money('85', 'EUR')}</td></tr>
<tr><td>1 234,56 €</td><td>${money('1234,56', 'EUR')}</td></tr>
<tr><td>2 000,05 €</td><td>${money('2000,05', 'EUR')}</td></tr>
<tr><td>10 000 €</td><td>${money('10000', 'EUR')}</td></tr>
<tr><td>1 000 000 €</td><td>${money('1000000', 'EUR')}</td></tr></tbody></table>
<p>Remarquez <em>un million d'euros</em>&nbsp;: après million et milliard, on met <em>de</em> devant la monnaie. Et pour 1 euro et quelques centimes, <em>un euro</em> reste au singulier.</p>`),
    },
    {
      heading: 'Si les chiffres et les lettres se contredisent',
      html: nb(`<p>En France, quand le montant est écrit à la fois en lettres et en chiffres, la somme en lettres l'emporte en cas de différence (article L131-10 du Code monétaire et financier). Un chèque rempli à la hâte peut donc être payé pour un autre montant que celui que vous aviez en tête. Relisez-le avant de le signer.</p>
<p>En Suisse, la logique est la même avec des francs et des centimes&nbsp;: ${money('1234,56', 'CHF')}. Au Maroc, la monnaie est le dirham&nbsp;: ${money('1234,56', 'MAD')}.</p>
<p>Pour écrire un montant précis sans vous tromper sur les accords, utilisez le <a href="/fr/chiffres-en-lettres/">convertisseur de chiffres en lettres</a>, avec la devise de votre chèque.</p>`),
    },
    {
      heading: nb('Combien de temps un chèque est-il valable ?'),
      html: nb(`<p>En France métropolitaine, le chèque doit être présenté dans les 8 jours qui suivent la date d'émission, mais la banque l'accepte ensuite jusqu'à un an après ce délai : il est donc valable <strong>un an et huit jours</strong> à partir de la date inscrite. Si le chèque est émis depuis un autre pays d'Europe, les délais de présentation sont plus longs, et plus encore hors d'Europe. Au-delà, le chèque est prescrit et la banque peut refuser de le payer. La date que vous écrivez fait donc partir le délai.</p>`),
    },
    {
      heading: nb('Si vous vous trompez'),
      html: nb(`<p>Évitez de rayer ou de surcharger. Une rature fait souvent refuser le chèque, parce que la banque ne peut pas savoir si elle vient de vous ou d'un tiers. Écrivez « annulé » en travers, conservez le chèque, et rédigez-en un nouveau. Si le chèque est déjà parti, prévenez votre banque : elle peut faire opposition dans les cas prévus par la loi (perte, vol, utilisation frauduleuse).</p>`),
    },
    {
      heading: nb('Les erreurs qui reviennent le plus'),
      html: nb(`<ul>
<li>Laisser un blanc après le montant en lettres : tracez un trait jusqu'au bout de la ligne.</li>
<li>Oublier la devise (« euros ») ou écrire « euro » au singulier pour un montant supérieur à un.</li>
<li>Oublier le lieu de l'émission ou la signature.</li>
</ul>`),
    },
  ],
  faq: [
    {
      q: nb('Faut-il écrire les centimes en lettres ?'),
      a: nb(`Oui, après et : ${money('2000,05', 'EUR')}. Sans centimes, on n'ajoute rien.`),
    },
    {
      q: nb('Que faire si je me trompe sur un chèque ?'),
      a: nb('Ne raturez pas. Un chèque raturé peut être refusé par la banque. Déchirez-le et remplissez-en un nouveau.'),
    },
    {
      q: nb('Comment écrit-on 1 000 000 € ?'),
      a: nb(`${money('1000000', 'EUR')}. Après million, on ajoute de devant la monnaie.`),
    },
    {
      q: nb('Que vaut le chèque si le montant en chiffres est différent ?'),
      a: nb('Il vaut pour la somme écrite en lettres, selon l’article L131-10 du Code monétaire et financier.'),
    },
  ],
  published: D,
  updated: '2026-10-15',
};

export const frCfa: GuideContent = {
  key: 'fr-fcfa',
  tool: 'words',
  slug: 'francs-cfa-en-lettres',
  metaTitle: nb('Écrire un montant en francs CFA en lettres (25 000, 3 000 000)'),
  metaDescription: nb(
    `Exemples de montants en francs CFA en toutes lettres : ${money('25000', 'XOF')}, ${money('3000000', 'XOF')}. Quand mettre de, et pourquoi pas de centimes.`,
  ),
  h1: nb('Écrire un montant en francs CFA en lettres'),
  answer: nb(
    `On écrit le nombre puis « francs CFA » : ${money('25000', 'XOF')}. Pour des millions entiers, on ajoute de : ${money('3000000', 'XOF')}.`,
  ),
  sections: [
    {
      heading: 'Quelques montants courants',
      html: nb(`<table><thead><tr><th>Montant</th><th>En lettres</th></tr></thead><tbody>
<tr><td>25 000 FCFA</td><td>${money('25000', 'XOF')}</td></tr>
<tr><td>150 000 FCFA</td><td>${money('150000', 'XOF')}</td></tr>
<tr><td>1 000 000 FCFA</td><td>${money('1000000', 'XOF')}</td></tr>
<tr><td>2 500 000 FCFA</td><td>${money('2500000', 'XOF')}</td></tr>
<tr><td>3 000 000 FCFA</td><td>${money('3000000', 'XOF')}</td></tr></tbody></table>`),
    },
    {
      heading: 'Quand mettre « de » devant francs CFA',
      html: nb(`<p>On ajoute <em>de</em> uniquement quand le nombre se termine par <em>million</em> ou <em>milliard</em>, sans rien derrière&nbsp;: <em>${money('3000000', 'XOF')}</em>. Dès qu'un autre nombre suit, on écrit directement la monnaie&nbsp;: <em>${money('2500000', 'XOF')}</em>.</p>
<p>Le franc CFA n'a pas de subdivision utilisée au quotidien, donc il n'y a pas de centimes à ajouter. Le convertisseur arrondit le montant à l'unité.</p>`),
    },
    {
      heading: 'Pour un reçu, un contrat ou un virement',
      html: nb(`<p>Le montant en lettres sert à éviter les ajouts. Écrivez-le sans laisser d'espace, tracez un trait jusqu'à la fin de la ligne, et vérifiez qu'il correspond au montant en chiffres. Pour d'autres devises (dirham, dinar, euro, franc suisse), voir le <a href="/fr/chiffres-en-lettres/">convertisseur de chiffres en lettres</a>.</p>`),
    },
    {
      heading: nb('Deux francs CFA, pas un seul'),
      html: nb(`<p>Le franc CFA désigne en réalité deux monnaies distinctes. Le franc de la <strong>BCEAO</strong> (code XOF) circule dans les ${8} pays de l'Union économique et monétaire ouest-africaine : Bénin, Burkina Faso, Côte d'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal et Togo. Le franc de la <strong>BEAC</strong> (code XAF) circule dans les ${6} pays de la Communauté économique et monétaire de l'Afrique centrale : Cameroun, Centrafrique, Congo, Gabon, Guinée équatoriale et Tchad. Les deux ont la même parité avec l'euro, mais ne sont pas interchangeables : un billet de la zone ouest-africaine ne s'utilise pas en zone centrale.</p>`),
    },
    {
      heading: nb('Le taux fixe avec l’euro'),
      html: nb(`<p>Un euro vaut 655,957 francs CFA, une parité fixe. Quelques repères : 100 euros font environ ${Math.round(100 * 655.957).toLocaleString('fr-FR')} francs CFA, et 1 000 euros environ ${Math.round(1000 * 655.957).toLocaleString('fr-FR')}. Comme le franc CFA n'a pas de subdivision utilisée au quotidien, les montants s'écrivent sans centimes.</p>`),
    },
  ],
  faq: [
    {
      q: nb('Comment écrire 25 000 FCFA en lettres ?'),
      a: nb(`${money('25000', 'XOF')}.`),
    },
    {
      q: nb('Comment écrire 3 000 000 FCFA en lettres ?'),
      a: nb(`${money('3000000', 'XOF')}. On ajoute de après million.`),
    },
    {
      q: nb('Y a-t-il des centimes en francs CFA ?'),
      a: nb('Non, le montant s’écrit à l’unité, sans centimes.'),
    },
  ],
  published: D,
  updated: '2026-10-15',
};

export const FR_WORDS_GUIDES = [fr80, fr100, frCheque, frCfa];
