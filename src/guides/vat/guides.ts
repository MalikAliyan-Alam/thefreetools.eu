import type { GuideContent } from '../types';
import { solve, mxWithholding, round } from '../../tools/vat/engine';

// Every amount below comes from the VAT engine, so the guides always match the tool.
const P = '2026-09-28';
const D = '2026-10-15';
/** VAT contained in a price of 100 that already includes VAT. */
const inside = (rate: number) => solve('gross', 100, rate).vat;
const net100 = (rate: number) => solve('gross', 100, rate).net;
const tbl = (rows: [string, number, string][], fmt: (n: number) => string) =>
  rows
    .map(([name, rate, note]) => `<tr><td>${name}</td><td>${rate}%</td><td>1.${String(rate).padStart(2, '0').replace(/0+$/, '') || '0'}</td><td>${fmt(inside(rate))}</td><td>${note}</td></tr>`)
    .join('\n');
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
    {
      heading: 'Standard rates and the factor to divide by',
      html: `<table><thead><tr><th>Country</th><th>Standard rate</th><th>Divide by</th><th>VAT inside a price of 100</th><th>Note</th></tr></thead><tbody>
${tbl(
  [
    ['Saudi Arabia', 15, 'Raised from 5% on 1 July 2020'],
    ['United Arab Emirates', 5, ''],
    ['United Kingdom', 20, 'Reduced 5% and 0% rates also exist'],
    ['Spain', 21, 'Reduced 10% and 4% rates also exist'],
  ],
  en,
)}</tbody></table>
<p>Check the rate on the invoice itself. The tax authorities (ZATCA in Saudi Arabia, HMRC in the UK, the Federal Tax Authority in the UAE and the Agencia Tributaria in Spain) publish the current rates and which goods and services are reduced, zero-rated or exempt.</p>`,
    },
    {
      heading: 'Zero-rated, exempt and reduced items',
      html: `<p>Not everything on a bill carries the standard rate. A <strong>zero-rated</strong> supply (many exports, for example) is taxable at 0%, so the price has no VAT to remove. An <strong>exempt</strong> supply is outside VAT altogether. A <strong>reduced-rate</strong> item uses its own, lower rate. If a bill mixes them, remove VAT line by line with the rate that line used, never once on the total.</p>`,
    },
    {
      heading: 'Rounding: per line or on the total?',
      html: `<p>Rounding can change the VAT by a few cents. Three items of 0.30 before 15% VAT: rounding each line gives ${en(round(0.3 * 0.15, 2))} × 3 = <strong>${en(round(0.3 * 0.15, 2) * 3)}</strong> of VAT, while rounding the total (0.90 × 15%) gives <strong>${en(round(0.9 * 0.15, 2))}</strong>. Both are common in accounting software. Pick one method, apply it to every invoice, and keep the invoice total equal to the sum of its printed lines.</p>`,
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
    {
      q: 'How do I get the VAT amount only?',
      a: `Multiply the price including VAT by the rate and divide by 100 plus the rate. At 15%, that is the price × 15 ÷ 115, the same as × 3/23. For ${en(115)} it gives ${en(solve('gross', 115, 15).vat)}.`,
    },
    {
      q: 'Which VAT rate should I use?',
      a: 'The one printed on the invoice or receipt. Standard rates differ by country, and reduced or zero rates apply to some goods and services.',
    },
  ],
  published: P,
  updated: '2026-10-15',
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
    {
      heading: 'النسب القياسية والعامل الذي تقسم عليه',
      html: `<table><thead><tr><th>الدولة</th><th>النسبة</th><th>اقسم على</th><th>الضريبة داخل مبلغ 100</th><th>ملاحظة</th></tr></thead><tbody>
${tbl(
  [
    ['السعودية', 15, 'رُفعت من 5% في 1 يوليو 2020'],
    ['الإمارات', 5, ''],
    ['المملكة المتحدة', 20, 'توجد نسب مخفضة 5% وصفر%'],
  ],
  en,
)}</tbody></table>
<p>اعتمد النسبة المكتوبة في الفاتورة نفسها. وتنشر الجهات الضريبية (هيئة الزكاة والضريبة والجمارك في السعودية، والهيئة الاتحادية للضرائب في الإمارات) النسب الحالية والسلع والخدمات المخفضة أو المعفاة.</p>`,
    },
    {
      heading: 'الخاضع للصفر والمعفى والمخفض',
      html: `<p>ليس كل بند في الفاتورة بالنسبة القياسية. التوريد <strong>الخاضع لنسبة الصفر</strong> (كثير من الصادرات مثلاً) مفروض عليه ضريبة 0%، فلا توجد ضريبة لتستخرجها. والتوريد <strong>المعفى</strong> خارج الضريبة أصلاً. أما البند <strong>المخفض</strong> فله نسبته الأقل. وإذا اجتمعت هذه البنود في فاتورة واحدة فاستخرج الضريبة لكل بند بنسبته، لا مرة واحدة على الإجمالي.</p>`,
    },
    {
      heading: 'التقريب: لكل بند أم على الإجمالي؟',
      html: `<p>قد يغيّر التقريب الضريبة ببضع هللات. ثلاثة بنود سعر كل منها 0.30 قبل ضريبة 15%: التقريب لكل بند يعطي ${en(round(0.3 * 0.15, 2))} × 3 = <strong>${en(round(0.3 * 0.15, 2) * 3)}</strong>، والتقريب على الإجمالي (0.90 × 15%) يعطي <strong>${en(round(0.9 * 0.15, 2))}</strong>. والطريقتان شائعتان في برامج المحاسبة. اختر طريقة واحدة وطبّقها على كل الفواتير، وليكن إجمالي الفاتورة مساوياً لمجموع بنودها المطبوعة.</p>`,
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
    {
      q: 'كيف أحسب مبلغ الضريبة فقط؟',
      a: `اضرب المبلغ الشامل في 15 واقسمه على 115، وهو نفسه الضرب في 3 ÷ 23. مثلاً ${en(115)} ريال فيها ضريبة ${en(solve('gross', 115, 15).vat)}.`,
    },
    {
      q: 'أي نسبة ضريبة أستخدم؟',
      a: 'النسبة المكتوبة في الفاتورة أو الإيصال. تختلف النسب القياسية بين الدول، وتُطبق نسب مخفضة أو صفرية على بعض السلع والخدمات.',
    },
  ],
  published: P,
  updated: '2026-10-15',
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
    {
      heading: 'Tasas generales y entre cuánto dividir',
      html: `<table><thead><tr><th>País</th><th>Tasa general</th><th>Divide entre</th><th>IVA dentro de un precio de 100</th><th>Nota</th></tr></thead><tbody>
${tbl(
  [
    ['México', 16, 'En la región fronteriza es 8%; algunos productos tienen tasa 0%'],
    ['Chile', 19, ''],
    ['España', 21, 'También existen los tipos reducidos de 10% y 4%'],
    ['Colombia', 19, ''],
    ['Argentina', 21, ''],
  ],
  mx,
)}</tbody></table>
<p>Usa siempre la tasa impresa en la factura. Las autoridades (el SAT en México, el SII en Chile, la Agencia Tributaria en España, la DIAN en Colombia y ARCA en Argentina) publican las tasas vigentes y qué productos tienen tasa reducida, tasa 0 o están exentos.</p>`,
    },
    {
      heading: 'Tasa 0, exento y tasa reducida',
      html: `<p>No todo lo que ves en una cuenta lleva la tasa general. En México, un producto con <strong>tasa 0%</strong> (muchos alimentos y medicinas, por ejemplo) sí está gravado, pero a 0%, así que no hay IVA que quitar. Un producto <strong>exento</strong> queda fuera del impuesto. Y una tasa <strong>reducida</strong> tiene su propio porcentaje. Si una cuenta mezcla estos casos, quita el IVA línea por línea con la tasa de cada una, no una sola vez sobre el total.</p>`,
    },
    {
      heading: 'Redondeo: por línea o sobre el total',
      html: `<p>El redondeo puede cambiar el IVA por unos centavos. Tres artículos de $0.30 antes de IVA al 16%: redondear cada línea da ${mx(round(0.3 * 0.16, 2))} × 3 = <strong>${mx(round(0.3 * 0.16, 2) * 3)}</strong> de IVA, y redondear el total (0.90 × 16%) da <strong>${mx(round(0.9 * 0.16, 2))}</strong>. Los dos métodos se usan en los sistemas contables. Elige uno, aplícalo a todas tus facturas y cuida que el total de la factura sea igual a la suma de las líneas impresas.</p>`,
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
    {
      q: '¿Cómo saco solo el IVA de un precio que ya lo incluye?',
      a: `Multiplica el precio por la tasa y divide entre 100 más la tasa. Con 16%, es el precio × 16 ÷ 116, igual que × 4/29. Para $${mx(116)} el IVA es $${mx(solve('gross', 116, 16).vat)}.`,
    },
    {
      q: '¿Qué tasa de IVA debo usar?',
      a: 'La que aparece en la factura o el ticket. La tasa general cambia por país, y algunos productos tienen tasa reducida, tasa 0 o están exentos.',
    },
  ],
  published: P,
  updated: '2026-10-15',
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
  metaTitle: 'Cómo calcular retenciones de IVA e ISR en honorarios (2026)',
  metaDescription:
    'Si facturas honorarios o renta a una empresa te retienen 2/3 del IVA y 10% de ISR (1.25% en RESICO). Ejemplo con $10,000 y cuánto facturar para cobrar lo justo.',
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
    {
      heading: 'Cómo aparecen las retenciones en la factura (CFDI)',
      html: `<p>En el CFDI, las retenciones se capturan como impuestos retenidos: el ISR con la clave 001 y el IVA con la clave 002. La factura muestra el total con IVA, y el pago que recibes es ese total menos las retenciones. Como la retención se hace al pagar, se calcula sobre lo efectivamente pagado, no sobre lo facturado. Si el cliente te paga en dos partes, la retención se reparte igual.</p>`,
    },
    {
      heading: 'Las retenciones no son un gasto: se acreditan',
      html: `<p>Lo que te retienen no es un impuesto extra. Son anticipos que acreditas en tus pagos provisionales mensuales y en tu declaración anual, y la empresa te entrega la constancia de retenciones. Con los $${mx(10000)} del ejemplo, en el régimen general acreditas $${mx(whGeneral.isrRet)} de ISR; en RESICO, $${mx(whResico.isrRet)}. El IVA retenido ($${mx(whGeneral.ivaRet)}) también se acredita en tu declaración de IVA.</p>`,
    },
    {
      heading: 'Cuándo no te retienen',
      html: `<ul>
<li>Si el cliente es persona física (no una empresa), en general no hay retención de IVA ni de ISR por honorarios.</li>
<li>Si lo que vendes son productos y no un servicio personal independiente, las reglas de retención son distintas.</li>
<li>Las tasas y los supuestos pueden cambiar cada año con la Ley del ISR, la Ley del IVA y la Resolución Miscelánea Fiscal, así que revisa la vigente en el portal del SAT antes de facturar.</li>
</ul>
<p>Las bases legales que se citan con más frecuencia son el artículo 106 de la Ley del ISR para la retención de 10%, el artículo 113-J para el 1.25% de RESICO y el artículo 1-A de la Ley del IVA para las dos terceras partes del IVA.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Por qué la retención de IVA es 10.6667%?',
      a: 'Porque son dos terceras partes del 16%: 16 × 2 ÷ 3 = 10.6667. En la práctica se calcula sobre el IVA de la factura, ya redondeado.',
    },
    {
      q: '¿En RESICO también me retienen IVA?',
      a: 'En la práctica, cuando le facturas honorarios a una persona moral te retiene las dos terceras partes del IVA, igual que en el régimen general, y lo que cambia es el ISR: 1.25% en lugar de 10%. Algunos pagadores aplican criterios distintos, así que confírmalo con tu cliente y con tu contador antes de timbrar.',
    },
    {
      q: '¿Qué claves se usan en el CFDI para las retenciones?',
      a: 'El ISR retenido usa la clave 001 y el IVA retenido la clave 002.',
    },
    {
      q: '¿Las retenciones se pierden?',
      a: 'No. Son anticipos: los acreditas en tus pagos provisionales y en tu declaración anual con las constancias que te da tu cliente.',
    },
  ],
  published: P,
  updated: '2026-10-15',
};
