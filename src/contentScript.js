import { createElementsFromHTML, getSelection } from './functions';
import { setHint, hideHint } from './hint/hint';

import hintHTML from './hint/hint.html';
import './hint/hint.scss';

// Inject hint window
document.body.appendChild(createElementsFromHTML(hintHTML));

const calculateButton = document.getElementById('hint_extension__hint--calculate_button');
const currencyButton = document.getElementById('hint_extension__hint--currency_button');
const translateButton = document.getElementById('hint_extension__hint--translate_button');

calculateButton.src = chrome.runtime.getURL('icons/calculator.png');
currencyButton.src = chrome.runtime.getURL('icons/currency.png');
translateButton.src = chrome.runtime.getURL('icons/translate.png');

calculateButton.onclick = (e) => {

};
currencyButton.onclick = (e) => {

};
translateButton.onclick = (e) => {

};

document.onmouseup = (e) => {
  if ( !e.target.id.includes('hint_extension__hint') ){
    const selection = getSelection();

    if (selection && selection.text.trim() && selection.rect)
      setHint(selection);
    else
      hideHint();
  }
};