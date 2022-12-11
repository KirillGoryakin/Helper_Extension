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