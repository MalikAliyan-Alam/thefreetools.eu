import type { ToolContent } from '../../types';
import type { WordsLabels } from '../labels';

const labels: WordsLabels = {
  amount: 'Nombre ou montant',
  amountPlaceholder: '1 234,56',
  readAs: 'Lu comme {n}',
  language: 'Écrire en',
  langNames: { en: 'Anglais (English)', es: 'Espagnol (Español)', fr: 'Français', ar: 'Arabe (العربية)' },
  currency: 'Devise',
  plainNumber: 'Sans devise, juste le nombre',
  options: 'Options',
  cheque: 'Format chèque (56/100)',
  andOption: '« and » britannique (hundred and five)',
  indianOption: 'Lakh et crore',
  onlyOption: { en: 'Ajouter « only »', es: '', fr: '', ar: 'Ajouter فقط … لا غير' },
  frVariant: 'Pays',
  frVariantNames: { fr: 'France (quatre-vingt-dix)', be: 'Belgique (septante, nonante)', ch: 'Suisse (huitante)' },
  reformOption: 'Orthographe de 1990 (vingt‑et‑un)',
  letterCase: 'Casse',
  caseNames: { sentence: 'Normale', upper: 'MAJUSCULES', title: 'Majuscule À Chaque Mot', lower: 'minuscules' },
  resultLabel: 'En lettres',
  empty: 'Saisissez un nombre pour le voir en lettres.',
  invalid: 'Utilisez uniquement des chiffres, avec une virgule ou un point pour les décimales.',
  tooBig: 'Plus de 15 chiffres. Le maximum est 999 billions.',
  examples: 'Essayez',
  copy: 'Copier le texte',
  copied: 'Copié',
  share: 'Copier le lien',
  shared: 'Lien copié',
};

