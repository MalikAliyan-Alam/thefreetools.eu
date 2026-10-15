import type { ToolContent } from '../../types';
import type { GradeScaleLabels } from '../labels';
import { gradeFor, minScoreFor, passingScore } from '../engine.ts';

// Every grade below is computed by the engine; tests/gradescale.test.ts pins the examples.
const g = (score: number, max: number, pct: number) =>
  new Intl.NumberFormat('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(gradeFor(score, max, pct / 100));
const n = (x: number) => new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(x);

const labels: GradeScaleLabels = {
  max: 'Puntaje máximo',
  exigency: 'Exigencia',
  score: 'Puntaje obtenido',
  exigencyHint: 'La exigencia es el porcentaje de puntos que da un 4,0. Lo más habitual es 60 %, pero cada colegio o universidad fija la suya.',
  grade: 'Nota',
  passAt: 'Puntaje para el 4,0',
  passAtValue: '{n} puntos',
  wantGrade: 'Nota que quieres',
  needScore: 'Puntaje que necesitas',
  table: 'Tabla de puntajes y notas',
  tableScore: 'Puntaje',
  tableGrade: 'Nota',
  tooBig: 'La tabla se muestra con puntajes máximos de hasta 200. Usa el cálculo de arriba.',
  invalid: 'Escribe un puntaje máximo entero y una exigencia entre 1 y 99.',
  example: 'Probar con un ejemplo',
  copy: 'Copiar resultado',
  copied: 'Copiado',
  reset: 'Borrar puntaje',
};

const needRow = (grade: number) => `<tr><td>${new Intl.NumberFormat('es-CL', { minimumFractionDigits: 1 }).format(grade)}</td><td>${minScoreFor(grade, 60, 0.6)} de 60</td></tr>`;

const content: ToolContent<GradeScaleLabels> = {
  slug: 'escala-de-notas',
  metaTitle: 'Escala de notas Chile: calculadora con 60 % de exigencia',
  metaDescription: `Convierte puntaje a nota de 1,0 a 7,0 con la exigencia que elijas. Con 60 %, 25 puntos de 38 son un ${g(25, 38, 60)}; 60 de 100 son un 4,0. Gratis.`,
  eyebrow: 'Notas',
  h1: 'Escala de notas: de puntaje a nota',
  intro:
    'Escribe el puntaje máximo de la prueba, la exigencia y los puntos obtenidos, y obtén la nota de 1,0 a 7,0. También ves cuántos puntos necesitas para la nota que quieres y la tabla completa de puntajes.',
  labels,
  sections: [
    {
      heading: 'Cómo se calcula la nota con exigencia',
      html: `<p>La escala chilena va de 1,0 a 7,0 y el 4,0 es la nota mínima para aprobar. La exigencia dice qué porcentaje de los puntos corresponde a ese 4,0. Hay dos tramos, y en cada uno la nota sube de forma lineal:</p>
<ul>
<li><strong>Bajo la exigencia:</strong> nota = 1,0 + 3 × puntaje ÷ (exigencia × puntaje máximo)</li>
<li><strong>Desde la exigencia:</strong> nota = 4,0 + 3 × (puntaje − exigencia × máximo) ÷ ((1 − exigencia) × máximo)</li>
</ul>
<p>Ejemplo con exigencia de 60 % en una prueba de 38 puntos: el 4,0 está en ${n(passingScore(38, 0.6))} puntos. Con 25 puntos, la nota es 4,0 + 3 × (25 − ${n(passingScore(38, 0.6))}) ÷ (0,4 × 38) = <strong>${g(25, 38, 60)}</strong>. La nota se redondea a un decimal.</p>`,
    },
    {
      heading: 'Escala de notas al 60 % para 100 puntos',
      html: `<table><thead><tr><th>Puntaje</th><th>Nota</th></tr></thead><tbody>
${[0, 20, 30, 40, 50, 59, 60, 65, 70, 75, 80, 85, 90, 95, 100].map((p) => `<tr><td>${p}</td><td>${g(p, 100, 60)}</td></tr>`).join('\n')}</tbody></table>
<p>El 60 % da exactamente un 4,0 y el 100 % da un 7,0. Con 59 puntos la nota calculada es 3,95, que al redondear a un decimal se escribe 4,0 (si tu colegio trunca en vez de aproximar, sería 3,9). Para la tabla completa de otro puntaje máximo, usa la calculadora de arriba.</p>`,
    },
    {
      heading: 'Mismo puntaje, distinta exigencia',
      html: `<p>La exigencia cambia mucho la nota. Con 50 puntos de 100:</p>
<table><thead><tr><th>Exigencia</th><th>Nota con 50 de 100</th></tr></thead><tbody>
<tr><td>50 %</td><td>${g(50, 100, 50)}</td></tr>
<tr><td>55 %</td><td>${g(50, 100, 55)}</td></tr>
<tr><td>60 %</td><td>${g(50, 100, 60)}</td></tr></tbody></table>
<p>Cada colegio o universidad define su exigencia en su reglamento de evaluación. El 60 % es lo más habitual, pero hay reglamentos que usan 50 %, 55 % u otros valores, así que revisa el tuyo.</p>`,
    },
    {
      heading: 'Qué puntaje necesitas para una nota',
      html: `<p>En una prueba de 60 puntos con exigencia de 60 %:</p>
<table><thead><tr><th>Nota que quieres</th><th>Puntaje mínimo</th></tr></thead><tbody>
${[4, 5, 6, 7].map(needRow).join('\n')}</tbody></table>
<p>El puntaje mínimo es el menor número entero de puntos que da esa nota al redondear a un decimal. Si necesitas saber qué nota sacar en el siguiente examen para aprobar el ramo, mira <a href="/es/guias/que-nota-necesito-para-aprobar/">qué nota necesito para aprobar</a>.</p>`,
    },
    {
      heading: 'Después de la nota: el promedio',
      html: `<p>Con las notas ya calculadas, el promedio del ramo se saca con la <a href="/es/calcular-promedio/">calculadora de promedio</a>, que acepta porcentajes por prueba. La explicación paso a paso está en <a href="/es/guias/como-calcular-promedio-notas-chile/">cómo calcular el promedio de notas en Chile</a>.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cómo se calcula la nota con 60 % de exigencia?',
      a: `Hasta el 60 % de los puntos, la nota sube de 1,0 a 4,0, y desde el 60 % hasta el 100 % sube de 4,0 a 7,0. En una prueba de 100 puntos, 80 puntos son un ${g(80, 100, 60)}.`,
    },
    {
      q: '¿Qué nota es 60 de 100?',
      a: `Un ${g(60, 100, 60)} con exigencia de 60 %. Con exigencia de 50 % sería un ${g(60, 100, 50)}.`,
    },
    {
      q: '¿Cuántos puntos necesito para un 4,0 en una prueba de 38 puntos?',
      a: `${n(passingScore(38, 0.6))} puntos exactos con 60 % de exigencia. Como los puntos son enteros, necesitas ${minScoreFor(4, 38, 0.6)} para llegar al 4,0.`,
    },
    {
      q: '¿Se aproxima o se trunca la nota?',
      a: 'Lo más común es aproximar a un decimal (3,95 sube a 4,0), pero algunos reglamentos truncan. Revisa el de tu colegio o universidad.',
    },
    {
      q: '¿Se guardan mis datos?',
      a: 'No se envía nada a nuestros servidores. El cálculo se hace en tu navegador y se guarda lo último que escribiste solo en tu dispositivo.',
    },
  ],
  updated: '2026-10-15',
};

export default content;
