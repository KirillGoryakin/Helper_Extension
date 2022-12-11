import { createElementsFromHTML, getSelection } from './functions';
import { setHint, hideHint } from './hint/hint';

import hintHTML from './hint/hint.html';
import './hint/hint.scss';

document.body.appendChild(createElementsFromHTML(hintHTML));

document.onmouseup = (e) => {
  if ( !e.target.id.includes('hint_extension__hint') ){
    const selection = getSelection();

    if (selection && selection.text.trim() && selection.rect)
      setHint(selection);
    else
      hideHint();
  }
};