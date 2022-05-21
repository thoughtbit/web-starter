# 建立父子组件之间的关联关系，进行数据通信和方法调用，基于 provide 和 inject 实现。

## 

```js
//parent.vue

import { ref } from 'vue'
import { useChildren } from '../use-relation'

const READONLY_KEY = 'componentsKey'

export default {
  setup() {
    const { children, provider } = useChildren(READONLY_KEY)
    const count = ref(0)
    const addCount = (count.value += 1)
    provider({ count, addCount })
  }
}
```

```javascript

//child.vue

import { useParent } from '../use-relation'

const READONLY_KEY = 'componentsKey'

export default {
  setup() {
    const { index, parent } = useParent(READONLY_KEY)
    const { count, addCount } = parent
    onMounted(() => {
      // 调用父组件提供的数据和方法
      addCount()
      console.log(count.value) // -> 1
    }),
  },
}
```


## API

### 类型定义

```ts
function useParent<T>(key: string | symbol): {
  parent?: T;
  index?: Ref<number>;
};

function useChildren(key: string | symbol): {
  children: ComponentPublicInstance[];
  provider: (value: any) => void;
};
```

### useParent 返回值

| 参数   | 说明                                         | 类型           |
| ------ | -------------------------------------------- | -------------- |
| parent | 父组件提供的值                               | _any_          |
| index  | 当前组件在父组件的所有子组件中对应的索引位置 | _Ref\<number>_ |

### useChildren 返回值

| 参数         | 说明                 | 类型                        |
| ------------ | -------------------- | --------------------------- |
| children     | 子组件列表           | _ComponentPublicInstance[]_ |
| provider     | 向子组件提供值的方法 | _(value: any) => void_      |
