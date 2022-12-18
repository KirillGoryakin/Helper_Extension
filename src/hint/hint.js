import { getOptions } from "../utils";
import {
  currencyNameDiv,
  greySpan,
  loadingElement,
  subText,
  textSpan
} from "./hintElements";
import { tryCalculate, tryConvertCurrency, tryTransalte } from "./tryActions";

export const setHint = async ({ text, rect }) => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');
  const options = await getOptions();

  const showHint = () => {
    hintEl.classList.remove('hidden');
    hintEl.style.cssText = `
      top: ${rect.bottom + window.scrollY}px;
      left: ${rect.left + window.scrollX + rect.width / 2}px;
    `;
  };
  
  const setContent = (content, doShowHint = false) => {
    hintContent.innerHTML = content;
    if(doShowHint) showHint();
  };
  
  if (options['calculating.enable']){
    const done = await tryCalculate(text,
      res => setContent(`${greySpan('=')} ${res}`, true));
    if (done) return;
  }

  if (options['currency.enable']){
    const done = await tryConvertCurrency(
      text, (res, curr, cacheDate) =>
      setContent(res ? `
          ${currencyNameDiv(curr.name)}
          ${greySpan('~')} ${res}
          ${subText(`Last updated: ${cacheDate}`)}
        ` : loadingElement(), true));
    if (done) return;
  }

  if (options['translation.enable']){
    const done = await tryTransalte(text,
      res => setContent(res ? textSpan(res) : loadingElement(), true));
    if (done) return;
  }
};

export const hideHint = () => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  hintEl.classList.add('hidden');
  hintContent.innerHTML = '';
};