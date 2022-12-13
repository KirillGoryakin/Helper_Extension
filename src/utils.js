import axios from 'axios';

export const getSelection = () => {
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

  if (
    (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == "number")
  ) {
    
    return {
      text: activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd),
      rect: activeEl.getBoundingClientRect(),
    };

  } else if (window.getSelection) {

    const s = window.getSelection();

    if (s.rangeCount > 0) {
      const oRange = s.getRangeAt(0);
      return {
        text: window.getSelection().toString(),
        rect: oRange.getBoundingClientRect(),
      };
    }

  }
  return null;
};

export const createElementsFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
};

export const getFiatRates = () => {
  const fetchData = () => {
    const URL = 'https://open.er-api.com/v6/latest/USD';
    
    return axios.get(URL)
      .then(({ data }) => {
        const fiatRates = { cacheDate: new Date().toISOString(), data };
        return chrome.storage.local.set({ fiatRates })
          .then(() => fiatRates.data);
      });
  };

  return chrome.storage.local.get(['fiatRates'])
    .then(res => {
      if (!res.fiatRates) return fetchData();

      const { fiatRates: { cacheDate, data } } = res;
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (new Date() - new Date(cacheDate) > ONE_DAY) // If cache is older than 1 day fetch new data
        return fetchData();

      return data;
    });
};

export const getCryptoRates = () => {
  const fetchData = () => {
    const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
    const options = { headers: { 'accept': 'application/json' } };

    return axios.get(URL, options)
      .then(({ data }) => {
        const cryptoRates = { cacheDate: new Date().toISOString(), data };
        return chrome.storage.local.set({ cryptoRates })
          .then(() => cryptoRates.data);
      });
  };

  return chrome.storage.local.get(['cryptoRates'])
    .then(res => {
      if (!res.cryptoRates) return fetchData();

      const { cryptoRates: { cacheDate, data } } = res;
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (new Date() - new Date(cacheDate) > ONE_DAY) // If cache is older than 1 day fetch new data
        return fetchData();

      return data;
  });
};

export const getRates = () =>
  Promise.all([getFiatRates(), getCryptoRates()])
    .then(([fiatRates, cryptoRates]) => ({
      ...fiatRates.rates,
      ...cryptoRates.reduce((a, { symbol, current_price }) => ({
        ...a,
        [symbol.toUpperCase()]: 1 / current_price
      }), {}),
    }));// e.g. { UDS: 1, EUR: 0.949031, BTC: 0.000058 ... }

export const getTranslation = (text) => {
  const options = {
    method: 'POST',
    url: 'https://translo.p.rapidapi.com/api/v3/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Host': 'translo.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY
    },
    data: {
      to: 'ru',
      text
    }
  };

  return axios(options).then(({ data }) => data);
}