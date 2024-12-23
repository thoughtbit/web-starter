import { useState } from 'react';
import useMemoizedFn from './useMemoizedFn';

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };

  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  const set = (key: K, entry: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };

  const setAll = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setMap(getInitValue());

  const get = (key: K) => map.get(key);

  return [
    map,
    {
      set: useMemoizedFn(set),
      setAll: useMemoizedFn(setAll),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
      get: useMemoizedFn(get),
    },
  ] as const;
}

export default useMap;

/*
# useMap

管理 Map 类型状态的 Hook。

## API

```typescript
const [
  map,
  {
    set,
    setAll,
    remove,
    reset,
    get
  }
] = useMap(initialValue?: Iterable<[any, any]>);
```

### Result

| 参数   | 说明                  | 类型                                     |
| ------ | --------------------- | ---------------------------------------- |
| map    | Map 对象              | `Map`                                    |
| set    | 添加元素              | `(key: any, value: any) => void`         |
| get    | 获取元素              | `(key: any) => MapItem`                  |
| setAll | 生成一个新的 Map 对象 | `(newMap: Iterable<[any, any]>) => void` |
| remove | 移除元素              | `(key: any) => void`                     |
| reset  | 重置为默认值          | `() => void`                             |

### Params

| 参数         | 说明                        | 类型                   | 默认值 |
| ------------ | --------------------------- | ---------------------- | ------ |
| initialValue | 可选项，传入默认的 Map 参数 | `Iterable<[any, any]>` | -      |
*/