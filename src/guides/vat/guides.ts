import type { GuideContent } from '../types';
import { solve, mxWithholding, round } from '../../tools/vat/engine';

// Every amount below comes from the VAT engine, so the guides always match the tool.
const P = '2026-09-28';
const en = (n: number) => n.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const mx = (n: number) => n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const cl = (n: number) => n.toLocaleString('es-CL', { maximumFractionDigits: 0 });

const row = (label: string, total: number, rate: number, fmt: (n: number) => string, decimals = 2) => {
  const b = solve('gross', total, rate, decimals);
  return `<tr><td>${label}</td><td>${fmt(b.gross)}</td><td>${fmt(b.net)}</td><td>${fmt(b.vat)}</td></tr>`;
};

export const vatRemoveEn: GuideContent = {
  key: 'vat-remove',
  tool: 'vat',
  slug: 'how-to-remove-vat-from-a-price',
  metaTitle: 'How to Remove VAT from a Price (15%, 5%, 20%) with Examples',
  metaDescription:
    'Divide the price by 1.15 to take out Saudi VAT, by 1.05 for the UAE and by 1.2 for the UK. Worked examples, the Excel formula and the mistake most people make.',
  h1: 'How to remove VAT from a price',
  answer:
    'Divide the price that includes VAT by 1 plus the rate. For Saudi Arabia that is 1.15, so SAR 1,000 including VAT is 869.57 before VAT and 130.43 VAT. The VAT is the price minus that result.',
  sections: [
    {
      heading: 'Examples',
      html: `<table><thead><tr><th>Rate</th><th>Price incl. VAT</th><th>Before VAT</th><th>VAT</th></tr></thead><tbody>
${row('Saudi Arabia 15%', 115, 15, en)}
${row('Saudi Arabia 15%', 1000, 15, en)}
${row('UAE 5%', 250, 5, en)}
${row('UK 20%', 60, 20, en)}</tbody></table>
<p>Round the price before VAT to two decimals, then subtract it from the total to get the VAT. That way the two parts always add back up to the price you started with.</p>`,
    },
    {
      heading: "Why you can't just take 15% off",
      html: `<p>VAT is added on top of the net price, so it is 15% of the net price, not 15% of the total. Taking 15% off SAR 1,150 gives 977.50, but the real price before VAT is 1,000. You'd be SAR 22.50 short.</p>
<p>A quicker way to get only the VAT part is to multiply the total by a fixed fraction:</p>
<ul>
<li>Saudi Arabia (15%): total × 3/23</li>
<li>UAE and Oman (5%): total × 1/21</li>
<li>UK (20%): total × 1/6</li>
</ul>`,
    },
    {
      heading: 'In Excel or Google Sheets',
      html: `<p>With the price including VAT in cell A2:</p>
<p class="formula">Before VAT: =ROUND(A2/1.15, 2)<br>VAT: =A2-ROUND(A2/1.15, 2)</p>
<p>Change 1.15 to 1.05 for the UAE or 1.2 for the UK.</p>`,
    },
  ],
  faq: [
    {
      q: 'How much is 15% VAT on 100?',
      a: 'If 100 is the price before VAT, the VAT is 15 and the total is 115. If 100 already includes VAT, the VAT inside it is 13.04 and the price before VAT is 86.96.',
    },
    {
      q: 'Does a receipt show the price with or without VAT?',
      a: 'In Saudi Arabia and the UAE, shelf prices and receipts for consumers must include VAT. Business invoices show both: the amount before VAT, the VAT and the total.',
    },
  ],
  published: P,
  updated: P,
};

