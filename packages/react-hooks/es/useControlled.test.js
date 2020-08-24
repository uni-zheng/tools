import { act, renderHook } from '@testing-library/react-hooks';
import { useControlled } from './useControlled';

describe('useControlled', () => {

  test('element with uncontroll method', () => {
    const {
      result,
      rerender,
    } = renderHook(
      ({ props, propName }) => useControlled({
        props,
        propName,
      }),
      {
        initialProps: {
          props: {
            defaultValue: 'foo',
          },
        },
      },
    );

    // 当初使用 defaultValue 初始化后，得到默认值
    expect(result.current.value).toBe('foo');
    expect(result.current.isControlledMethod).toBe(false);

    // 初始化后，再传入 value，无法改变受控模式并且值不会改变
    {
      rerender({
        props: {
          defaultValue: 'foo',
          value: 'value',
        },
      });

      expect(result.current.value).toBe('foo');
      expect(result.current.isControlledMethod).toBe(false);
    }

    // 当后续 defaultValue 产生变化，返回值仍然是第一次的值
    {
      rerender({
        props: {
          defaultValue: 'bar',
        },
      });

      expect(result.current.value).toBe('foo');
    }

    // 可以使用返回的 setValue 更新值
    {
      act(() => {
        result.current.setValueIfUncontrolled('bar');
      });

      expect(result.current.value).toBe('bar');
    }
  });

  test('init with value & defaultValue', () => {
    // 同时使用 value 和 defaultValue 初始化
    // 但 value 没有初始值 会优先使用 defaultValue
    {
      const {
        result,
      } = renderHook(
        ({ props, propName }) => useControlled({
          props,
          propName,
        }),
        {
          initialProps: {
            props: {
              defaultValue: 'foo',
              value: undefined,
            },
          },
        },
      );

      expect(result.current.value).toBe('foo');
      expect(result.current.isControlledMethod).toBe(true);
    }

    // 同时使用 value 和 defaultValue 初始化
    {
      const {
        result,
      } = renderHook(
        ({ props, propName }) => useControlled({
          props,
          propName,
        }),
        {
          initialProps: {
            props: {
              defaultValue: 'foo',
              value: null,
            },
          },
        },
      );

      expect(result.current.value).toBe(null);
      expect(result.current.isControlledMethod).toBe(true);
    }

  });

  test('element with controll method', () => {
    const {
      result,
      rerender,
    } = renderHook(
      ({ props, propName }) => useControlled({
        props,
        propName,
      }),
      {
        initialProps: {
          props: {
            value: 'foo',
          },
        },
      },
    );

    expect(result.current.value).toBe('foo');
    expect(result.current.isControlledMethod).toBe(true);

    // 改变 value 后，返回值也会变化
    {
      rerender({
        props: {
          value: 'bar'
        }
      })

      expect(result.current.value).toBe('bar');
    }

    // 使用返回的 setValue，无法改变 value
    {
      act(() => {
        result.current.setValueIfUncontrolled('foo again')
      })

      expect(result.current.value).toBe('bar');
    }
  });
});