import type { ToolContent } from '../../types';
import type { WordsLabels } from '../labels';

const labels: WordsLabels = {
  amount: 'Número o importe',
  amountPlaceholder: '1.234,56',
  readAs: 'Leído como {n}',
  language: 'Escribir en',
  langNames: { en: 'Inglés (English)', es: 'Español', fr: 'Francés (Français)', ar: 'Árabe (العربية)' },
  currency: 'Moneda',
  plainNumber: 'Sin moneda, solo el número',
  options: 'Opciones',
  cheque: 'Formato cheque (56/100)',
  andOption: '"and" británico (hundred and five)',
  indianOption: 'Lakh y crore',
  onlyOption: { en: 'Añadir "only"', es: '', fr: '', ar: 'Añadir فقط … لا غير' },
  frVariant: 'País',
  frVariantNames: { fr: 'Francia (quatre-vingt-dix)', be: 'Bélgica (septante, nonante)', ch: 'Suiza (huitante)' },
  reformOption: 'Ortografía de 1990 (vingt‑et‑un)',
  letterCase: 'Mayúsculas',
  caseNames: { sentence: 'Normal', upper: 'MAYÚSCULAS', title: 'Tipo Título', lower: 'minúsculas' },
  resultLabel: 'En letras',
  empty: 'Escribe un número para verlo en letras.',
  invalid: 'Usa solo cifras, con coma o punto para los decimales.',
  tooBig: 'Tiene más de 15 cifras. El máximo es 999 billones.',
  examples: 'Prueba',
  copy: 'Copiar texto',
  copied: 'Copiado',
  share: 'Copiar enlace',
  shared: 'Enlace copiado',
};

const content: ToolContent<WordsLabels> = {
  slug: 'numeros-a-letras',
  metaTitle: 'Números a letras: cantidad con letra para cheques y facturas',
  metaDescription:
    'Convierte números y cantidades a letras: pesos 56/100 M.N., M/CTE, soles, euros y dólares, con las reglas de la RAE (veintiún, un millón de). Gratis.',
  eyebrow: 'Números',
  h1: 'Convertir números a letras',
  intro:
    'Escribe una cifra y la verás en letras mientras escribes. Elige la moneda para obtener la cantidad con letra tal como va en una factura, un cheque o un pagaré de México, Colombia, Perú, España u otro país.',
  labels,
  sections: [
    {
      heading: 'Cómo se escriben los números en letras',
      html: `<p>La cifra se lee por grupos de tres de derecha a izquierda. Del 0 al 29 cada número es una sola palabra (<em>dieciséis</em>, <em>veintidós</em>, <em>veintiséis</em>, con tilde); desde el 31 se escribe en tres palabras: <em>treinta y uno</em>, <em>cuarenta y cinco</em>.</p>
<p class="formula">4.305.017 → cuatro millones trescientos cinco mil diecisiete</p>
<ul>
<li><strong>Cien y ciento:</strong> 100 es <em>cien</em>; de 101 a 199 se usa <em>ciento</em> (<em>ciento uno</em>).</li>
<li><strong>Mil, no "un mil":</strong> 1000 es <em>mil</em> y 1500 es <em>mil quinientos</em>.</li>
<li><strong>Uno delante de un sustantivo:</strong> se acorta a <em>un</em>: <em>veintiún pesos</em>, <em>treinta y un mil</em>, <em>ciento un euros</em>.</li>
<li><strong>Millón lleva "de" si va solo:</strong> <em>un millón de pesos</em>, pero <em>un millón quinientos mil pesos</em>.</li>
<li><strong>Escala larga:</strong> mil millones = 1.000.000.000 y un billón = 1.000.000.000.000. El <em>billion</em> inglés equivale a mil millones.</li>
</ul>
<p>Estas reglas son las del <em>Diccionario panhispánico de dudas</em> de la RAE.</p>`,
    },
    {
      heading: 'Formatos por país',
      html: `<table><thead><tr><th>País</th><th>1234,56 en letras</th></tr></thead><tbody>
<tr><td>México (facturas, cheques)</td><td>mil doscientos treinta y cuatro pesos 56/100 M.N.</td></tr>
<tr><td>Colombia</td><td>mil doscientos treinta y cuatro pesos con cincuenta y seis centavos M/CTE</td></tr>
<tr><td>Perú (comprobantes)</td><td>mil doscientos treinta y cuatro con 56/100 soles</td></tr>
<tr><td>España (euros)</td><td>mil doscientos treinta y cuatro euros con cincuenta y seis céntimos</td></tr>
<tr><td>Chile (pesos, sin decimales)</td><td>mil doscientos treinta y cinco pesos</td></tr></tbody></table>
<p><em>M.N.</em> significa moneda nacional y <em>M/CTE</em>, moneda corriente. En Chile el peso no tiene decimales, así que 1234,56 se redondea a 1235. En facturas y cheques es habitual escribir el importe en MAYÚSCULAS: elige esa opción en <em>Mayúsculas</em>.</p>`,
    },
    {
      heading: 'Decimales sin moneda',
      html: `<p>Sin moneda, la parte decimal se lee después de <em>coma</em>, con los ceros iniciales: 3,05 es <em>tres coma cero cinco</em> y 12,5 es <em>doce coma cinco</em>.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Se escribe veintiún o veintiuno?',
      a: 'Veintiuno cuando va solo ("tengo veintiuno") y veintiún delante de un sustantivo masculino: veintiún pesos, veintiún mil. Lo mismo pasa con uno/un y treinta y uno/treinta y un.',
    },
    {
      q: '¿Cómo se escribe 1.000.000 en letras?',
      a: 'Un millón. Delante de la moneda, un millón de pesos. 2.500.000 es dos millones quinientos mil.',
    },
    {
      q: '¿Qué significa 00/100 M.N. en una factura?',
      a: 'Son los centavos escritos como fracción de 100 y la abreviatura de moneda nacional. Una cantidad sin centavos se escribe, por ejemplo, quinientos pesos 00/100 M.N.',
    },
    {
      q: '¿Dieciséis lleva tilde?',
      a: 'Sí: dieciséis, veintidós, veintitrés y veintiséis llevan tilde porque son palabras agudas terminadas en vocal o s.',
    },
    {
      q: '¿Se guarda lo que escribo?',
      a: 'Solo en tu navegador. El texto se genera en tu dispositivo y no se envía a ningún servidor.',
    },
  ],
  updated: '2026-09-27',
};

export default content;