export const vatRemoveAr: GuideContent = {
  key: 'vat-remove',
  tool: 'vat',
  slug: 'how-to-remove-vat-15',
  metaTitle: 'طريقة استخراج الضريبة 15% من المبلغ الشامل (مع أمثلة)',
  metaDescription:
    'اقسم المبلغ الشامل على 1.15 لتعرف السعر قبل الضريبة، والفرق هو الضريبة. أمثلة بالريال والدرهم، ومعادلة Excel، والخطأ الذي يقع فيه كثيرون.',
  h1: 'طريقة استخراج الضريبة 15% من المبلغ الشامل',
  answer:
    'اقسم المبلغ الشامل على 1.15، والناتج هو السعر قبل الضريبة. الفرق بين الرقمين هو الضريبة. مثلاً 1000 ريال شاملة الضريبة تساوي 869.57 قبل الضريبة و130.43 ضريبة.',
  sections: [
    {
      heading: 'أمثلة',
      html: `<table><thead><tr><th>النسبة</th><th>المبلغ الشامل</th><th>قبل الضريبة</th><th>الضريبة</th></tr></thead><tbody>
${row('السعودية 15%', 115, 15, en)}
${row('السعودية 15%', 1000, 15, en)}
${row('السعودية 15%', 5750, 15, en)}
${row('الإمارات 5%', 250, 5, en)}</tbody></table>
<p>قرّب السعر قبل الضريبة إلى هللتين، ثم اطرحه من المبلغ الشامل لتحصل على الضريبة. بهذه الطريقة يكون مجموع الرقمين مساوياً للمبلغ الأصلي دائماً.</p>`,
    },
    {
      heading: 'لماذا لا نخصم 15% من الإجمالي؟',
      html: `<p>الضريبة تُحسب على السعر قبل الضريبة، فهي 15% من 1000 وليست 15% من 1150. لو خصمت 15% من 1150 لحصلت على 977.50، والصحيح 1000، أي بفرق 22.50 ريالاً.</p>
<p>ولمعرفة الضريبة وحدها بسرعة اضرب المبلغ الشامل في 3 ÷ 23 في السعودية، أو في 1 ÷ 21 في الإمارات وعُمان.</p>`,
    },
    {
      heading: 'المعادلة في Excel',
      html: `<p>إذا كان المبلغ الشامل في الخلية A2:</p>
<p class="formula" dir="ltr">=ROUND(A2/1.15, 2)<br>=A2-ROUND(A2/1.15, 2)</p>
<p>المعادلة الأولى تعطي السعر قبل الضريبة، والثانية تعطي الضريبة. في الإمارات ضع 1.05 بدلاً من 1.15.</p>`,
    },
  ],
  faq: [
    {
      q: 'كم الضريبة في 100 ريال؟',
      a: 'إذا كانت 100 ريال قبل الضريبة فالضريبة 15 ريالاً والإجمالي 115. وإذا كانت 100 ريال شاملة الضريبة فالضريبة داخلها 13.04 والسعر قبلها 86.96.',
    },
    {
      q: 'هل الأسعار في المحلات شاملة الضريبة؟',
      a: 'نعم، يجب أن تكون الأسعار المعروضة للمستهلك في السعودية شاملة الضريبة. أما الفاتورة الضريبية بين الشركات فتذكر المبلغ قبل الضريبة والضريبة والإجمالي.',
    },
  ],
  published: P,
  updated: P,
};

