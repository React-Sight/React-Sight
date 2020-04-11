/* eslint import/prefer-default-export: off */
/**
 * Strips name of function from component props
 *
 * @param {func} fn - function
 * @returns {string} function's name
 */
export const parseFunction = (fn) => {
  const string = `${fn}`;

  const match = string.match(/function/);
  if (match == null) return 'fn()';

  const firstIndex = match[0] ? string.indexOf(match[0]) + match[0].length + 1 : null;
  if (firstIndex == null) return 'fn()';

  const lastIndex = string.indexOf('(');
  const fnName = string.slice(firstIndex, lastIndex);
  if (!fnName.length) return 'fn()';
  return `${fnName} ()`;
};
