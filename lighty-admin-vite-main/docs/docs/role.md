# 概述

如何通过用户的角色字段进行页面级别的权限控制（动态路由的挂载）；通过角色字段进行内容级别的权限控制（权限函数、权限指令）

# 页面权限

## 动态路由

`@/router/index.ts` 就是用来存放常驻路由和动态路由的文件
不管什么情况下，都需要挂载的路由，我们就存放在 constantRoutes 数组下，比如登录页、首页；

需要用户登录并根据角色字段来判断是否有权限的路由，我们就放在 `asyncRoutes` 数组下，并且要为该路由配置好 `roles` 和 `name` 属性

下面源码就是项目中写好的一个动态路由示例，注意看它是有 roles 和 name 属性的：

```js
{
  path: "/permission",
  component: Layout,
  redirect: "/permission/page",
  name: "Permission", // 不要忘了写
  meta: {
    title: "权限管理",
    svgIcon: "lock",
    roles: ["admin", "editor"], // 可以在根路由中设置角色
    alwaysShow: true // 将始终显示根菜单
  },
  children: [
    {
      path: "page",
      component: () => import("@/views/permission/page.vue"),
      name: "PagePermission", // 不要忘了写
      meta: {
        title: "页面权限",
        roles: ["admin"] // 或者在子导航中设置角色
      }
    },
    {
      path: "directive",
      component: () => import("@/views/permission/directive.vue"),
      name: "DirectivePermission", // 不要忘了写
      meta: {
        title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
      }
    }
  ]
}

```

因此使用 admin 账号登录时可以看见`页面权限`与`指令权限`
使用 editor 账号登录时只能看见指令

## 开启动态路由功能

项目默认是开启状态
写好了动态路由后，在 `@/config/async-route.ts` 文件中可以找到是否开启动态路由的开关，源码如下，只需要将下面代码中的 `asyncRouteSettings.open` 设置为 `true` 就可以开启动态路由功能,开启以后，主要是作用于路由守卫`@/router/permission.ts`中的这样一段代码：

```ts
if (asyncRouteSettings.open) {
  // 注意：角色必须是一个数组！ 例如: ['admin'] 或 ['developer', 'editor']
  await userStore.getInfo()
  const roles = userStore.roles
  // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
  permissionStore.setRoutes(roles)
} else {
  // 没有开启动态路由功能，则启用默认角色
  userStore.setRoles(asyncRouteSettings.defaultRoles)
  permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
}
```

如果开启该功能，那么通过用户详情接口拿到用户角色数组后，根据角色去过滤动态路由，然后再通过 `router.addRoute()` 挂载过滤之后的动态路由

## 关闭动态路由功能

假如，你选择关闭动态路由功能，那么你需要记得将所有路由都写在常驻路由数组里面（虽然写在动态路由数组里也行，因为程序兼容了这种偷懒）

# 内容权限

## 权限函数

`@/utils/permission.ts` 文件里，有一个 `checkPermission` 权限判断函数：

```ts
import { useUserStoreHook } from "@/store/modules/user"

/** 权限判断函数 */
export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useUserStoreHook().roles
    const permissionRoles = value
    return roles.some((role) => {
      return permissionRoles.includes(role)
    })
  } else {
    console.error("need roles! Like checkPermission(['admin','editor'])")
    return false
  }
}
```

向该函数传递一个权限数组，然后它会去对比当前登录用户的角色数组，如果能匹配上，就返回 true

使用方法简单，checkPermission 函数配合 v-if 即可：

```ts
// 引入
import { checkPermission } from "@/utils/permission"

// 使用
;<el-button v-if="checkPermission(['admin'])">按钮</el-button>
```

更多详细的使用案例，可见 `@/views/permission/directive.vue `页面

## 权限指令

`@/directives/permission/index.ts` 文件里，写好了权限判断指令` v-permission`：

```ts
import { type Directive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"

/** 权限指令 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles = useUserStoreHook().roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = "none"
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
```

向该指令传递一个权限数组，然后它会去对比当前登录用户的角色数组，如果不能匹配上，就通过` CSS style.display = "none"` 将其隐藏
`v-permission` 已经通过 `app.directive() `挂载完成，可以直接在 template 中直接使用：

```ts
<el-button v-permission="['admin']">按钮</el-button>
```
