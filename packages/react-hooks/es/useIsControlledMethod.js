/**
 * @param {object} props
 * @param {string} propName
 * @return {boolean}isControlledMethod
 */
function useIsControlledMethod(props, propName = 'value') {
  return !!Object.prototype.hasOwnProperty.call(props, propName);
}

export { useIsControlledMethod };
