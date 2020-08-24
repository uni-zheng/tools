import { useCallback, useMemo, useRef, useState } from 'react';

function useControlled(options) {
  const {
    props,
    propName = 'value',
  } = options;

  const defaultPropName = useMemo(() => {
    return getDefaultPropName(propName);
  }, [propName]);

  const { current: isControlledMethod } = useRef(Object.prototype.hasOwnProperty.call(props, propName));
  const { current: defaultValue } = useRef(props[defaultPropName]);
  const [value, setValue] = useState(defaultValue);

  const returnedValue = (
    isControlledMethod
      ? (
        props[propName] !== undefined
          ? props[propName]
          : defaultValue
      )
      : value
  );

  const setValueIfUncontrolled = useCallback((...rest) => {
    if (!isControlledMethod) {
      setValue(...rest);
    }
  }, []);

  return {
    value: returnedValue,
    setValueIfUncontrolled,
    isControlledMethod,
  };

  function getDefaultPropName(propName) {
    const [firstLetter, ...restLetterList] = propName;

    return `default${firstLetter.toUpperCase()}${restLetterList.join('')}`;
  }
}

export { useControlled };