import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAmount, splitMoney, enWords, esWords, frWords, arWords, arCount, toWords, type Amount, type Lang, type WordsOptions } from '../src/tools/words/engine.ts';

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
  assert.equal(parseAmount('0,1234567890123456'), 'too-big');
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

test('French', () => {
  const cases: [string, string][] = [
    ['0', 'zéro'], ['1', 'un'], ['16', 'seize'], ['17', 'dix-sept'], ['21', 'vingt et un'], ['22', 'vingt-deux'],
    ['61', 'soixante et un'], ['70', 'soixante-dix'], ['71', 'soixante et onze'], ['77', 'soixante-dix-sept'],
    ['80', 'quatre-vingts'], ['81', 'quatre-vingt-un'], ['90', 'quatre-vingt-dix'], ['91', 'quatre-vingt-onze'], ['99', 'quatre-vingt-dix-neuf'],
    ['100', 'cent'], ['101', 'cent un'], ['180', 'cent quatre-vingts'], ['200', 'deux cents'], ['201', 'deux cent un'],
    ['1000', 'mille'], ['1200', 'mille deux cents'], ['2000', 'deux mille'], ['21000', 'vingt et un mille'],
    ['80000', 'quatre-vingt mille'], ['200000', 'deux cent mille'], ['1000000', 'un million'],
    ['2000000', 'deux millions'], ['200000000', 'deux cents millions'], ['80000000', 'quatre-vingts millions'],
    ['1000000000', 'un milliard'], ['1000000000000', 'un billion'], ['3200000', 'trois millions deux cent mille'],
  ];
  for (const [n, words] of cases) assert.equal(frWords(n), words, n);
  // Belgium and Switzerland
  assert.equal(frWords('71', { variant: 'be' }), 'septante et un');
  assert.equal(frWords('80', { variant: 'be' }), 'quatre-vingts');
  assert.equal(frWords('92', { variant: 'be' }), 'nonante-deux');
  assert.equal(frWords('81', { variant: 'ch' }), 'huitante et un');
  assert.equal(frWords('80000', { variant: 'ch' }), 'huitante mille');
  // 1990 spelling: hyphens between all numerals, but not around million / milliard (nouns)
  assert.equal(frWords('21', { reform: true }), 'vingt-et-un');
  assert.equal(frWords('1200', { reform: true }), 'mille-deux-cents');
  assert.equal(frWords('3200000', { reform: true }), 'trois millions deux-cent-mille');
  // Money
  assert.equal(w('fr', '1', { currency: 'MAD' }), 'un dirham');
  assert.equal(w('fr', '0', { currency: 'EUR' }), 'zéro euro');
  assert.equal(w('fr', '0,50', { currency: 'EUR' }), 'cinquante centimes');
  assert.equal(w('fr', '1000000', { currency: 'MAD' }), 'un million de dirhams');
  assert.equal(w('fr', '2000000', { currency: 'EUR' }), 'deux millions d’euros');
  assert.equal(w('fr', '2000000', { currency: 'EUR', letterCase: 'title' }), 'Deux Millions d’Euros');
  // French: a lone comma is always the decimal mark
  const fr = (s: string, o: Partial<WordsOptions> = {}) => toWords('fr', parseAmount(s, false, true) as Amount, { currency: '', letterCase: 'lower', ...o });
  assert.equal(fr('1,005', { currency: 'EUR' }), 'un euro et un centime');
  assert.equal(fr('1,234'), 'un virgule deux cent trente-quatre');
  assert.equal(fr('1 234,56', { currency: 'MAD' }), 'mille deux cent trente-quatre dirhams et cinquante-six centimes');
  // Spot checks from review
  assert.equal(frWords('280000'), 'deux cent quatre-vingt mille');
  assert.equal(frWords('1000080'), 'un million quatre-vingts');
  assert.equal(frWords('99999'), 'quatre-vingt-dix-neuf mille neuf cent quatre-vingt-dix-neuf');
  assert.equal(frWords('200080000'), 'deux cents millions quatre-vingt mille');
  assert.equal(frWords('380000', { reform: true }), 'trois-cent-quatre-vingt-mille');
  assert.equal(frWords('380000000', { reform: true }), 'trois-cent-quatre-vingts millions');
  assert.equal(frWords('180000', { variant: 'ch' }), 'cent huitante mille');
  assert.equal(frWords('91', { variant: 'be' }), 'nonante et un');
  assert.equal(w('fr', '21000000', { currency: 'EUR' }), 'vingt et un millions d’euros');
  assert.equal(w('fr', '0.01', { currency: 'EUR' }), 'un centime');
  assert.equal(w('fr', '0.49', { currency: 'XOF' }), 'zéro franc CFA');
  assert.equal(w('fr', '2.5', { currency: 'XOF' }), 'trois francs CFA');
  assert.equal(toWords('fr', parseAmount('0,9995', true) as Amount, { currency: 'TND', letterCase: 'lower' }), 'un dinar');
  assert.equal(w('fr', '1000000', { currency: 'XOF' }), 'un million de francs CFA');
  assert.equal(w('fr', '1200', { currency: 'EUR', letterCase: 'title' }), 'Mille Deux Cents Euros');
  assert.equal(w('fr', '-3,05'), 'moins trois virgule zéro cinq');
  assert.equal(toWords('fr', parseAmount('12,500', true) as Amount, { currency: 'TND', letterCase: 'lower' }), 'douze dinars et cinq cents millimes');
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
  // fr.ts
  assert.equal(w('fr', '4 305 017'), 'quatre millions trois cent cinq mille dix-sept');
  assert.equal(w('fr', '1234,56', { currency: 'MAD' }), 'mille deux cent trente-quatre dirhams et cinquante-six centimes');
  assert.equal(w('fr', '1234,56', { currency: 'EUR' }), 'mille deux cent trente-quatre euros et cinquante-six centimes');
  assert.equal(w('fr', '1234,56', { currency: 'CHF', frVariant: 'ch' }), 'mille deux cent trente-quatre francs et cinquante-six centimes');
  assert.equal(w('fr', '1234,56', { currency: 'XOF' }), 'mille deux cent trente-cinq francs CFA');
  assert.equal(w('fr', '1234,56', { currency: 'CAD' }), 'mille deux cent trente-quatre dollars et cinquante-six cents');
  assert.equal(w('fr', '297', { frVariant: 'be' }), 'deux cent nonante-sept');
  assert.equal(w('fr', '297'), 'deux cent quatre-vingt-dix-sept');
  assert.equal(w('fr', '1291', { reform: true }), 'mille-deux-cent-quatre-vingt-onze');
  assert.equal(w('fr', '12,5'), 'douze virgule cinq');
  assert.equal(w('fr', '3,05'), 'trois virgule zéro cinq');
  assert.equal(w('fr', '2 500 000'), 'deux millions cinq cent mille');
  assert.equal(w('fr', '80', { currency: 'EUR' }), 'quatre-vingts euros');
  assert.equal(w('fr', '200', { currency: 'MAD' }), 'deux cents dirhams');
  assert.equal(w('fr', '3000', { currency: 'MAD' }), 'trois mille dirhams');
  assert.equal(w('fr', '1000000', { currency: 'EUR' }), 'un million d’euros');
  assert.equal(frWords('203', { reform: true }), 'deux-cent-trois');
  assert.equal(frWords('85'), 'quatre-vingt-cinq');
  assert.equal(frWords('83'), 'quatre-vingt-trois');
  // Belgium / Switzerland table
  const table: [string, string, string, string][] = [
    ['70', 'soixante-dix', 'septante', 'septante'],
    ['71', 'soixante et onze', 'septante et un', 'septante et un'],
    ['80', 'quatre-vingts', 'quatre-vingts', 'huitante'],
    ['90', 'quatre-vingt-dix', 'nonante', 'nonante'],
    ['97', 'quatre-vingt-dix-sept', 'nonante-sept', 'nonante-sept'],
  ];
  for (const [n, fr, be, ch] of table) {
    assert.equal(frWords(n), fr);
    assert.equal(frWords(n, { variant: 'be' }), be);
    assert.equal(frWords(n, { variant: 'ch' }), ch);
  }
});
