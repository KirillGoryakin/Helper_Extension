import { createElementsFromHTML, getSelection } from './utils';
import { setHint, hideHint } from './hint/hint';

import hintHTML from './hint/hint.html';
import './hint/hint.scss';

// Inject hint window
document.body.appendChild(createElementsFromHTML(hintHTML));

document.onmouseup = (e) => {
  if (!e.target.classList.contains('hint_extension--element')){
    const selection = getSelection();

    if (selection && selection.text.trim() && selection.rect)
      setHint(selection);
    else
      hideHint();
  }
};