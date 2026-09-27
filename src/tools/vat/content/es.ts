import type { ToolContent } from '../../types';
import type { VatLabels } from '../labels';

const content: ToolContent<VatLabels> = {
  slug: 'calcular-iva',
  metaTitle: 'Calcular IVA: agregar o quitar IVA (México 16%, Chile 19%)',
  metaDescription:
    'Calcula el IVA, el subtotal o el total con IVA incluido. México 16% y 8% frontera, Chile 19%, España 21%, con retenciones de IVA e ISR y el importe con letra.',
  eyebrow: 'Impuestos',
  h1: 'Calcular IVA',
  intro:
    'Escribe una cantidad en cualquier casilla: subtotal, IVA o total con IVA, y las otras dos se calculan al instante. Para México incluye retenciones de honorarios y el total con letra para tu factura.',
  labels: {
    countries: [
      { id: 'MX', name: 'México 16%' },
      { id: 'MXF', name: 'México frontera 8%' },
      { id: 'CL', name: 'Chile 19%' },
      { id: 'ES', name: 'España 21%' },
      { id: 'PE', name: 'Perú 18% (IGV)' },
      { id: 'CO', name: 'Colombia 19%' },
      { id: 'AR', name: 'Argentina 21%' },
      { id: 'custom', name: 'Otra tasa' },
    ],
    defaultCountry: 'MX',
    country: 'País',
    rate: 'Tasa %',
    net: 'Subtotal (sin IVA)',
    vat: 'IVA',
    gross: 'Total con IVA',
    typeAny: 'Escribe en cualquier casilla; las demás se calculan solas.',
    share: 'Parte del IVA en el total',
    inWords: 'Total con letra',
    withholdings: 'Retenciones (honorarios, arrendamiento)',
    ivaRet: 'Retención de IVA (2/3)',
    isr: 'Retención de ISR',
    isrNone: 'Sin retención de ISR',
    isr10: '10% (régimen general)',
    isrResico: '1.25% (RESICO)',
    receive: 'Total a recibir',
    copy: 'Copiar desglose',
    copied: 'Copiado',
    shareLink: 'Copiar enlace',
    shared: 'Enlace copiado',
    reset: 'Borrar',
  },
  sections: [
    {
      heading: 'Cómo calcular el IVA',
      html: `<p class="formula">IVA = subtotal × tasa · Total = subtotal × (1 + tasa)</p>
<p>En México, un servicio de $1,000 más IVA: IVA = 1,000 × 16% = <strong>$160</strong>, total <strong>$1,160</strong>.</p>`,
    },
    {
      heading: 'Cómo quitar el IVA a un precio',
      html: `<p>Divide el total entre 1 más la tasa:</p>
<p class="formula">Subtotal = total ÷ 1.16 → 1,160 ÷ 1.16 = 1,000</p>
<p>No restes el 16% al total: 1,160 × 0.84 = 974.40, que da 25.60 de menos, porque el IVA se cobró sobre el subtotal. En Chile divide entre 1,19: una boleta de $11.900 son $10.000 netos más $1.900 de IVA.</p>`,
    },
    {
      heading: 'Retenciones en México',
      html: `<p>Cuando una persona física cobra honorarios o renta a una persona moral, la empresa le retiene dos terceras partes del IVA y una parte del subtotal como ISR: 10% en el régimen general o 1.25% en el RESICO.</p>
<table><thead><tr><th>Concepto</th><th>Régimen general</th><th>RESICO</th></tr></thead><tbody>
<tr><td>Subtotal</td><td>10,000.00</td><td>10,000.00</td></tr>
<tr><td>IVA 16%</td><td>1,600.00</td><td>1,600.00</td></tr>
<tr><td>Retención IVA (2/3)</td><td>−1,066.67</td><td>−1,066.67</td></tr>
<tr><td>Retención ISR</td><td>−1,000.00</td><td>−125.00</td></tr>
<tr><td><strong>Total a recibir</strong></td><td><strong>9,533.33</strong></td><td><strong>10,408.33</strong></td></tr></tbody></table>
<p>Revisa tu caso con tu contador o en el SAT: las retenciones dependen del tipo de servicio y de quién paga.</p>`,
    },
    {
      heading: 'Tasas de IVA',
      html: `<table><thead><tr><th>País</th><th>Tasa general</th></tr></thead><tbody>
<tr><td>México</td><td>16% (8% en la región fronteriza norte y sur, con estímulo fiscal)</td></tr>
<tr><td>Chile</td><td>19%</td></tr>
<tr><td>España</td><td>21% (10% y 4% reducidos)</td></tr>
<tr><td>Perú</td><td>18% (IGV 16% + IPM 2%)</td></tr>
<tr><td>Colombia</td><td>19%</td></tr>
<tr><td>Argentina</td><td>21%</td></tr></tbody></table>
<p>En Chile los montos se redondean a pesos enteros.</p>`,
    },
  ],
  faq: [
    {
      q: '¿Cómo saco el 16% de una cantidad?',
      a: 'Multiplica por 0.16. El 16% de 2,500 es 400, y el total con IVA es 2,500 × 1.16 = 2,900.',
    },
    {
      q: '¿Cómo sé cuánto es sin IVA?',
      a: 'Divide el total entre 1.16 en México, 1,19 en Chile o 1,21 en España. O escribe el total en la casilla "Total con IVA".',
    },
    {
      q: '¿Por qué la retención de IVA es 10.6667%?',
      a: 'Porque son dos terceras partes del 16%: 16 × 2/3 = 10.6667%. La calculadora la obtiene del IVA ya redondeado.',
    },
    {
      q: '¿Se guardan mis datos?',
      a: 'Solo en tu navegador. Todo se calcula en tu dispositivo y no se envía a ningún servidor.',
    },
  ],
  updated: '2026-09-28',
};

export default content;
