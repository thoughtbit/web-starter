# 概述

基于哪些主流的社区规范来开发的，并做了哪些和代码规范相关的配置。

# 命名规范

[Vue 风格指南](https://v2.cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E5%90%8D%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90 "https://v2.cn.vuejs.org/v2/style-guide/#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E5%90%8D%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90")
单文件组件文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)

## Components

所有的 Component，也就是组件，都采用单词大写开头的 大驼峰 命名方式 (PascalCase)。

比如在 @/components 目录下的公共组件：

      @/components/Screenfull/index.vue
      @/components/SvgIcon/index.vue
      @/components/ThemeSwitch/index.vue

看上面的例子，也就是说，如果是 index.vue，那么 `index.vue 是不用大驼峰命名` 的。

如果不是 index.vue，比如下面这个 NotifyList.vue 组件，那么就需要 大驼峰 命名：

    @/components/Notify/index.vue
    @/components/Notify/NotifyList.vue

即便是在 views 目录下只属于某个页面的组件，也同样需要遵守大驼峰命名：

    @/views/error-page/components/ErrorPageLayout.vue
    @/views/permission/components/SwitchRoles.vue

## Views

放在` @/views` 目录下代表着页面和路由的 .vue 文件或目录，它们一律采用 短横线连接 (kebab-case) 的命名方式，比如：

    @/views/table/element-plus/index.vue
    @/views/table/vxe-table/index.vue

主要因为：

    能更好的区分 Component 和 View
    导入 Component 时，采用的就是大驼峰方式
    符合社区主流命名习惯

## Hooks / Composables

采用 小驼峰 (camelCase)，比如：

    @/hooks/useTheme.ts
    @/layout/hooks/useResize.ts

## Props

在声明 prop 的时候，其命名应该始终采用 小驼峰 (camelCase)，而在模板和 JSX 中应该始终使用 短横线连接 (kebab-case)，比如：
以`@/components/Screenfull/index.ts`组件为例：
声明定义 Props

```ts
const props = defineProps({
  /** 全屏的元素，默认是 html */
  element: {
    type: String,
    default: "html"
  },
  /** 打开全屏提示语 */
  openTips: {
    type: String,
    default: "全屏"
  },
  /** 关闭全屏提示语 */
  exitTips: {
    type: String,
    default: "退出全屏"
  }
})
```

在 `@/layout/components/NavigationBar/index.ts` 模板中使用该组件并向 Props 传递数据

```html
<Screenfull v-if="showScreenfull" element=".app-main" open-tips="内容区全屏" class="screenfull" />
```

# Git 提交规范

    feat: 增加新的业务功能
    fix: 修复业务问题/BUG
    perf: 优化性能
    style: 更改代码风格, 不影响运行结果
    refactor: 重构代码
    revert: 撤销更改
    test: 测试相关, 不涉及业务代码的更改
    docs: 文档和注释相关
    chore: 更新依赖/修改脚手架配置等琐事
    workflow: 工作流改进
    ci: 持续集成相关
    types: 类型定义文件更改
    wip: 开发中

# 注释规范

由于项目采用 TS 5.x 进行开发，为了获得更好的 TS 提示，项目采用了大量的 /\*_ xxx _/ 注释，它的优点就是鼠标放上去会有注释显示出来

# 代码校验与格式化

项目已经配好了一套格式化校验规则和流程，是基于`eslint + prettier + husky + lint-staged`这四个依赖的。

# 项目配置

## ESlint

- `package.json` 文件的 `devDependencies` 中有所需的 ESlint 依赖包
- `ESlint` 的**配置文件**是根目录下的 `.eslintrc.js`，它里面定义了很多校验规则
- `ESlint` 的**忽略文件**是根目录下的 `.eslintignore`，它里面定义的目录和文件都不会被 ESlint 检查

## Prettier

- `package.json` 文件的 `devDependencies` 中有所需的 Prettier 依赖包
- `Prettier` 的**配置文件**是根目录下的 `prettier.config.js`，它里面定义了很多格式化规则
- `Prettier` 的**忽略文件**是根目录下的 `.prettierignore`，它里面定义的目录和文件都不会被 Prettier 格式化

# 自动校验和格式化

我已经在 `.vscode/settings.json` 配置文件中写好了自动格式化规则（只要你下载本项目，就会优先采用该规则）
其中比较重要的就是在保存代码时，自动进行 ESlint 修复代码：

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}

```

并且在 ESlint 的 .eslintrc.js 配置文件中，我们也做了 Prettier 规则适配。也就是说，采用 ESlint 校验和修复代码时，也会顺便校验和修复不满足 Prettier 规则的代码。

具体到 .eslintrc.js 配置文件里面的规则就是：

```js
// .eslintrc.js 文件

extends: [
  "@vue/prettier"
]
rules: {
  "prettier/prettier": [
    "error",
    {
      endOfLine: "auto"
    }
  ]
}

```

而 settings.json 中剩下的一些规则：

```json
{
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

表示的是在进行 vue、javascript、typescript、json、jsonc、html、css、scss 文件手动格式化时，采取 Prettier 来进行格式化。

# Git 提交代码时自动校验和格式化

该功能来自 husky 依赖和 lint-staged 依赖的配合使用，
由 husky 接管 git hooks 钩子，在提交代码时，由 lint-staged 检查并修复本地暂存代码。
本质上检查的规则依旧是 ESlint + Prettier，lint-staged 配置如下：

```json
// package.json 文件

"lint-staged": {
  "*.{js,jsx,vue,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{scss,less,css,html,md}": [
    "prettier --write"
  ],
  "package.json": [
    "prettier --write"
  ],
  "{!(package)*.json,.!(browserslist)*rc}": [
    "prettier --write--parser json"
  ]
}

```
