import stringMath from 'string-math';
import { mostTraded, crypto } from './currency-list.json';
import { getRates, getRatesCacheDate, getTranslation } from '../utils';

export const tryCalculate = (text, cb) => {
  const isEquation =
    /[\+\-\/\*](?=\s*\.?\d+)/g.test(text) && // Includes +, -, /, or * which has a digit after it
    /^(\.?|-?)\d/g.test(text.trim());        // First char is (. or - with) digit
  
  if(!isEquation) return false;

  try {
    const res = stringMath(text);
    cb(res);
    return true;
  } catch {
    return false;
  }
};

export const tryConvertCurrency = async (text, cb) => {
  const currList = mostTraded.concat(crypto);
  
  const isPrice =
    text.replace(/\s/g, '').length <= 20 &&
    /\d/g.test(text) &&           // Includes digits
    currList.some(curr =>         // Includes currency symbol or code
      text.includes(curr.code) ||
      text.includes(curr.symbol)
    );

  if (!isPrice) return false;

  cb(null);
  
  try {
    const rates = await getRates();
    const cacheDate =
      new Date(await getRatesCacheDate())
      .toLocaleString()
      .replace(/\//g, '.');
    
    const curr = currList.find(curr => 
      text.includes(curr.code) ||
      text.includes(curr.symbol)
    );

    const clean = (x) => x
      .replace(/[^\d.,]/g, '')         // Remove any character except digits . and ,
      .replace(/[,.](?=\d{3}\b)/g, '') // Remove . and , which have 3 digist after it
      .replace(',', '.');              // Replace , with .
    
    const convert = (x) => 
      curr.code === 'USD' ?
      x * rates.RUB :
      x / rates[curr.code] * rates.RUB;

    const { format } = new Intl.NumberFormat(
      navigator.language,
      { style: 'currency', currency: 'RUB' }
    );

    const res = format(convert(clean(text)));
    cb(res, curr, cacheDate);
    return true;
  } catch {
    return false;
  }
};

export const tryTransalte = async (text, cb) => {
  const isText = 
    /\p{L}/u.test(text) &&                    // Includes any letters
    text.replace(/\s{2,}/g, '').length < 500; // Length < 500

  if (!isText) return false;
  
  cb(null);

  try {
    const clean = (x) => x.trim().replace(/\s{2,}/g, '');
    
    const { translated_text: res } = await getTranslation(clean(text));
    cb(res.replace('\n', '<br />'));
    
    return true;
  } catch {
    return false;
  }
};  