import { useMemo, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}

export default useMemoizedFn;

/*
# useMemoizedFn

持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。

在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。

```js
const [state, setState] = useState('');

// 在 state 变化时，func 地址会变化
const func = useCallback(() => {
  console.log(state);
}, [state]);
```

使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。

```js
const [state, setState] = useState('');

// memoizedFn 地址永远不会变化,  `memoizedFn` 是不会变化的，`callbackFn` 在 count 变化时变化。
const memoizedFn = useMemoizedFn(() => {
  console.log(state);
});
```

## API

```typescript
const fn = useMemoizedFn<T>(fn: T): T;
```

### Result

| 参数 | 说明                      | 类型                      |
| ---- | ------------------------- | ------------------------- |
| fn   | 引用地址永远不会变化的 fn | `(...args: any[]) => any` |

### Params

| 参数 | 说明             | 类型                      | 默认值 |
| ---- | ---------------- | ------------------------- | ------ |
| fn   | 需要持久化的函数 | `(...args: any[]) => any` | -      |

*/