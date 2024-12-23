import throttle from 'lodash/throttle';
import { useMemo } from 'react';
import useLatest from './useLatest';
import useUnmount from './useUnmount';

type noop = (...args: any[]) => any;
type ThrottleOptions = {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
};
function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;

/*
# useThrottleFn

用来处理函数节流的 Hook。

## 代码演示

### 基础用法
```
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useThrottleFn(
    () => {
      setValue(value + 1);
    },
    { wait: 500 },
  );

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type="button" onClick={run}>
        Click fast!
      </button>
    </div>
  );
};
```

## API

```typescript
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| 参数    | 说明           | 类型                      | 默认值 |
| ------- | -------------- | ------------------------- | ------ |
| fn      | 需要节流的函数 | `(...args: any[]) => any` | -      |
| options | 配置节流的行为 | `Options`                 | -      |

### Options

| 参数     | 说明                     | 类型      | 默认值 |
| -------- | ------------------------ | --------- | ------ |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000` |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `true` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true` |

### Result

| 参数   | 说明                               | 类型                      |
| ------ | ---------------------------------- | ------------------------- |
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前节流                       | `() => void`              |
| flush  | 当前节流立即调用                   | `() => void`              |

*/