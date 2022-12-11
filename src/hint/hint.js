import { tryCalculate, tryConvertCurrency } from "./tryActions";

export const setHint = ({ text, rect }) => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  const setContent = (content) => hintContent.innerHTML = content;

  const showHint = () => {
    hintEl.classList.remove('hidden');
    hintEl.style.cssText = `
    top: ${rect.bottom + window.scrollY}px;
    left: ${rect.left + window.scrollX + rect.width / 2}px;
  `;
  }
  
  if (tryCalculate(text, res => setContent(res)))
    showHint();
  else if (tryConvertCurrency(text, res => setContent(res)))
    showHint();
  else
    return;
};

export const hideHint = () => {
  const hintEl = document.getElementById('hint_extension__hint');
  const hintContent = document.getElementById('hint_extension__hint--content');

  hintEl.classList.add('hidden');
  hintContent.innerHTML = '';
};