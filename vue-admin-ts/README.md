# vue-admin-typescript

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 问题
无法远程安装 cypress.
```
export CYPRESS_INSTALL_BINARY=/Users/moocss/cypress.zip
```
无法远程安装 Puppeteer.

运行下面的命令，跳过chromium的安装
```
env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn add puppeteer
```

在终端执行：
```
PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm install puppeteer
```

## 工具
```shell
for var in *.svg; do mv "$var" "${var%.svg}-outlined.svg"; done;
for var in *.svg; do mv "$var" "${var%.svg}-twotone.svg"; done;
```