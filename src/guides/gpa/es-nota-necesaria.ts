import type { GuideContent } from '../types';

const guide: GuideContent = {
  key: 'gpa-target',
  tool: 'gpa',
  slug: 'que-nota-necesito-para-aprobar',
  metaTitle: '¿Qué nota necesito para aprobar? Cómo calcularla',
  metaDescription:
    'Fórmula para saber qué nota necesitas en el examen o en lo que falta para aprobar con 4,0 o llegar a tu meta, con ejemplos en escala de 1 a 7.',
  h1: '¿Qué nota necesito para aprobar?',
  answer:
    'Nota necesaria = (nota que quieres − suma de nota × peso de lo ya evaluado) ÷ peso que falta. Si el resultado es mayor que 7,0, la meta no se alcanza; si es menor que 1,0, ya la tienes asegurada.',
  sections: [
    {
      heading: 'La fórmula',
      html: `<p class="formula">Nota necesaria = (meta − Σ nota × peso ya evaluado) ÷ peso restante</p>
<p>Los pesos van en decimal: 25 % = 0,25. El "peso restante" es lo que falta para llegar a 100 %.</p>`,
    },
    {
      heading: 'Ejemplo: ¿qué necesito en el examen para el 4,0?',
      html: `<p>Llevas tres notas y el examen vale 30 %:</p>
<table><thead><tr><th>Evaluación</th><th>Nota</th><th>Peso</th><th>Nota × peso</th></tr></thead><tbody>
<tr><td>Prueba 1</td><td>5,0</td><td>25 %</td><td>1,25</td></tr>
<tr><td>Prueba 2</td><td>3,8</td><td>25 %</td><td>0,95</td></tr>
<tr><td>Trabajo</td><td>4,5</td><td>20 %</td><td>0,90</td></tr>
<tr><td><strong>Llevas</strong></td><td></td><td><strong>70 %</strong></td><td><strong>3,10</strong></td></tr></tbody></table>
<p class="formula">Para un 4,0: (4,0 − 3,10) ÷ 0,30 = 3,0</p>
<p>Con un 3,0 en el examen apruebas justo. Para terminar con un 5,0 necesitarías (5,0 − 3,10) ÷ 0,30 = 6,33, es decir, al menos un <strong>6,4</strong>: la nota necesaria siempre se redondea hacia arriba.</p>`,
    },
    {
      heading: 'Cuando la meta no se puede alcanzar',
      html: `<p>Si el resultado supera 7,0, la meta no es posible con el peso que queda. En el ejemplo, un 6,5 final exigiría (6,5 − 3,10) ÷ 0,30 = 11,3, imposible en la escala chilena.</p>
<p>Ojo: algunos ramos exigen además una nota mínima en el examen o en las pruebas, sin importar el promedio. Revisa el programa del curso.</p>`,
    },
    {
      heading: 'Calcúlalo con la herramienta',
      html: `<p>En la <a href="/es/calcular-promedio/">calculadora de promedio</a> escribe las notas que ya tienes con su porcentaje. En <em>¿Qué nota necesito?</em> pon el promedio que quieres y el peso que falta (30 en el ejemplo) y verás la nota exacta.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Qué pasa si los porcentajes no suman 100 %?',
      a: 'La fórmula usa solo el peso que falta. Si hay evaluaciones que aún no conoces, súmalas todas en el peso restante.',
    },
    {
      q: '¿Sirve para la universidad y el colegio?',
      a: 'Sí, siempre que la nota final sea un promedio ponderado. Para promedios de créditos usa los créditos como peso.',
    },
  ],
  published: '2026-09-26',
  updated: '2026-09-26',
};

export default guide;
