import type { ToolContent } from '../../types';
import type { DniLabels } from '../labels';
import { LETTERS, checkId, dniLetter } from '../engine.ts';

// Every letter below comes from the engine; tests/dni.test.ts and tests/guides.test.ts pin the examples.
const nieLetter = (s: string) => {
  const r = checkId(s);
  return r.ok ? r.expected : '?';
};

const labels: DniLabels = {
  field: 'Número de DNI o NIE',
  placeholder: '12345678 o X1234567',
  hint: 'Escribe solo el número y verás la letra. Si escribes también la letra, la comprobamos. Acepta puntos, espacios y guiones.',
  letter: 'Letra',
  remainder: 'Resto',
  full: 'Documento completo',
  kindDni: 'Cálculo del DNI',
  kindNie: 'Cálculo del NIE (X, Y, Z pasan a 0, 1, 2)',
  valid: 'La letra es correcta.',
  invalid: 'La letra no coincide. La que corresponde es {letter}.',
  errFormat: 'Escribe hasta 8 cifras (DNI) o una X, Y o Z seguida de 7 cifras (NIE).',
  errLength: 'Un NIE lleva una X, Y o Z y 7 cifras.',
  steps: 'Pasos',
  example: 'Probar con un ejemplo',
  copy: 'Copiar documento',
  copied: 'Copiado',
  reset: 'Borrar',
};