export const vatRemoveEs: GuideContent = {
  key: 'vat-remove',
  tool: 'vat',
  slug: 'como-quitar-el-iva',
  metaTitle: 'Cómo quitar el IVA a un precio (16% y 19%) con ejemplos',
  metaDescription:
    'Divide el precio entre 1.16 para quitar el IVA en México o entre 1,19 en Chile. Ejemplos resueltos, la fórmula de Excel y el error más común al restar el 16%.',
  h1: 'Cómo quitar el IVA a un precio',
  answer:
    'Divide el precio con IVA entre 1 más la tasa. En México es 1.16: un precio de $1,000 con IVA incluido son $862.07 de subtotal y $137.93 de IVA. El IVA es la diferencia entre los dos.',
  sections: [
    {
      heading: 'Ejemplos',
      html: `<table><thead><tr><th>Tasa</th><th>Precio con IVA</th><th>Subtotal</th><th>IVA</th></tr></thead><tbody>
${row('México 16%', 116, 16, mx)}
${row('México 16%', 1000, 16, mx)}
${row('México frontera 8%', 540, 8, mx)}
${row('Chile 19%', 10000, 19, cl, 0)}</tbody></table>
<p>En Chile los montos van en pesos enteros, por eso el subtotal se redondea sin decimales.</p>`,
    },
    {
      heading: 'Por qué no sirve restar el 16%',
      html: `<p>El IVA se calcula sobre el subtotal, no sobre el total. Si a $1,160 le restas el 16% te quedan $974.40, pero el subtotal real es $1,000. La diferencia son $25.60.</p>
<p>Si solo quieres el IVA, multiplica el total por 4/29 en México (16%) o por 19/119 en Chile.</p>`,
    },
    {
      heading: 'Fórmula en Excel',
      html: `<p>Con el precio con IVA en la celda A2:</p>
<p class="formula">Subtotal: =REDONDEAR(A2/1.16; 2)<br>IVA: =A2-REDONDEAR(A2/1.16; 2)</p>
<p>Según la configuración de tu Excel, el separador puede ser coma en lugar de punto y coma. Para Chile usa 1,19 y redondea a 0 decimales.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cuánto es el IVA de $100?',
      a: 'Si $100 es el subtotal, el IVA es $16 y el total $116. Si $100 ya incluye IVA, el subtotal es $86.21 y el IVA $13.79.',
    },
    {
      q: '¿Los precios en tiendas incluyen IVA?',
      a: 'En México y en Chile los precios al público deben mostrarse con IVA incluido. En las facturas entre empresas se desglosa el subtotal y el IVA.',
    },
  ],
  published: P,
  updated: P,
};

// Mexico: what to invoice so that, after withholdings, you receive a round amount.
const TARGET = 10000;
const factor = 1 + 0.16 - (0.16 * 2) / 3 - 0.1;
const netForTarget = round(TARGET / factor);
const whTarget = mxWithholding(solve('net', netForTarget, 16), true, 10);
const base = solve('net', 10000, 16);
const whGeneral = mxWithholding(base, true, 10);
const whResico = mxWithholding(base, true, 1.25);

export const mxRetencionesEs: GuideContent = {
  key: 'mx-retenciones',
  tool: 'vat',
  slug: 'retenciones-iva-isr-honorarios',
  metaTitle: 'Cómo calcular las retenciones de IVA e ISR en honorarios (2026)',
  metaDescription:
    'Si facturas honorarios o renta a una empresa te retienen 2/3 del IVA y 10% de ISR (1.25% en RESICO). Ejemplo con $10,000 y cuánto facturar para recibir una cantidad exacta.',
  h1: 'Cómo calcular las retenciones de IVA e ISR en honorarios',
  answer:
    'Sobre un subtotal de $10,000 se cobra IVA de $1,600, la empresa retiene $1,066.67 de IVA y $1,000 de ISR, y tú recibes $9,533.33. En RESICO la retención de ISR es de 1.25%, así que recibes $10,408.33.',
  sections: [
    {
      heading: 'Quién retiene y cuánto',
      html: `<p>Cuando una persona física cobra honorarios, renta un local o cobra comisiones a una persona moral, la empresa que paga retiene dos impuestos y los entera al SAT a más tardar el día 17 del mes siguiente:</p>
<ul>
<li><strong>IVA:</strong> dos terceras partes del IVA trasladado, que equivalen a 10.6667% del subtotal.</li>
<li><strong>ISR:</strong> 10% del subtotal en el régimen general, o 1.25% si estás en el RESICO.</li>
</ul>
<p>Si le facturas a otra persona física, en general no hay retenciones.</p>`,
    },
    {
      heading: 'Ejemplo con $10,000 de subtotal',
      html: `<table><thead><tr><th>Concepto</th><th>Régimen general</th><th>RESICO</th></tr></thead><tbody>
<tr><td>Subtotal</td><td>${mx(base.net)}</td><td>${mx(base.net)}</td></tr>
<tr><td>IVA 16%</td><td>${mx(base.vat)}</td><td>${mx(base.vat)}</td></tr>
<tr><td>Total de la factura</td><td>${mx(base.gross)}</td><td>${mx(base.gross)}</td></tr>
<tr><td>IVA retenido</td><td>−${mx(whGeneral.ivaRet)}</td><td>−${mx(whResico.ivaRet)}</td></tr>
<tr><td>ISR retenido</td><td>−${mx(whGeneral.isrRet)}</td><td>−${mx(whResico.isrRet)}</td></tr>
<tr><td><strong>Recibes</strong></td><td><strong>${mx(whGeneral.receive)}</strong></td><td><strong>${mx(whResico.receive)}</strong></td></tr></tbody></table>`,
    },
    {
      heading: 'Cuánto facturar para recibir una cantidad exacta',
      html: `<p>En el régimen general recibes 95.3333% del subtotal (100% + 16% − 10.6667% − 10%). Para recibir $${mx(TARGET)} divide entre 0.953333:</p>
<p class="formula">${mx(TARGET)} ÷ 0.953333 = ${mx(netForTarget)} de subtotal</p>
<p>Con ese subtotal la factura queda en ${mx(whTarget.receive + whTarget.ivaRet + whTarget.isrRet)} y, después de retenciones, recibes ${mx(whTarget.receive)}. Por el redondeo a centavos puede sobrar o faltar un centavo.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Por qué la retención de IVA es 10.6667%?',
      a: 'Porque son dos terceras partes del 16%: 16 × 2 ÷ 3 = 10.6667. En la práctica se calcula sobre el IVA de la factura, ya redondeado.',
    },
    {
      q: '¿En RESICO también me retienen IVA?',
      a: 'Sí, cuando le facturas honorarios o arrendamiento a una persona moral te retiene las dos terceras partes del IVA, igual que en el régimen general. Lo que cambia es el ISR: 1.25% en lugar de 10%.',
    },
  ],
  published: P,
  updated: P,
};
