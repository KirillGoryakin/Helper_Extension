
export const loadingElement = () => {
  const loadingGif = chrome.runtime.getURL('gifs/loading.gif');
  return `
    <div class="hint_loading hint_extension--element">
      <img src="${loadingGif}" alt="Loading..." />
    </div>
  `;
};

export const greySpan = (content) => 
  `<span class="hint_grey hint_extension--element">${content}</span>`;

export const currencyNameDiv = (content) =>
  `<div class="hint_currency_name hint_extension--element">${content}</div>`;

export const textSpan = (content) =>
  `<div class="hint_text hint_extension--element">${content}</div>`;