---
title: "在 Webpack 中使用 Bootstrap Table"
date: 2019-09-22T22:42:40+08:00
categories: [BootstrapTable]
---

因为看到问题说 [在 Webpack 中使用最新版本的 Bootstrap Table 会失败](https://github.com/wenzhixin/bootstrap-table/issues/4597)，于是尝试了下如何从零开始在 Webpack 中使用 Bootstrap Table。

首先，根据 Webpack [Getting Started](https://webpack.js.org/guides/getting-started/) 的文档，创建了一个测试项目 `webpack-bootstrap-table`，在这里我们使用 `webpack-dev-server` 用于启动服务：

```bash
mkdir webpack-bootstrap-table
cd webpack-bootstrap-table
yarn init -y
yarn add webpack webpack-cli webpack-dev-server -D
```

接下来，增加 `bootstrap-table` 和需要的依赖库 `jquery` 和 `bootstrap`：

```bash
yarn add jquery bootstrap popper.js bootstrap-table
```

由于需要引入 `css` 文件，我们需要使用 [`css-loader`](https://webpack.js.org/loaders/css-loader/) 模块：

```bash
yarn add style-loader css-loader -D
```

增加对应的目录和文件：

```bash
  webpack-bootstrap-table
  |- package.json
+ |- dist
+   |- index.html
+ |- /src
+   |- index.js
+ |- webpack.config.js
```

**dist/index.html：**

```html
<!doctype html>
<html>
  <head>
    <title>Webpack Bootstrap Table</title>
  </head>
  <body>
    <table id="table"></table>
    <script src="main.js"></script>
  </body>
</html>
```

**src/index.js：**

```js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'

import $ from 'jquery'
import 'bootstrap'
import 'bootstrap-table' // dist/bootstrap-table.min.js by default

$('#table').bootstrapTable({
  search: true,
  showColumns: true,
  columns: [{
    field: 'id',
    title: 'Item ID'
  }, {
    field: 'name',
    title: 'Item Name'
  }, {
    field: 'price',
    title: 'Item Price'
  }],
  data: [{
    id: 1,
    name: 'Item 1',
    price: '$1'
  }, {
    id: 2,
    name: 'Item 2',
    price: '$2'
  }]
})
```

**webpack.config.js：**

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
}
```

然后在 **package.json** 文件中增加 `build` 和 `dev` 的 `scripts`：

```json
{
  "name": "webpack-bootstrap-table",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "css-loader": "^3.2.0",
    "style-loader": "^1.0.0",
    "webpack": "^4.41.0",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.1"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "bootstrap-table": "^1.15.4",
    "jquery": "^3.4.1",
    "popper.js": "^1.15.0"
  },
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --inline --progress"
  }
}
```

运行服务（或者 `yarn build`）：

```
yarn dev
```

打开浏览器，就可以正常使用了。
