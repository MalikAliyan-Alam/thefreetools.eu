import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAmount, splitMoney, enWords, esWords, arWords, arCount, toWords, type Amount, type Lang, type WordsOptions } from '../src/tools/words/engine.ts';

const amt = (s: string) => parseAmount(s) as Amount;
const w = (lang: Lang, s: string, o: Partial<WordsOptions> = {}) => toWords(lang, amt(s), { currency: '', letterCase: 'lower', ...o });

test('parsing separators', () => {
  assert.deepEqual(parseAmount('1,234.56'), { negative: false, int: '1234', frac: '56' });
  assert.deepEqual(parseAmount('1.234,56'), { negative: false, int: '1234', frac: '56' });
  assert.deepEqual(parseAmount('1 234,5'), { negative: false, int: '1234', frac: '5' });
  assert.deepEqual(parseAmount('1,234'), { negative: false, int: '1234', frac: '' });
  assert.deepEqual(parseAmount('0,5'), { negative: false, int: '0', frac: '5' });
  assert.deepEqual(parseAmount('١٢٣٤٫٥'), { negative: false, int: '1234', frac: '5' });
  assert.equal(parseAmount('12a'), null);
  assert.equal(parseAmount('1234567890123456'), 'too-big');
  assert.deepEqual(splitMoney(amt('0.999'), 2), { major: 1n, minor: 0 });
  assert.deepEqual(splitMoney(amt('10.5'), 3), { major: 10n, minor: 500 });
});

test('English', () => {
  assert.equal(enWords('0'), 'zero');
  assert.equal(enWords('1234'), 'one thousand two hundred thirty-four');
  assert.equal(enWords('1234', { and: true }), 'one thousand two hundred and thirty-four');
  assert.equal(enWords('1005', { and: true }), 'one thousand and five');
  assert.equal(enWords('1000000'), 'one million');
  assert.equal(enWords('1234567', { indian: true }), 'twelve lakh thirty-four thousand five hundred sixty-seven');
  assert.equal(enWords('150000', { indian: true }), 'one lakh fifty thousand');
  assert.equal(w('en', '1234.56', { currency: 'USD' }), 'one thousand two hundred thirty-four dollars and fifty-six cents');
  assert.equal(w('en', '1234.56', { currency: 'USD', cheque: true, letterCase: 'sentence' }), 'One thousand two hundred thirty-four and 56/100 dollars');
  assert.equal(w('en', '1.01', { currency: 'GBP' }), 'one pound and one penny');
  assert.equal(w('en', '150000', { currency: 'INR', only: true, letterCase: 'title' }), 'Rupees One Lakh Fifty Thousand Only');
  assert.equal(w('en', '12.05'), 'twelve point zero five');
  assert.equal(w('en', '-7'), 'minus seven');
});

test('Spanish', () => {
  assert.equal(esWords('100'), 'cien');
  assert.equal(esWords('101'), 'ciento uno');
  assert.equal(esWords('21000'), 'veintiún mil');
  assert.equal(esWords('31'), 'treinta y uno');
  assert.equal(esWords('1000000000'), 'mil millones');
  assert.equal(esWords('2500000'), 'dos millones quinientos mil');
  assert.equal(esWords('1000000000000'), 'un billón');
  assert.equal(w('es', '1234.56', { currency: 'MXN' }), 'mil doscientos treinta y cuatro pesos 56/100 M.N.');
  assert.equal(w('es', '21', { currency: 'MXN' }), 'veintiún pesos 00/100 M.N.');
  assert.equal(w('es', '1000000', { currency: 'MXN' }), 'un millón de pesos 00/100 M.N.');
  assert.equal(w('es', '1.01', { currency: 'EUR' }), 'un euro con un céntimo');
  assert.equal(w('es', '0.50', { currency: 'EUR' }), 'cincuenta céntimos');
  assert.equal(w('es', '1234.56', { currency: 'PEN' }), 'mil doscientos treinta y cuatro con 56/100 soles');
  assert.equal(w('es', '1500000', { currency: 'COP' }), 'un millón quinientos mil pesos M/CTE');
  assert.equal(w('es', '3,05'), 'tres coma cero cinco');
});

