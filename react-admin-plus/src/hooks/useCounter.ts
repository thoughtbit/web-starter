import { useState } from 'react';
import useMemoizedFn from './useMemoizedFn';
import { isNumber } from '@/utils';

export interface Options {
  min?: number;
  max?: number;
}

export interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
}

export type ValueParam = number | ((c: number) => number);

function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  if (isNumber(max)) {
    target = Math.min(max, target);
  }
  if (isNumber(min)) {
    target = Math.max(min, target);
  }
  return target;
}

function useCounter(initialValue: number = 0, options: Options = {}) {
  const { min, max } = options;

  const [current, setCurrent] = useState(() => {
    return getTargetValue(initialValue, {
      min,
      max,
    });
  });

  const setValue = (value: ValueParam) => {
    setCurrent((c) => {
      const target = isNumber(value) ? value : value(c);
      return getTargetValue(target, {
        max,
        min,
      });
    });
  };

  const inc = (delta: number = 1) => {
    setValue((c) => c + delta);
  };

  const dec = (delta: number = 1) => {
    setValue((c) => c - delta);
  };

  const set = (value: ValueParam) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [
    current,
    {
      inc: useMemoizedFn(inc),
      dec: useMemoizedFn(dec),
      set: useMemoizedFn(set),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}

export default useCounter;

/*
# useCounter

管理计数器的 Hook。

## API

```typescript
const [current, {
  inc,
  dec,
  set,
  reset
}] = useCounter(initialValue, { min, max });
```

### Result

| 参数    | 说明         | 类型                                                   |
| ------- | ------------ | ------------------------------------------------------ |
| current | 当前值       | `number`                                               |
| inc     | 加，默认加 1 | `(delta?: number) => void`                             |
| dec     | 减，默认减 1 | `(delta?: number) => void`                             |
| set     | 设置 current | `(value: number` \| `((c: number) => number)) => void` |
| reset   | 重置为默认值 | `() => void`                                           |

### Params

| 参数         | 说明   | 类型     | 默认值 |
| ------------ | ------ | -------- | ------ |
| initialValue | 默认值 | `number` | `0`    |
| min          | 最小值 | `number` | -      |
| max          | 最大值 | `number` | -      |

*/