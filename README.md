# MVVM框架简单实现

## 项目简介

实现一个简单的 MVVM 框架

1. 实现数据劫持
2. 实现发布订阅模式
3. 实现数据单向绑定
4. 实现双向绑定


## 环境依赖

项目依赖

```text
"babel-core": "^6.26.3",
"babel-loader": "^8.1.0"
```

开发依赖

```text
"@babel/plugin-transform-modules-commonjs": "^7.18.6",
"jest": "^28.1.3",
"jest-environment-jsdom": "^28.1.3",
"webpack-cli": "^4.10.0"
```

## 部署步骤

安装依赖

```text
npm install
```

项目打包

```text
webpack
```

运行测试用例

```text
npm run test
```

打开 `view/index.html`

## 项目结构

```text
├─dist
├─view
│  └─index.html
└─vm
   ├─Compiler.js
   ├─Dep.js
   ├─Observer.js
   ├─VM.js
   └─Watcher.js
```

VM.js
入口, 先进行数据劫持，再进行模版编译

Observer.js
进行数据的劫持，监听 data 的数据获取以及更新。当数据被获取时，调用 dep 收集 Watcher。当数据被修改时，调用 dep 内 Watcher 的 notify 方法，通知更新。

Compiler.js
将原生 DOM 转换为虚拟节点（fragment），识别 DOM 中的特殊符号，如"{{}}","v-model","v-text"等，对节点创建相应的 Watcher 类。

Watcher.js
获取 data 中的数据，用来计算和更新插值表达式。

Dep.js
获取 data 的时候进行 Watcher 的收集，设置 data 时进行 Watcher 中的 update 调用。

## 单元测试

使用 Jest 框架进行单元测试。

覆盖率：

```text
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |   81.55 |    65.95 |   86.11 |   81.55 |                  
 Compiler.js |   67.27 |    58.06 |   68.75 |   67.27 | 69-89,103-105,137
 Dep.js      |      75 |      100 |     100 |      75 | 21               
 Observer.js |     100 |     87.5 |     100 |     100 | 34               
 VM.js       |     100 |    66.66 |     100 |     100 | 7-41             
 Watcher.js  |     100 |      100 |     100 |     100 |                  
-------------|---------|----------|---------|---------|-------------------
```
