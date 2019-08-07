const concatWithNewline = (originalText, newText) =>
  `${originalText}
  ${newText}`;

const wrapIn = (wrapper, text) => wrapper + text + wrapper;

module.exports = {
  concatWithNewline,
  wrapIn,
};
