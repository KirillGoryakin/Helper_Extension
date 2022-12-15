import { getOptions } from "../utils";
import { currencyNameDiv, greySpan, textSpan } from "./hintElements";
import { tryCalculate, tryConvertCurrency, tryTransalte } from "./tryActions";

export const setHint = async ({ text, rect }) => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  const showHint = (isFullSize = false) => {
    hintEl.classList.remove('hidden');
    if (isFullSize) hintEl.classList.remove('small');
    hintEl.style.cssText = `
      top: ${rect.bottom + window.scrollY}px;
      left: ${rect.left + window.scrollX + rect.width / 2}px;
    `;
  };
  
  const setContent = (content, doShowHint = false) => {
    hintContent.innerHTML = content;
    if(doShowHint) showHint(true);
  };
  
  const options = await getOptions();
  
  if (options['calculating.enable']){
    const done = await tryCalculate(text,
      res => setContent(`${greySpan('=')} ${res}`, true));
    if (done) return;
  }

  if (options['currency.enable']){
    const done = await tryConvertCurrency(
      text, (curr, res) =>
      setContent(`
          ${currencyNameDiv(curr.name)}
          ${greySpan('~')} ${res}
        `, true));
    if (done) return;
  }

  if (options['translation.enable']){
    const done = await tryTransalte(text,
      res => setContent(textSpan(res), true));
    if (done) return;
  }
  
  showHint();
};

export const hideHint = () => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  hintEl.classList.add('hidden', 'small');
  hintContent.innerHTML = '';
};