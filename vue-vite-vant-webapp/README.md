# moocss
### [1. Mock 支持](https://github.com/vbenjs/vite-plugin-mock)

在根目录下的 `mocks` 目录下，可以在模块中导出默认的 `api` 资源。

例如 `mocks` 内导出
```ts
import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/api/get',
        method: 'get',
        response: () => {
            return {
                code: 0,
                data: {
                    name: 'vben'
                }
            }
        }
    }
] as MockMethod[]
```
在 `src` 中就可以进行模拟请求。

```html
<script setup lang="ts">
    import { useRequest } from "vue-request"
    // 请求接口 /api/get
    const { data, loading, error } = useRequest('/api/get') 
</script>

<template>
    <div>data: {{data}}</div>
    <div>loading: {{loading}}</div>
    <div>error: {{error}}</div>
</template>
```

这里用到 [vue-request](https://cn.attojs.org/) 去做请求，不过因为该 `mock` 拦截的是一整个接口，所以换成 `axios` 等请求库也是可以的。  

