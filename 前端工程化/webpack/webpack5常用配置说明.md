

## 初始化开始

-   初始化项目

```javascript
npm init -y
```

-   下载依赖

```javascript
npm i webpack webpack-cli -D
```

## 基本配置



### 一、入口以及出口配置

```js
const path = require('path')

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx')，
  // 打包文件出口
  output: {
    filename: '[name].[hash:8].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
}
```



### 二、处理 js/jsx 等资源



### 三、处理 css/less/scss...等资源

- `css-loader`：负责将` css` 文件编译成 Webpack 能识别的模块
- `style-loader`：会动态创建一个 `style`标签，里面放置 Webpack 中 `css` 模块内容

```shell
npm i css-loader style-loader -D
```

https://github.com/guojiongwei/webpack5-react-ts

https://juejin.cn/post/7067152017214406664?from=search-suggest

https://yk2012.github.io/sgg_webpack5/base/image.html#_1-%E9%85%8D%E7%BD%AE

https://github.com/abhinavnigam96/RnWebAwesome



### 

