import { currencyNameDiv, greySpan, textSpan } from "./hintElements";
import { tryCalculate, tryConvertCurrency, tryTransalte } from "./tryActions";

export const setHint = async ({ text, rect }) => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  const setContent = (content) => hintContent.innerHTML = content;

  const showHint = (isFullSize = false) => {
    hintEl.classList.remove('hidden');
    if(isFullSize) hintEl.classList.remove('small');
    hintEl.style.cssText = `
      top: ${rect.bottom + window.scrollY}px;
      left: ${rect.left + window.scrollX + rect.width / 2}px;
    `;
  };
  
  const calculated = await tryCalculate(text,
    res => setContent(`${greySpan('=')} ${res}`));
  if (calculated) { showHint(true); return; }

  const currencyConverted = await tryConvertCurrency(
    text, (curr, res) =>
      setContent(`
          ${currencyNameDiv(curr.name)}
          ${greySpan('~')} ${res}
        `));
  if (currencyConverted) { showHint(true); return; };

  const translated = await tryTransalte(text,
    res => setContent(textSpan(res.replace('\n', '<br/>'))));
  if (translated) { showHint(true); return; }
  
  showHint();
};

export const hideHint = () => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  hintEl.classList.add('hidden', 'small');
  hintContent.innerHTML = '';
};