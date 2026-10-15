import type { ToolContent } from '../../types';
import type { AguinaldoLabels } from '../labels';
import { aguinaldo, dailyFromMonthly, daysWorkedInYear, UMA_2026 } from '../engine.ts';

// Every amount below is computed by the engine; tests/aguinaldo.test.ts pins the examples.
const money = (x: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(x);
const full = aguinaldo({ daily: 500 });
const half = aguinaldo({ daily: 500, daysWorked: 183 });
const q = aguinaldo({ daily: 500, daysWorked: 91 });
const jul1 = daysWorkedInYear({ y: 2026, m: 7, d: 1 }, 2026);
const fromJul = aguinaldo({ daily: 500, daysWorked: jul1 });

const labels: AguinaldoLabels = {
  salaryType: 'Tu sueldo es',
  daily: 'Diario',
  monthly: 'Mensual',
  salary: 'Sueldo',
  monthlyNote: 'Con sueldo mensual, el salario diario es el sueldo mensual entre 30.',
  days: 'Días de aguinaldo',
  daysHint: 'La ley da 15 días como mínimo; muchas empresas pagan más.',
  worked: 'Días trabajados en el año',
  workedFull: 'Escribe 365 si trabajaste todo el año; si no, los días que trabajaste.',
  startDate: 'Fecha de ingreso (opcional)',
  startHint: 'Si entraste este año, pon la fecha y se calculan los días.',
  uma: 'UMA diaria',
  umaHint: 'La UMA cambia cada año: confirma el valor vigente en INEGI.',
  advanced: 'Más opciones: días de aguinaldo, fecha de ingreso y UMA',
  gross: 'Aguinaldo bruto',
  exempt: 'Parte exenta de ISR (hasta 30 UMA)',
  taxable: 'Parte gravada',
  dailyUsed: 'Salario diario usado',
  taxNote: 'La parte gravada es la que se suma a tu ingreso para calcular el ISR. La retención exacta la calcula tu empresa con las tablas del SAT.',
  invalid: 'Revisa el sueldo, los días y la UMA.',
  example: 'Probar con un ejemplo',
  copy: 'Copiar resultado',
  copied: 'Copiado',
  reset: 'Borrar',
};

const content: ToolContent<AguinaldoLabels> = {
  slug: 'calculadora-de-aguinaldo',
  metaTitle: 'Calculadora de aguinaldo 2026 México: proporcional e ISR',
  metaDescription: `Calcula tu aguinaldo con 15 días o más, proporcional a los días trabajados y la parte exenta de ISR. Con $500 diarios, un año completo es ${money(full.gross)}. Gratis.`,
  eyebrow: 'Trabajo',
  h1: 'Calculadora de aguinaldo',
  intro:
    'Escribe tu sueldo y los días que trabajaste en el año. Verás el aguinaldo bruto, cuánto queda exento de ISR y cuánto se grava, con los 15 días que marca la ley o los que te pague tu empresa.',
  labels,
  sections: [
    {
      heading: 'Cómo se calcula el aguinaldo',
      html: `<p>La Ley Federal del Trabajo (artículo 87) da derecho a un aguinaldo anual de por lo menos 15 días de salario, que debe pagarse antes del 20 de diciembre. La fórmula es:</p>
<p class="formula">Aguinaldo = salario diario × días de aguinaldo × días trabajados ÷ 365</p>
<p>Si ganas $15,000 al mes, tu salario diario es ${money(dailyFromMonthly(15000))} ($15,000 ÷ 30). Con el año completo: ${money(500)} × 15 = <strong>${money(full.gross)}</strong>.</p>`,
    },
    {
      heading: 'Aguinaldo proporcional: si no trabajaste todo el año',
      html: `<p>Quien no completó el año recibe la parte proporcional a los días que trabajó. Con $500 de salario diario y 15 días de aguinaldo:</p>
<table><thead><tr><th>Días trabajados</th><th>Aguinaldo</th></tr></thead><tbody>
<tr><td>365 (año completo)</td><td>${money(full.gross)}</td></tr>
<tr><td>183 (medio año)</td><td>${money(half.gross)}</td></tr>
<tr><td>${jul1} (si entraste el 1 de julio)</td><td>${money(fromJul.gross)}</td></tr>
<tr><td>91 (unos 3 meses)</td><td>${money(q.gross)}</td></tr></tbody></table>
<p>Por eso, si trabajaste solo tres meses, sí te corresponde aguinaldo, pero proporcional. En la calculadora, escribe los días o pon tu fecha de ingreso en «Más opciones».</p>`,
    },
    {
      heading: 'Cuántos días de aguinaldo son por ley',
      html: `<p>El mínimo legal es de 15 días de salario. Una empresa puede pagar más, por ejemplo 30 días, si así lo marca tu contrato o sus prestaciones. En la calculadora cambia el campo «Días de aguinaldo» para ver el resultado con los días que te dan.</p>
<table><thead><tr><th>Días de aguinaldo</th><th>Con $500 diarios, año completo</th></tr></thead><tbody>
${[15, 20, 30, 40].map((d) => `<tr><td>${d}</td><td>${money(aguinaldo({ daily: 500, days: d }).gross)}</td></tr>`).join('\n')}</tbody></table>`,
    },
    {
      heading: 'Cuándo se paga el aguinaldo',
      html: `<p>La ley fija como fecha límite el 20 de diciembre. En 2026 ese día cae en domingo, así que lo prudente es que el pago esté hecho antes. Si no te lo pagan a tiempo, puedes acudir a la PROFEDET o a la autoridad laboral de tu estado.</p>`,
    },
    {
      heading: 'Aguinaldo y ISR: cuánto está exento',
      html: `<p>Según la Ley del ISR (artículo 93, fracción XIV), el aguinaldo está exento hasta 30 veces la UMA diaria. Con la UMA de ${money(UMA_2026)} (el valor de 2026), el tope exento es <strong>${money(full.exemptLimit)}</strong>. Lo que pase de ese tope se grava.</p>
<p>Ejemplo con un aguinaldo de ${money(full.gross)}: exentos ${money(full.exempt)} y gravados ${money(full.taxable)}. Con un aguinaldo menor al tope, como $3,000, todo queda exento.</p>
<p>La calculadora te da la parte exenta y la gravada. El monto exacto que te retiene la empresa depende de tu sueldo y de las tablas del SAT, y lo calcula el área de nómina. La UMA se actualiza cada año; confírmala en INEGI.</p>`,
    },
    {
      heading: 'Si tu sueldo es variable',
      html: `<p>Si tu ingreso cambia cada mes (comisiones, destajo), la PROFEDET indica tomar el promedio diario de los últimos 30 días efectivamente trabajados como salario diario. Escríbelo en la calculadora eligiendo «Diario».</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cómo se calcula el aguinaldo?',
      a: `Salario diario × días de aguinaldo × días trabajados ÷ 365. Con $500 diarios, 15 días y el año completo: ${money(full.gross)}.`,
    },
    {
      q: '¿Cuántos días de aguinaldo son por ley?',
      a: 'Por lo menos 15 días de salario, según el artículo 87 de la Ley Federal del Trabajo. Tu empresa puede darte más.',
    },
    {
      q: '¿Cuándo se paga el aguinaldo?',
      a: 'Antes del 20 de diciembre.',
    },
    {
      q: 'Si trabajé 3 meses, ¿me corresponde aguinaldo?',
      a: `Sí, la parte proporcional. Con $500 diarios y 91 días trabajados son ${money(q.gross)}.`,
    },
    {
      q: '¿El aguinaldo paga ISR?',
      a: `Está exento hasta 30 UMA (${money(full.exemptLimit)} con la UMA de ${money(UMA_2026)}). Lo que exceda ese monto se grava.`,
    },
    {
      q: '¿Se guardan mis datos?',
      a: 'No se envía nada a nuestros servidores. El cálculo se hace en tu navegador y se guarda lo último que escribiste solo en tu dispositivo.',
    },
  ],
  updated: '2026-10-15',
};

export default content;