test('Arabic', () => {
  assert.equal(arWords('11'), 'أحد عشر');
  assert.equal(arWords('3000'), 'ثلاثة آلاف');
  assert.equal(arWords('11000'), 'أحد عشر ألفاً');
  assert.equal(arWords('2000'), 'ألفان');
  assert.equal(arWords('200000'), 'مائتا ألف');
  assert.equal(arWords('1500000'), 'مليون وخمسمائة ألف');
  const sar = { one: 'ريال', two: 'ريالان', few: 'ريالات', many: 'ريالاً' };
  const hal = { one: 'هللة', two: 'هللتان', few: 'هللات', many: 'هللة', f: true };
  assert.equal(arCount(1n, sar), 'ريال واحد');
  assert.equal(arCount(2n, sar), 'ريالان');
  assert.equal(arCount(7n, sar), 'سبعة ريالات');
  assert.equal(arCount(7n, hal), 'سبع هللات');
  assert.equal(arCount(15n, sar), 'خمسة عشر ريالاً');
  assert.equal(arCount(15n, hal), 'خمس عشرة هللة');
  assert.equal(arCount(21n, hal), 'إحدى وعشرون هللة');
  assert.equal(arCount(200n, sar), 'مائتا ريال');
  assert.equal(arCount(2000n, sar), 'ألفا ريال');
  assert.equal(arCount(11000n, sar), 'أحد عشر ألف ريال');
  assert.equal(arCount(1000000n, sar), 'مليون ريال');
  assert.equal(
    w('ar', '1234.56', { currency: 'SAR', only: true }),
    'فقط ألف ومائتان وأربعة وثلاثون ريالاً سعودياً وست وخمسون هللة لا غير',
  );
  assert.equal(w('ar', '0.25', { currency: 'SAR' }), 'خمس وعشرون هللة');
  assert.equal(toWords('ar', parseAmount('5.250', true) as Amount, { currency: 'KWD' }), 'خمسة دنانير كويتية ومائتان وخمسون فلساً');
});

test('every example printed on the content pages', () => {
  // src/tools/words/content/es.ts, country table
  assert.equal(w('es', '1234,56', { currency: 'COP' }), 'mil doscientos treinta y cuatro pesos con cincuenta y seis centavos M/CTE');
  assert.equal(w('es', '1234,56', { currency: 'EUR' }), 'mil doscientos treinta y cuatro euros con cincuenta y seis céntimos');
  assert.equal(w('es', '1234,56', { currency: 'CLP' }), 'mil doscientos treinta y cinco pesos');
  assert.equal(w('es', '4.305.017'), 'cuatro millones trescientos cinco mil diecisiete');
  assert.equal(w('es', '12,5'), 'doce coma cinco');
  // en.ts
  assert.equal(w('en', '4,305,017'), 'four million three hundred five thousand seventeen');
  assert.equal(w('en', '1,000,050'), 'one million fifty');
  assert.equal(enWords('1000000', { indian: true }), 'ten lakh');
  assert.equal(enWords('10000000', { indian: true }), 'one crore');
  assert.equal(enWords('1000000000', { indian: true }), 'one hundred crore');
  // ar.ts
  assert.equal(w('ar', '2000', { currency: 'SAR' }), 'ألفا ريال سعودي');
  assert.equal(w('ar', '200', { currency: 'SAR' }), 'مائتا ريال سعودي');
  assert.equal(w('ar', '3000', { currency: 'SAR' }), 'ثلاثة آلاف ريال سعودي');
  assert.equal(w('ar', '12', { currency: 'SAR' }), 'اثنا عشر ريالاً سعودياً');
  assert.equal(w('ar', '0.12', { currency: 'SAR' }), 'اثنتا عشرة هللة');
});
