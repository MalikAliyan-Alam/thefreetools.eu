import type { GuideContent } from '../types';
import { esWords, parseAmount, toWords, type Amount } from '../../tools/words/engine.ts';

// Every number in words below comes from the engine; tests/guides.test.ts pins the strings.
const w = (n: string) => esWords(n);
const mxn = (n: string) => toWords('es', parseAmount(n, false, false) as Amount, { currency: 'MXN', letterCase: 'lower' });

const D = '2026-10-11';

export const esReglas: GuideContent = {
  key: 'es-numeros-reglas',
  tool: 'words',
  slug: 'como-se-escriben-los-numeros-en-letras',
  metaTitle: 'Cómo se escriben los números en letras: reglas y ejemplos con pesos',
  metaDescription: `Veintiún o veintiuno, cien o ciento, un millón de pesos: las reglas para escribir cantidades en letras, con ejemplos como ${w('1500000')} y ${w('185000')}.`,
  h1: 'Cómo se escriben los números en letras',
  answer: `Del 16 al 29 se escribe en una palabra (${w('22')}), desde el 31 con «y» (${w('31')}), y delante de un sustantivo uno se vuelve un: ${w('21000')} pesos. Cien es solo el 100 exacto, y desde el 101 se dice ciento.`,
  sections: [
    {
      heading: 'Lo que más se confunde',
      html: `<table><thead><tr><th>Número</th><th>Se escribe</th></tr></thead><tbody>
<tr><td>16</td><td>${w('16')}</td></tr>
<tr><td>22</td><td>${w('22')}</td></tr>
<tr><td>31</td><td>${w('31')}</td></tr>
<tr><td>100</td><td>${w('100')}</td></tr>
<tr><td>101</td><td>${w('101')}</td></tr>
<tr><td>1,001</td><td>${w('1001')}</td></tr>
<tr><td>185,000</td><td>${w('185000')}</td></tr>
<tr><td>600,000</td><td>${w('600000')}</td></tr>
<tr><td>1,500,000</td><td>${w('1500000')}</td></tr>
<tr><td>1,000,000,000</td><td>${w('1000000000')}</td></tr></tbody></table>
<p>Fíjate en el último: en español mil millones es 10<sup>9</sup>. La palabra <em>billón</em> no vale mil millones, vale un millón de millones.</p>`,
    },
    {
      heading: 'Veintiuno o veintiún',
      html: `<p>Sola, la cifra es <em>${w('21')}</em>. Pero delante de un sustantivo, o de <em>mil</em> y <em>millones</em>, pierde la o: <em>${esWords('21', true)} pesos</em>, <em>${w('21000')}</em>, <em>${w('21000000')}</em>. Lo mismo pasa con 31, 41 y los demás: <em>${w('31000')}</em>.</p>
<p>Si tu cantidad termina en uno y el sustantivo es femenino (veintiuna personas), la forma es <em>una</em>. En pesos y en euros, que son masculinos, queda <em>un</em>.</p>`,
    },
    {
      heading: 'Cuándo lleva «de» un millón de pesos',
      html: `<p>Después de <em>millón</em> y <em>millones</em> se escribe <em>de</em> solo si ahí termina la cantidad: <em>${mxn('1000000')}</em>. En cuanto siguen más cifras, desaparece: <em>${w('1500000')} pesos</em>.</p>
<p>Con <em>mil</em> no se usa nunca: <em>${w('5500')} pesos</em>, no «cinco mil quinientos de pesos».</p>`,
    },
    {
      heading: 'Para comprobar una cantidad larga',
      html: `<p>Si vas a llenar un cheque o una factura, escribe la cifra en el <a href="/es/numeros-a-letras/">convertidor de números a letras</a> y compara con lo que tienes. Con pesos mexicanos añade «00/100 M.N.» al final, y con otras monedas el convertidor sigue el formato de cada país.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cómo se lee 1,500,000?',
      a: `${w('1500000')}. No lleva «de» porque la cantidad sigue después de millón.`,
    },
    {
      q: '¿Cómo se escribe 185,000 en letras?',
      a: `${w('185000')}. Ciento porque después del 100 siempre se usa ciento.`,
    },
    {
      q: '¿Es veintiuno o veintiún mil?',
      a: `Veintiún mil. Delante de mil, millones o un sustantivo masculino se usa la forma corta: ${w('21000')}.`,
    },
    {
      q: '¿Cuánto es mil millones?',
      a: `Es 1,000,000,000, o ${w('1000000000')}. El billón en español son un millón de millones.`,
    },
  ],
  published: D,
  updated: D,
};
