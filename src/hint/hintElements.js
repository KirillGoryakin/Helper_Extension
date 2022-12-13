
export const loadingElement = () => {
  const loadingGif = chrome.runtime.getURL('gifs/loading.gif');
  return `
    <div class="hint_loading hint_extension">
      <img src="${loadingGif}" alt="Loading..." />
    </div>
  `;
};

export const greySpan = (content) => 
  `<span class="grey hint_extension">${content}</span>`;

export const currencyNameDiv = (content) =>
  `<div class="hint_currency_name hint_extension">${content}</div>`;

export const textSpan = (content) =>
  `<div class="hint_text hint_extension">${content}</div>`;