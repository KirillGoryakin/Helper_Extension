import stringMath from 'string-math';
import { mostTraded, crypto } from '../../public/currency-list.json';
import { rates as fiatRates } from '../../public/USD.json';
import cryptoRates from '../../public/CRYPTO.json';

export const tryCalculate = (text, cb) => {
  const isEquation =
    /(?!\d+\s*)[\+\-\/\*](?=\s*\d+)/g.test(text);
  
  if(!isEquation) return false;

  try {
    const res = stringMath(text);
    cb(res);
    return true;
  } catch {
    return false;
  }
};

export const tryConvertCurrency = (text, cb) => {
  const currList = mostTraded.concat(crypto);
  const rates = {
    ...fiatRates,
    ...cryptoRates.reduce((a, { symbol, current_price }) => ({
      ...a,
      [symbol.toUpperCase()]: 1 / current_price
    }), {})
  };
  
  const isPrice =
    text.replace(/\s/g, '').length <= 18 &&
    /\d/g.test(text) && // Includes digits
    currList.some(curr => text.includes(curr.symbol)); // Includes currency symbol

  if (!isPrice) return false;

  try {
    const curr = currList.find(curr => text.includes(curr.symbol));

    const clean = (x) => x
      .replace(/[^\d.,]/g, '') // Remove any character except digits . and ,
      .replace(/[,.](?=\d{3})/g, '') // Remove . and , which have 3 digist after it
      .replace(/,(?=\d{2})/g, '.'); // Replace , which has 2 digist after it with .
    
    const convert = (x) => 
      curr.code === 'USD' ?
      x * rates.RUB :
      x / rates[curr.code] * rates.RUB;

    const { format } = new Intl.NumberFormat(
      navigator.language,
      { style: 'currency', currency: 'RUB' }
    );

    const res = format(convert(clean(text)));
    cb(res);
    return true;
  } catch {
    return false;
  }
};