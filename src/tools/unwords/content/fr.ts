import type { ToolContent } from '../../types';
import type { UnwordsLabels } from '../labels';

const labels: UnwordsLabels = {
  input: 'Nombre écrit en lettres',
  placeholder: 'quatre millions cinq cent mille',
  examples: 'Essayez',
  resultLabel: 'En chiffres',
  usualSpelling: 'Orthographe usuelle : {words}.',
  otherSpelling: 'Lu sans problème, mais l’orthographe usuelle est : {words}.',
  empty: 'Écrivez un nombre en lettres pour le voir en chiffres.',
  unknown: 'Mot non reconnu : « {word} ». Vérifiez l’orthographe.',
  order: 'Ce nombre est mal formé près de « {word} ». Vérifiez l’ordre des mots.',
  tooBig: 'Ce nombre dépasse 999 billions, le maximum accepté.',
  copy: 'Copier avec espaces',
  copied: 'Copié',
  copyPlain: 'Copier les chiffres',
  clear: 'Effacer',
};

const content: ToolContent<UnwordsLabels> = {
  slug: 'lettres-en-chiffres',
  metaTitle: 'Lettres en chiffres : « quatre cent mille » en 400 000',
  metaDescription:
    'Écrivez un nombre en toutes lettres et obtenez-le en chiffres : quatre millions cinq cent mille = 4 500 000. Gère quatre-vingt, septante, nonante et l’orthographe de 1990.',
  eyebrow: 'Nombres',
  h1: 'Convertir des lettres en chiffres',
  intro:
    'Tapez un nombre écrit en toutes lettres, par exemple « quatre millions cinq cent mille » : il apparaît en chiffres, ici 4 500 000. Les traits d’union, les majuscules et les variantes belge et suisse (septante, huitante, nonante) sont compris. Pour faire l’inverse, utilisez le convertisseur de chiffres en lettres.',
  labels,
  sections: [
    {
      heading: 'Comment lire un nombre écrit en lettres',
      html: `<p>On lit le nombre par groupes, de gauche à droite, et on additionne&nbsp;:</p>
<p class="formula">quatre millions cinq cent mille = 4 000 000 + 500 000 = 4 500 000</p>
<ul>
<li><strong>Million, milliard, billion</strong> multiplient tout ce qui les précède dans le groupe&nbsp;: <em>deux cent trente millions</em> = 230 × 1 000 000.</li>
<li><strong>Mille</strong> fonctionne de la même façon, et <em>mille</em> seul vaut 1 000.</li>
<li><strong>Cent</strong> multiplie le chiffre qui le précède&nbsp;: <em>trois cent</em> = 300, et <em>cent</em> seul vaut 100.</li>
<li>Le reste (de un à quatre-vingt-dix-neuf) s’additionne&nbsp;: <em>vingt</em> + <em>trois</em> = 23.</li>
</ul>
<table><thead><tr><th>En lettres</th><th>En chiffres</th></tr></thead><tbody>
<tr><td>quatre-vingt-dix-sept</td><td>97</td></tr>
<tr><td>cent soixante-dix mille</td><td>170 000</td></tr>
<tr><td>un million deux cent mille</td><td>1 200 000</td></tr>
<tr><td>quatre millions trois cent trente mille</td><td>4 330 000</td></tr>
<tr><td>quatre-vingt-sept millions cinq mille cent trois</td><td>87 005 103</td></tr>
<tr><td>vingt-huit milliards neuf cent trente mille</td><td>28 000 930 000</td></tr></tbody></table>`,
    },
    {
      heading: 'Les pièges : quatre-vingt, soixante-dix, cent et mille',
      html: `<ul>
<li><strong>Soixante-dix et quatre-vingt-dix</strong> se calculent&nbsp;: <em>soixante-dix</em> = 60 + 10, <em>quatre-vingt-dix-sept</em> = 80 + 10 + 7. <em>Quatre-vingt</em> vaut 4 × 20 = 80.</li>
<li><strong>Cents et vingts</strong> prennent un s seulement à la fin du nombre&nbsp;: <em>deux cents</em> (200) mais <em>deux cent mille</em> (200 000) et <em>deux cent un</em> (201). De même <em>quatre-vingts</em> (80) et <em>quatre-vingt mille</em> (80 000).</li>
<li><strong>«&nbsp;Et&nbsp;»</strong> ne s’emploie que devant un et onze&nbsp;: <em>vingt et un</em> (21), <em>soixante et onze</em> (71).</li>
<li><strong>Million et milliard</strong> sont des noms et s’accordent&nbsp;: <em>deux millions</em>. Ils ne sont pas multipliés par <em>un</em> dans l’écriture usuelle (on écrit <em>un million</em>, mais <em>mille</em> et non «&nbsp;un mille&nbsp;»).</li>
<li><strong>Belgique et Suisse&nbsp;:</strong> <em>septante</em> = 70, <em>nonante</em> = 90, <em>huitante</em> (Suisse romande) et <em>octante</em> = 80.</li>
</ul>
<p>Le convertisseur accepte aussi les erreurs d’accord courantes, comme «&nbsp;deux cents mille&nbsp;», et vous indique alors l’orthographe usuelle. Il ne devine pas&nbsp;: si l’ordre des mots est impossible (par exemple «&nbsp;vingt cent&nbsp;»), il le signale au lieu de donner un nombre faux.</p>`,
    },
    {
      heading: 'Montants : un nombre suivi d’une devise',
      html: `<p>Vous pouvez saisir un montant tel qu’il est écrit sur un chèque&nbsp;: <em>quatre millions cinq cent mille euros</em> donne 4 500 000. Les mots <em>euros</em>, <em>dirhams</em>, <em>francs</em>, <em>francs CFA</em>, <em>dinars</em>, <em>dollars</em> et <em>de</em> ou <em>d’</em> devant la devise (<em>un million d’euros</em>) sont ignorés. Les centimes ne sont pas lus&nbsp;: pour un montant avec centimes, additionnez-les vous-même ou passez par le <a href="/fr/chiffres-en-lettres/">convertisseur de chiffres en lettres</a>, qui fait l’opération inverse et gère les devises.</p>`,
    },
  ],
  faq: [
    {
      q: 'Comment écrire « quatre millions cinq cent mille » en chiffres ?',
      a: '4 500 000. Quatre millions = 4 000 000, cinq cent mille = 500 000, et on additionne.',
    },
    {
      q: 'Comment écrire « cent mille deux » en chiffres ?',
      a: '100 002. Cent mille = 100 000, plus deux. Les zéros intermédiaires sont ceux des groupes absents.',
    },
    {
      q: 'Combien font quatre-vingt-dix-sept en chiffres ?',
      a: '97. Quatre-vingt = 80, dix = 10, sept = 7, soit 80 + 10 + 7.',
    },
    {
      q: 'Septante, huitante et nonante, ça fait combien ?',
      a: 'Septante = 70, nonante = 90 (Belgique et Suisse). Huitante = 80, utilisé en Suisse romande, et octante = 80 dans quelques régions.',
    },
    {
      q: 'Le convertisseur corrige-t-il mon orthographe ?',
      a: 'Il lit votre nombre même avec une faute d’accord (deux cents mille, un mille) et affiche l’orthographe usuelle à côté du résultat. Il refuse en revanche les mots inconnus et les nombres mal formés.',
    },
    {
      q: 'Ce que je saisis est-il envoyé quelque part ?',
      a: 'Non. Le calcul se fait dans votre navigateur et rien n’est transmis à un serveur.',
    },
  ],
  updated: '2026-10-10',
};

export default content;