const content: ToolContent<DniLabels> = {
  slug: 'calcular-letra-dni',
  metaTitle: 'Calcular la letra del DNI y NIE: calculadora y validador',
  metaDescription:
    'Escribe tu número de DNI y obtén la letra: se divide entre 23 y el resto indica la letra. 12345678 da Z. También sirve para NIE y para comprobar una letra.',
  eyebrow: 'Documentos',
  h1: 'Calcular la letra del DNI',
  intro:
    'Escribe el número de tu DNI o NIE y la herramienta calcula la letra de control. Si escribes también la letra, comprueba que sea la correcta. Todo se calcula en tu navegador y no se guarda nada.',
  labels,
  sections: [
    {
      heading: 'Cómo se calcula la letra del DNI',
      html: `<p>La letra del DNI es un dígito de control. El Ministerio del Interior publica el método: se divide el número entre 23 y el resto, que va de 0 a 22, se cambia por una letra con una tabla fija.</p>
<p>Ejemplo con el número 12345678:</p>
<ol>
<li>12345678 ÷ 23 = 536768, y sobran <strong>14</strong> (23 × 536768 = 12345664, y 12345678 − 12345664 = 14).</li>
<li>En la tabla, la posición 14 es la <strong>Z</strong>.</li>
<li>El documento completo es <strong>12345678Z</strong>.</li>
</ol>
<p>Si tu número tiene menos de 8 cifras (los DNI antiguos tienen 7), el resultado es el mismo: los ceros a la izquierda no cambian el resto.</p>`,
    },
    {
      heading: 'La tabla de letras',
      html: `<table><thead><tr><th>Resto</th><th>Letra</th><th>Resto</th><th>Letra</th><th>Resto</th><th>Letra</th></tr></thead><tbody>
${[0, 1, 2, 3, 4, 5, 6, 7]
  .map((i) => `<tr><td>${i}</td><td>${LETTERS[i]}</td><td>${i + 8}</td><td>${LETTERS[i + 8]}</td><td>${i + 16 < 23 ? i + 16 : ''}</td><td>${i + 16 < 23 ? LETTERS[i + 16] : ''}</td></tr>`)
  .join('\n')}</tbody></table>
<p>La tabla tiene 23 letras: <em>${LETTERS}</em>. No aparecen la I, la Ñ, la O ni la U, para evitar confusiones con otros caracteres (la I con el 1, la O con el 0).</p>`,
    },
    {
      heading: 'La letra del NIE',
      html: `<p>El NIE de un extranjero empieza por X, Y o Z, lleva siete cifras y termina con una letra. Para calcularla se hace lo mismo con un paso previo: la X se cambia por 0, la Y por 1 y la Z por 2, y se divide el número resultante entre 23.</p>
<table><thead><tr><th>NIE sin letra</th><th>Número que se divide</th><th>Letra</th></tr></thead><tbody>
<tr><td>X1234567</td><td>01234567</td><td>${nieLetter('X1234567')}</td></tr>
<tr><td>Y1234567</td><td>11234567</td><td>${nieLetter('Y1234567')}</td></tr>
<tr><td>Z1234567</td><td>21234567</td><td>${nieLetter('Z1234567')}</td></tr></tbody></table>
<p>Así, X1234567 se escribe completo X1234567${nieLetter('X1234567')}.</p>`,
    },
    {
      heading: 'Para qué sirve la letra, y por qué no es un secreto',
      html: `<p>La letra no es una clave ni un dato oculto: cualquiera puede calcularla porque el método es público. Sirve para detectar errores al escribir el número. Como 23 es un número primo, el sistema avisa siempre que se cambia una sola cifra y también cuando se intercambian dos cifras seguidas. Por ejemplo, si en 12345678 se escribe 12345687 por error, la letra correcta pasa de Z a ${dniLetter('12345687')}, y el número mal escrito no coincidiría con la letra original.</p>
<p>Lo que la letra no demuestra es que el documento exista ni a quién pertenece. Una letra correcta solo dice que el número y la letra son coherentes entre sí.</p>`,
    },
    {
      heading: 'Si la letra no coincide',
      html: `<p>Comprueba primero que no hayas cambiado un 0 por una O, un 1 por una I, o que no falte un dígito. Después revisa si tienes bien el número en el documento, porque una letra distinta suele significar una cifra mal copiada. Si el documento físico trae una letra que no coincide con este cálculo, ponte en contacto con la Policía Nacional.</p>`,
    },
    {
      heading: 'Qué no calcula esta herramienta',
      html: `<p>Cubre el DNI de personas físicas y el NIE de extranjeros. No calcula el número de identificación fiscal de empresas (CIF), que usa otras reglas, ni los NIF que empiezan por K, L o M, que se asignan a menores de 14 años sin DNI, a españoles residentes en el extranjero y a extranjeros sin NIE. Si buscas el método oficial, está en la página del Ministerio del Interior sobre el <a href="https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/calculo-del-digito-de-control-del-nif-nie/" rel="noopener">cálculo del dígito de control del NIF y NIE</a>.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cómo se calcula la letra del DNI?',
      a: 'Se divide el número del DNI entre 23 y se toma el resto. Ese resto, de 0 a 22, se cambia por una letra con una tabla fija. Para 12345678 el resto es 14 y la letra es la Z.',
    },
    {
      q: '¿Qué letra corresponde al DNI 12345678?',
      a: 'La Z. 12345678 dividido entre 23 da 536768 y sobran 14, y la posición 14 de la tabla es la Z.',
    },
    {
      q: '¿Cómo se calcula la letra del NIE?',
      a: `Se cambia la X por 0, la Y por 1 o la Z por 2 y se divide entre 23 como en el DNI. Para X1234567 la letra es la ${nieLetter('X1234567')}.`,
    },
    {
      q: '¿Se puede saber la letra del DNI sin tener el documento?',
      a: 'Sí, porque la letra se deduce del número con un método público. Pero eso no permite obtener ni comprobar la identidad de nadie: solo es un dígito de control.',
    },
    {
      q: '¿Por qué el DNI no usa las letras I, Ñ, O y U?',
      a: 'No forman parte de la tabla para evitar confusiones con otros caracteres, por ejemplo la O con el cero.',
    },
    {
      q: '¿Funciona con un DNI de 7 cifras?',
      a: 'Sí. Los ceros a la izquierda no cambian el resto de la división, así que 1234567 y 01234567 dan la misma letra.',
    },
    {
      q: '¿Se guarda mi número de DNI?',
      a: 'No. El cálculo se hace en tu navegador, no se envía a ningún servidor y no se guarda en tu dispositivo.',
    },
  ],
  updated: '2026-10-16',
};

export default content;
