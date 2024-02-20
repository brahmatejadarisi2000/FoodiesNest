export const debounce = (fn, delay) => {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const SymbolFromCharCode = (CharCode) => String.fromCharCode(CharCode);


export const cleanUrl = (url) => {
  return url.replace(/ /g, ''); // Replace spaces with an empty string
};
