import { useLayoutEffect } from 'react';
import { createUpdateEffect } from './createUpdateEffect';

export default createUpdateEffect(useLayoutEffect);

/*
useUpdateLayoutEffect 用法等同于 useLayoutEffect，但是会忽略首次执行，只在依赖更新时执行。
*/