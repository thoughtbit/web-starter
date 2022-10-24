import { onMounted, unref, onBeforeUnmount, watch } from '@mpxjs/core';
import type { Ref } from '@mpxjs/core';

export type EventTypes = keyof WindowEventMap;

export type Options = {
  target?: EventTarget | Ref<EventTarget | undefined>;
} & AddEventListenerOptions;

export const useEventListener = (
  event: EventTypes,
  listener: EventListenerOrEventListenerObject,
  options: Options = {}
) => {
  const { target = window, ...rest } = options;

  const remove = (el: Options['target']) => {
    const _el = unref(el);
    _el && _el.removeEventListener(event, listener, rest);
  };

  const add = (el: Options['target']) => {
    const _el = unref(el);
    _el && _el.addEventListener(event, listener, rest);
  };

  watch(
    () => unref(target),
    (el, prevEl) => {
      remove(prevEl);
      add(el);
    }
  );

  onMounted(() => add(target));
  onBeforeUnmount(() => remove(target));
};

/*
# userEventListener

事件侦听器

## 代码演示

```jsx
import { ref, defineComponent } from 'vue'
import { useEventListener } from '../use-event-listener'

defineComponent({
  setup() {
    const divRef = ref()
    useEventListener(
      'click',
      () => {
        console.log('click')
      },
      divRef
    )

    return () => <div ref={divRef}></div>
  }
})
```

## 类型定义

```ts
export type UseEventListenerOptions = {
  target?: EventTarget | Ref<EventTarget | undefined>
}

const useEventListener = (event: string, listener: EventListener, options: UseEventListenerOptions = {}): void => {}
```

### 参数

| 参数     | 说明                     | 类型            | 默认值 |
| -------- | ------------------------ | --------------- | ------ |
| event    | 监听的事件类型           | _string_        | -      |
| listener | 点击外部时触发的回调函数 | _EventListener_ | -      |
| options  | 可选的配置项             | _Options_       | 见下表 |

### options

| 参数   | 说明     | 类型          | 默认值   |
| ------ | -------- | ------------- | -------- |
| target | 事件目标 | _EventTarget_ | `window` |

*/
