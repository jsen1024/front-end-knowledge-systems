```js
function render(){
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')  // 这里是去挂载到自己的html中--基座会拿到这个挂载后的html，将其插入进去
}


if(window.__POWERED_BY_QIANKUN__){ // 如果主应用上有挂载，就不独立运行 （动态添加publicPath）
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if(!window.__POWERED_BY_QIANKUN__){ // 默认独立运行
  render()
}
```



// 子应用是react 要重新配置webpack（yarn add react-app-rewired）

![c2eRNJ](https://gitee.com/vr2/images/raw/master/uPic/c2eRNJ.png)







## 微前端

### 1.业务背景介绍

### 2.技术选型

![image-20210227152944452](/Users/tom/Library/Application Support/typora-user-images/image-20210227152944452.png)



![inaGCk](https://gitee.com/vr2/images/raw/master/uPic/inaGCk.png)

#### 2.1、巨石应用

巨石应用也就是 SPA/MPA 的技术架构。这里想单独提一下，针对产品体验的场景，一个简单的 SPA 应用、肯定是能够给到一个整体的系统体验，并且能够管控系统的技术复杂度。但如果系统越来越臃肿，就会遇到上面到的技术纬度的问题。

#### 2.2、iframe

iframe在微前端方案流行前，是一个比较好的方案。不管是一些二方或是三方的接入，它都能够很好地满足需求。

##### 优点：

- 实现简单
- 天然具备隔离性

##### 缺点：

- 用户体验不好：iframe 如果不去做一些特殊处理，嵌入的页面双滚动条问题、路由无法同步问题、包括 iframe 内部有一些弹出遮罩交互
- 主页面和 iframe 共享最大允许的 HTTP 链接数。
- iframe 阻塞主页面加载。（每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程）
- url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
- UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中.（在iframe创建一个水平垂直居中的弹窗无法实现）

#### 2.3、框架组件

​	将常用的逻辑封装成一个组件，以npm包的方式引入。

​	这种方式存在的问题比较明显的，它本质上并没有去解决技术架构的升级、用户体验的优化。比如通用 layout 组件，可能保证了系统拥有一个统一的交互视觉 layout 层。虽然说看上去两个系统长一样，但它实际上还是不同的系统，跨系统操作还是需要跳转。

![0M31Br](https://gitee.com/vr2/images/raw/master/uPic/0M31Br.png)

​	

#### 微前端的设计理念

- 第一与技术无关
- 第二设计理念就是开发体验一致，今天技术架构上引入一套微前端方案，并不会意味着要有很多新概念去学习。
- 第三点其实是微前端方案中核心的一个能力 - 路由能力
- 

### 介绍

#### 什么是微前端？

> [微前端](https://www.thoughtworks.com/radar/techniques/micro-frontends)由ThoughtWorks 2016年提出，将后端微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。

> 微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。换句话说微前端就是将不同的功能按照不同的维度拆分成多个子应用。通过主应用来加载这些子应用。

微前端的核心在于**拆**，拆完后再**合**。

<img src="https://gitee.com/vr2/images/raw/master/uPic/OGicDm.png" alt="OGicDm" style="zoom:90%;" />

#### 为什么要去使用微前端？

- **技术栈无关**:主框架不限制接入应用的技术栈，微应用具备完全自主权
- **独立开发、独立部署**:微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- **增量升级**:在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
- **独立运行时**:每个微应用之间状态隔离，运行时状态不共享。

> 微前端架构旨在解决单体应用在一个相对长的时间跨度下，由于参与的人员、团队的增多、变迁，从一个普通应用演变成一个巨石应用([Frontend Monolith](https://www.youtube.com/watch?v=pU1gXA0rfwc))后，随之而来的应用不可维护的问题。这类问题在企业级 Web 应用中尤其常见。



#### 怎样落地微前端？

##### Single-spa

`single-spa` 一个基于JavaScript的 **微前端** 框架，他可以用于构建可共存的微前端应用，每个前端应用都可以用自己的框架编写，完美支持 Vue React Angular。可以实现 **服务注册** **事件监听** **子父组件通信** 等功能。

###### **主项目（基座）搭建：**

主应用注册子应用的路由：

```javascript
// 主应用的route/index.js 
{
  	path: '/vue',
    name: 'vue',
}
```

```vue
<template>
  <div>
    <div class="header">
      <span @click="goSubAppVue">vue</span>
      <span @click="goMainHome">home</span>
      <span @click="goMainAbout">about</span>
    </div>
    <div id="react-app"></div>
    <div id="single-vue" class="single-spa-vue">
      <div id="vue"></div>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
import { navigateToUrl } from 'single-spa';
  export default {
    data() {
      return {
      };
    },
    methods: {
      goSubAppVue() {
        navigateToUrl('/vue/')
      },
      goMainHome() {
        this.$router.push('/')
      },
      goMainAbout() {
        this.$router.push('/about')
      }

    }

  };
</script>
```

###### **主应用注册子应用**

`registerApplication`注册子项目

- appName: 子项目名称
- applicationOrLoadingFn: 子项目注册函数，用户需要返回 single-spa 的生命周期对象
- activityFn: 回调函数入参 `location` 对象，可以写自定义匹配路由加载规则
- customProps:传递给子应用的对象

`start`启动函数

```javascript
// main.js
import './single-spa-config.js'
```

这里采用远程加载`manifest.json`

```javascript
import { registerApplication, start } from "single-spa";
import axios from 'axios';


/**
 * loadScript:一个promise同步方法。可以代替创建一个script标签，然后加载服务
 */
const loadScript = async (url) => {
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.setAttribute('name', 'main-application');
    script.onerror = reject;
    // const firstScript = document.getElementsByTagName("script")[0];
    // firstScript.parentNode.insertBefore(script, firstScript);
      document.head.appendChild(script);
  });
};


/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* */
const getManifest = (url, bundle) => new Promise(async (resolve) => {
  const { data } = await axios.get(url);
  const { entrypoints, publicPath } = data;
  const assets = entrypoints[bundle].assets;
  for (let i = 0; i < assets.length; i++) {
      await loadScript(publicPath + assets[i]).then(() => {
          if (i === assets.length - 1) {
              resolve()
          }
      })
  }
});

// 注册应用
registerApplication(
    'singleDemo', 
    async () => { 
        // 注册用函数，
      let singleVue = null
      await getManifest('http://127.0.0.1:3000/manifest.json', 'app').then(() => {
        singleVue = window.singleVue;
    });
      return singleVue;
    },
   // 当路由满足条件时（返回true），激活（挂载）子应用
    location => location.pathname.startsWith('/vue')
  )
  
  // 在调用 start 之前, 应用会被加载, 但不会初始化，挂载或卸载。
  // start 的原因是让你更好的控制你单页应用的性能。
  start()
```

###### **子项目（应用搭建）：**（vue）

```shell
npm install single-spa-vue --save -d
```

在`main.js`中引入 `single-spa-vue`，传入Vue对象和vue.js挂载参数，就可以实现注册。它会返回一个对象，里面有single-spa 需要的生命周期函数。使用`export`导出即可

```javascript
import singleSpaVue from "single-spa-vue";
import Vue from 'vue'

const vueOptions = {
    el: "#vue",
    router,
    store,
    render: h => h(App)
};

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: vueOptions
});

// 导出生命周期对象
export const bootstrap = vueLifecycles.bootstrap; // 启动时
export const mount = vueLifecycles.mount; // 挂载时
export const unmount = vueLifecycles.unmount; // 卸载时

export default vueLifecycles;

```

###### webpack的处理

只是导出了，还需要挂载到`window`。

在项目目录下新建 `vue.config.js`, 修改我们的webpack配置。我们修改webpack `output`内的 `library` 和 `libraryTarget` 字段。

- output.library: 导出的对象名
- output.libraryTarget: 导出后要挂载到哪里

同时，因为我们是远程调用，还需要设置 `publicPath` 字段为你的真实服务地址。否则加载子`chunk`时，会去**当前浏览器域名的根路径**寻找，有404问题。 因为我们本地的服务启动是`localhost:3000`，所以我们就设置 `//localhost:3000`。

```javascript
module.exports = {
    publicPath: "//localhost:3000/",
    // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
    css: {
        extract: false
    },
    configureWebpack: {
        devtool: 'none', // 不打包sourcemap
        output: {
            library: "singleVue", // 导出名称
            libraryTarget: "window", //挂载目标
        }
    },
    devServer: {
        contentBase: './',
        compress: true,
    }
};

```

###### **样式隔离**

样式隔离这块，我们使用`postcss`的一个插件：postcss-selector-namespace。 **他会把你项目里的所有css都会添加一个类名前缀。这样就可以实现命名空间隔离**。

首先，我们先安装这个插件：`npm install postcss-selector-namespace --save -d`

项目目录下新建 `postcss.config.js`，使用插件：

```javascript
// postcss.config.js

module.exports = {
  plugins: {
    // postcss-selector-namespace: 给所有css添加统一前缀，然后父项目添加命名空间
    'postcss-selector-namespace': {
      namespace(css) {
        // element-ui的样式不需要添加命名空间
        if (css.includes('element-variables.scss')) return '';
        return '.single-spa-vue' // 返回要添加的类名
      }
    },
  }
}

```

在父应用要挂载的区块，添加我们的命名空间

###### **子项目独立运行**

大家可能会发现，我们的子服务现在是无法独立运行的，现在我们改造为可以独立 + 集成双模式运行。

`single-spa` 有个属性，叫做 `window.singleSpaNavigate`。如果为true，代表就是single-spa模式。如果false，就可以独立渲染。

我们改造一下子项目的`main.js` ：

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false

const vueOptions = {
    el: "#vue",
    router,
    store,
    render: h => h(App)
};

// 判断当前页面使用singleSpa应用,不是就渲染
if (!window.singleSpaNavigate) {
    delete vueOptions.el;
    new Vue(vueOptions).$mount('#app');
}

// singleSpaVue包装一个vue微前端服务对象
const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: vueOptions
});

export const bootstrap = vueLifecycles.bootstrap; // 启动时
export const mount = vueLifecycles.mount; // 挂载时
export const unmount = vueLifecycles.unmount; // 卸载时

export default vueLifecycles;

```

这样，我们就可以独立访问子服务的 `index.html` 。不要忘记在`public/index.html`里面添加命名空间，否则会丢失样式。

```javascript
<div class="single-spa-vue">
    <div id="app"></div>
</div>
```

###### 远程加载

在这里，我们的远程加载使用的是`async await`构建一个同步执行任务。

创建一个`script`标签，等`script`加载后，返回`script`加载到`window`上面的对象。

```javascript
/*
* loadScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
* */
const loadScript = async (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
};

```

##### vue 和 react/angular 挂载的区别

Vue 2.x的dom挂载，采取的是 **覆盖Dom挂载** 的方式。例如，组件要挂载到`#app`上，那么它会用组件覆盖掉`#app`元素。

但是React/Angular不同，它们的挂载方式是在目标挂载元素的内部`添加元素`，而不是直接覆盖掉。 例如组件要挂载到`#app`上，那么他会在`#app`内部挂载组件，`#app`还存在。

这样就造成了一个问题，当我从 vue子项目 => react项目 => vue子项目时，就会找不到要挂载的dom元素，从而抛出错误。

解决这个问题的方案是，让 **vue项目组件的根元素类名/ID名和要挂载的元素一致** 就可以。

例如我们要挂载到 `#app` 这个dom上，那么我们子项目内部的app.vue，最顶部的dom元素id名也应该叫 `#app`。

```vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

```

###### manifest 自动加载 bundle和chunk.vendor

在上面父项目加载子项目的代码中，我们可以看到。我们要注册一个子服务，需要一次性加载2个JS文件。**如果需要加载的JS更多，甚至生产环境的 bundle 有唯一hash，** 那我们还能写死文件名和列表吗？

```javascript
singleSpa.registerApplication(
    'singleVue',
    async () => {
        await runScript('http://127.0.0.1:3000/js/chunk-vendors.js'); // 写死的文件列表
        await runScript('http://127.0.0.1:3000/js/app.js');
        return window.singleVue;
    },
    location => location.pathname.startsWith('/vue') 
);

```

我们的实现思路，就是让子项目使用 `stats-webpack-plugin` 插件，每次打包后都输出一个 只包含重要信息的`manifest.json`文件。父项目先ajax 请求 这个json文件，从中读取出需要加载的js目录，然后同步加载。

![image-20210227212611877](/Users/tom/Library/Application Support/typora-user-images/image-20210227212611877.png)

###### stats-webpack-plugin

这里就不得不提到这个webpack plugin了。它可以在你每次打包结束后，都生成一个`manifest.json` 文件，里面存放着本次打包的 `public_path` `bundle list` `chunk list` 文件大小依赖等等信息。

```json
{
  "errors": [],
  "warnings": [],
  "version": "4.41.4",
  "hash": "d0601ce74a7b9821751e",
  "publicPath": "//localhost:3000/",
  "outputPath": "/Users/janlay/juejin-single/vue-chlid/dist",
  "entrypoints": { // 只使用这个字段
    "app": {
      "chunks": [
        "chunk-vendors",
        "app"
      ],
      "assets": [
        "js/chunk-vendors.75fba470.js",
        "js/app.3249afbe.js"
      ],
      "children": {},
      "childAssets": {}
    }
    ... ...
  }


```

```shell
npm install stats-webpack-plugin --save -d
```

```javascript
{
    configureWebpack: {
        devtool: 'none',
        output: {
            library: "singleVue",
            libraryTarget: "window",
        },
        /**** 添加开头 ****/
        plugins: [
            new StatsPlugin('manifest.json', {
                chunkModules: false,
                entrypoints: true,
                source: false,
                chunks: false,
                modules: false,
                assets: false,
                children: false,
                exclude: [/node_modules/]
            }),
        ]
        /**** 添加结尾 ****/
    }
}

```







**参考文章：**

- [微前端连载 3/7：淘宝大型应用架构中的微前端方案](https://juejin.cn/post/6844904202389438478#heading-18)
- [Single-Spa + Vue Cli 微前端落地指南 + 视频 (项目隔离远程加载，自动引入)](https://juejin.cn/post/6844904025565954055#heading-14)
- [Single-Spa微前端落地（含nginx部署）](https://juejin.cn/post/6844904158349246477#heading-12)
- [微前端框架 之 single-spa 从入门到精通](https://juejin.cn/post/6862661545592111111)

