import { renderHook, act } from '@testing-library/react-hooks';
import { useIsControlledMethod } from './useIsControlledMethod';

describe('useIsControlledMethod', () => {

  test('not have value prop', () => {
    const {
      result,
    } = renderHook(
      ({ props, propName }) => useIsControlledMethod(props, propName),
      {
        initialProps: {
          props: {},
        },
      },
    );

    expect(result.current).toBe(false);
  });

  test('have value prop', () => {
    const {
      result,
    } = renderHook(
      ({ props, propName }) => useIsControlledMethod(props, propName),
      {
        initialProps: {
          props: {
            value: undefined,
          },
        },
      },
    );

    expect(result.current).toBe(true);
  });

  test('make other prop to value prop', () => {
    const {
      result,
    } = renderHook(
      ({ props, propName }) => useIsControlledMethod(props, propName),
      {
        initialProps: {
          props: {
            checked: undefined,
          },
          propName: 'checked',
        },
      },
    );

    expect(result.current).toBe(true);
  });

});