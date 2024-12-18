import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import useLatest from './useLatest';
import { isNumber } from '@/utils';

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (target?: TDate) => {
  if (!target) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountdown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};

  const target = useMemo<TDate>(() => {
    if ('leftTime' in options) {
      return isNumber(leftTime) && leftTime > 0 ? Date.now() + leftTime : undefined;
    } else {
      return targetDate;
    }
  }, [leftTime, targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;

/*
# useCountDown

**说明**

useCountDown 的精度为毫秒，可能会造成以下几个问题

- 即使设置 interval 时间为 1000 毫秒，useCountDown 每次更新间隔也**不一定**正好是 1000 毫秒，而是 1000 毫秒左右。
- 在第二个 demo 中，countdown 开始一般是 499x 毫秒，因为程序执行有延迟。

如果你的精度只要到秒就好了，可以这样用 `Math.round(countdown / 1000)`。

如果同时传了 `leftTime` 和 `targetDate`，则会忽略 `targetDate`，以 `leftTime` 为主

## API

```typescript
type TDate = Date | number | string | undefined;

interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const [countdown, formattedRes] = useCountDown(
  {
    leftTime,
    targetDate,
    interval,
    onEnd
  }
);
```

### Params

| 参数       | 说明                 | 类型         | 默认值 |
| ---------- | -------------------- | ------------ | ------ |
| leftTime   | 剩余时间（毫秒）     | `number`     | -      |
| targetDate | 目标时间             | `TDate`      | -      |
| interval   | 变化时间间隔（毫秒） | `number`     | `1000` |
| onEnd      | 倒计时结束触发       | `() => void` | -      |

### Result

| 参数         | 说明                 | 类型           |
| ------------ | -------------------- | -------------- |
| countdown    | 倒计时时间戳（毫秒） | `number`       |
| formattedRes | 格式化后的倒计时     | `FormattedRes` |

*/