const content: ToolContent<WordsLabels> = {
  slug: 'chiffres-en-lettres',
  metaTitle: 'Chiffre en lettre : convertir un nombre ou un montant en lettres',
  metaDescription:
    'Convertissez des chiffres en lettres pour un chèque ou une facture\u00a0: dirhams, euros, francs, dinars. Règles de l’Académie, variantes belge et suisse.',
  eyebrow: 'Nombres',
  h1: 'Convertir des chiffres en lettres',
  intro:
    'Saisissez un nombre : il s’écrit en toutes lettres au fur et à mesure. Choisissez une devise pour obtenir le montant tel qu’on l’écrit sur un chèque, une facture ou un contrat, en dirhams, en euros, en francs suisses ou CFA, ou en dinars.',
  labels,
  sections: [
    {
      heading: 'Les règles pour écrire un nombre en lettres',
      html: `<p>On découpe le nombre en tranches de trois chiffres à partir de la droite, puis on écrit chaque tranche suivie de son rang&nbsp;: mille, million, milliard.</p>
<p class="formula">4 305 017 → quatre millions trois cent cinq mille dix-sept</p>
<ul>
<li><strong>Trait d’union sous cent&nbsp;:</strong> entre les dizaines et les unités (<em>dix-sept</em>, <em>quarante-deux</em>, <em>quatre-vingt-dix-neuf</em>), sauf quand le nombre contient <em>et</em>.</li>
<li><strong>«&nbsp;Et&nbsp;» seulement devant un et onze&nbsp;:</strong> <em>vingt et un</em>, <em>trente et un</em>, <em>soixante et onze</em>. Mais <em>quatre-vingt-un</em> et <em>quatre-vingt-onze</em> s’écrivent sans «&nbsp;et&nbsp;».</li>
<li><strong>Vingt et cent au pluriel&nbsp;:</strong> ils prennent un s quand ils sont multipliés et terminent le nombre&nbsp;: <em>quatre-vingts</em>, <em>deux cents</em>. Pas de s si un autre nombre suit (<em>quatre-vingt-trois</em>, <em>deux cent un</em>), ni devant <em>mille</em> (<em>deux cent mille</em>).</li>
<li><strong>Mille est invariable&nbsp;:</strong> <em>trois mille</em>, jamais «&nbsp;trois milles&nbsp;». On écrit <em>mille</em>, et non «&nbsp;un mille&nbsp;».</li>
<li><strong>Million et milliard sont des noms&nbsp;:</strong> ils s’accordent (<em>deux millions</em>, <em>deux cents millions</em>) et sont suivis de «&nbsp;de&nbsp;» devant la devise&nbsp;: <em>un million de dirhams</em>, <em>deux millions d’euros</em>.</li>
</ul>
<p>Ce sont les règles traditionnelles décrites par l’Académie française. Au-delà du milliard, le rang suivant est le <em>billion</em> (1 000 milliards), à ne pas confondre avec le <em>billion</em> anglais, qui vaut un milliard.</p>`,
    },
    {
      heading: 'Orthographe de 1990 : vingt et un ou vingt-et-un ?',
      html: `<p>Les rectifications de l’orthographe de 1990 proposent de relier par des traits d’union tous les numéraux d’un nombre composé, au-dessous comme au-dessus de cent&nbsp;: <em>vingt-et-un</em>, <em>deux-cent-trois</em>, <em>mille-deux-cents</em>. Les deux graphies sont correctes. Cochez <em>Orthographe de 1990</em> pour utiliser la nouvelle.</p>
<p>Les règles d’accord ne changent pas&nbsp;: <em>deux-cents</em>, <em>quatre-vingts</em>. <em>Million</em> et <em>milliard</em> restent séparés par des espaces, car ce sont des noms et non des adjectifs numéraux&nbsp;: <em>trois millions deux-cent-mille</em>. C’est la lecture de l’Académie française.</p>`,
    },
    {
      heading: 'Belgique et Suisse : septante, huitante, nonante',
      html: `<table><thead><tr><th>Nombre</th><th>France</th><th>Belgique</th><th>Suisse romande</th></tr></thead><tbody>
<tr><td>70</td><td>soixante-dix</td><td>septante</td><td>septante</td></tr>
<tr><td>71</td><td>soixante et onze</td><td>septante et un</td><td>septante et un</td></tr>
<tr><td>80</td><td>quatre-vingts</td><td>quatre-vingts</td><td>huitante</td></tr>
<tr><td>90</td><td>quatre-vingt-dix</td><td>nonante</td><td>nonante</td></tr>
<tr><td>97</td><td>quatre-vingt-dix-sept</td><td>nonante-sept</td><td>nonante-sept</td></tr></tbody></table>
<p><em>Huitante</em> s’emploie surtout dans les cantons de Vaud, du Valais et de Fribourg. À Genève, on dit plutôt <em>quatre-vingts</em>&nbsp;: choisissez alors <em>Belgique</em>, qui donne les mêmes mots.</p>`,
    },
    {
      heading: 'Exemples de nombres souvent cherchés',
      html: `<table><thead><tr><th>En chiffres</th><th>En lettres</th></tr></thead><tbody>
<tr><td>13 000</td><td>treize mille</td></tr>
<tr><td>25 000</td><td>vingt-cinq mille</td></tr>
<tr><td>80 000</td><td>quatre-vingt mille</td></tr>
<tr><td>130 000</td><td>cent trente mille</td></tr>
<tr><td>170 000</td><td>cent soixante-dix mille</td></tr>
<tr><td>200 000</td><td>deux cent mille</td></tr>
<tr><td>3 000 000</td><td>trois millions</td></tr>
<tr><td>4 500 000</td><td>quatre millions cinq cent mille</td></tr>
<tr><td>1 000 000 000</td><td>un milliard</td></tr></tbody></table>
<p>Pour l’opération inverse, par exemple <em>quatre millions cinq cent mille</em> en chiffres, utilisez le <a href="/fr/lettres-en-chiffres/">convertisseur de lettres en chiffres</a>.</p>
<p>Dans <em>quatre-vingt mille</em>, <em>vingt</em> ne prend pas de <em>s</em>, car il n’est pas le dernier mot du nombre&nbsp;: <em>mille</em> reste invariable. Pour lire dans l’autre sens, par exemple <em>quatre millions cinq cent mille</em>, additionnez les groupes&nbsp;: 4 000 000 + 500 000 = 4 500 000.</p>
<table><thead><tr><th>Montant</th><th>En lettres</th></tr></thead><tbody>
<tr><td>10 000 €</td><td>dix mille euros</td></tr>
<tr><td>1 000 000 €</td><td>un million d’euros</td></tr>
<tr><td>25 000 FCFA</td><td>vingt-cinq mille francs CFA</td></tr>
<tr><td>3 000 000 FCFA</td><td>trois millions de francs CFA</td></tr>
<tr><td>200 000 DZD</td><td>deux cent mille dinars</td></tr></tbody></table>
<p>Après <em>million</em> et <em>milliard</em>, on met <em>de</em> devant le nom de la monnaie&nbsp;: <em>un million d’euros</em>, <em>trois millions de francs CFA</em>.</p>`,
    },
    {
      heading: 'Petits nombres et montants en euros les plus demandés',
      html: `<table><thead><tr><th>En chiffres</th><th>En lettres</th></tr></thead><tbody>
<tr><td>1</td><td>un</td></tr><tr><td>2</td><td>deux</td></tr><tr><td>3</td><td>trois</td></tr><tr><td>4</td><td>quatre</td></tr><tr><td>5</td><td>cinq</td></tr><tr><td>6</td><td>six</td></tr><tr><td>7</td><td>sept</td></tr><tr><td>8</td><td>huit</td></tr><tr><td>9</td><td>neuf</td></tr><tr><td>10</td><td>dix</td></tr><tr><td>11</td><td>onze</td></tr><tr><td>12</td><td>douze</td></tr><tr><td>13</td><td>treize</td></tr><tr><td>14</td><td>quatorze</td></tr><tr><td>15</td><td>quinze</td></tr><tr><td>16</td><td>seize</td></tr><tr><td>17</td><td>dix-sept</td></tr><tr><td>18</td><td>dix-huit</td></tr><tr><td>19</td><td>dix-neuf</td></tr><tr><td>20</td><td>vingt</td></tr><tr><td>30</td><td>trente</td></tr><tr><td>40</td><td>quarante</td></tr><tr><td>50</td><td>cinquante</td></tr><tr><td>60</td><td>soixante</td></tr><tr><td>70</td><td>soixante-dix</td></tr><tr><td>76</td><td>soixante-seize</td></tr><tr><td>80</td><td>quatre-vingts</td></tr><tr><td>90</td><td>quatre-vingt-dix</td></tr><tr><td>100</td><td>cent</td></tr><tr><td>200</td><td>deux cents</td></tr><tr><td>350</td><td>trois cent cinquante</td></tr><tr><td>1000</td><td>mille</td></tr></tbody></table>
<table><thead><tr><th>Montant</th><th>En lettres</th></tr></thead><tbody>
<tr><td>15 €</td><td>quinze euros</td></tr><tr><td>65 €</td><td>soixante-cinq euros</td></tr><tr><td>90 €</td><td>quatre-vingt-dix euros</td></tr><tr><td>100 €</td><td>cent euros</td></tr><tr><td>350 €</td><td>trois cent cinquante euros</td></tr><tr><td>1 000 €</td><td>mille euros</td></tr><tr><td>100 000 €</td><td>cent mille euros</td></tr></tbody></table>
<p>Sur un chèque, ajoutez la devise et un trait après le montant : <em>trois cent cinquante euros</em>.</p>`,
    },
    {
      heading: 'Montants : dirhams, euros, francs, dinars',
      html: `<table><thead><tr><th>Pays</th><th>1 234,56 en lettres</th></tr></thead><tbody>
<tr><td>Maroc (MAD)</td><td>mille deux cent trente-quatre dirhams et cinquante-six centimes</td></tr>
<tr><td>France, Belgique (EUR)</td><td>mille deux cent trente-quatre euros et cinquante-six centimes</td></tr>
<tr><td>Suisse (CHF)</td><td>mille deux cent trente-quatre francs et cinquante-six centimes</td></tr>
<tr><td>Canada (CAD)</td><td>mille deux cent trente-quatre dollars et cinquante-six cents</td></tr>
<tr><td>Afrique de l’Ouest (XOF)</td><td>mille deux cent trente-cinq francs CFA</td></tr></tbody></table>
<p>Le franc CFA n’a pas de subdivision&nbsp;: le montant est arrondi à l’unité. Le dinar tunisien compte 1 000 millimes, donc 12,500 TND s’écrit <em>douze dinars et cinq cents millimes</em>.</p>
<p>Sur un chèque en France, si le montant en chiffres et le montant en lettres ne concordent pas, c’est la somme écrite en toutes lettres qui fait foi (article L131-10 du Code monétaire et financier). Tracez un trait après le montant pour qu’on ne puisse rien ajouter.</p>`,
    },
    {
      heading: 'Décimales sans devise',
      html: `<p>Sans devise, la partie décimale se lit après <em>virgule</em>, avec ses zéros&nbsp;: 3,05 se lit <em>trois virgule zéro cinq</em> et 12,5 <em>douze virgule cinq</em>.</p>`,
    },
  ],
  faq: [
    {
      q: 'Quatre-vingt ou quatre-vingts ?',
      a: 'Quatre-vingts avec un s quand il termine le nombre (quatre-vingts euros), sans s quand un autre nombre suit (quatre-vingt-cinq) ou devant mille (quatre-vingt mille). Devant million, qui est un nom, le s reste : quatre-vingts millions.',
    },
    {
      q: 'Deux cent ou deux cents ?',
      a: 'Deux cents quand cent termine le nombre (deux cents dirhams), deux cent quand un autre nombre suit : deux cent trois, deux cent mille.',
    },
    {
      q: 'Mille prend-il un s ?',
      a: 'Non, mille est invariable : trois mille dirhams, dix mille euros. Le nom « mille » qui désigne une distance (des milles marins) est un autre mot.',
    },
    {
      q: 'Comment écrire 1 000 000 en lettres ?',
      a: 'Un million. Avec une devise : un million de dirhams, un million d’euros. 2 500 000 s’écrit deux millions cinq cent mille.',
    },
    {
      q: 'Faut-il écrire vingt et un ou vingt-et-un ?',
      a: 'Les deux sont acceptés. Vingt et un est la graphie traditionnelle ; vingt-et-un suit l’orthographe rectifiée de 1990, qui relie tous les numéraux par des traits d’union.',
    },
    {
      q: 'Ce que je saisis est-il envoyé quelque part ?',
      a: 'Non. Le texte est calculé dans votre navigateur et n’est envoyé à aucun serveur.',
    },
  ],
  updated: '2026-10-15',
};

export default content;
