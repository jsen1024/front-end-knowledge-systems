# `Metro`中文文档

[toc]

## 一、metro介绍

Metro是一个JavaScript打包器，给它一些options和入口文件，将返回一个包含入口文件及其所有依赖的js bundle文件

 [Metro](https://github.com/facebook/metro) 是`构建 jsbundle 包`及提供`开发服务`的工具，默认被集成在 `react-native` 命令行工具内，你可以在[这里](https://github.com/react-native-community/cli/blob/e89f296b1f1b27da23ffb77e3c8fc5bc2f4942ee/packages/cli-plugin-metro/src/commands/start/runServer.ts#L9) 找到其开发服务集成源码。

`react-native` 命令行工具源码是由 [Lerna](https://lerna.js.org/docs/introduction) 管理的 monorepo 仓库，每个子命令在单独的子包里。而 React Native 的打包由其 `cli-plugin-metro` 子包管理。

在`@react-native-community/cli-plugin-metro`的 9.1.1 版本中，有两个命令：`start` 和 `bundle`，分别在以下[目录](https://github.com/react-native-community/cli/tree/main/packages/cli-plugin-metro/src/commands)里：

```Plain Text
├── CHANGELOG.md
├── package.json
├── src
│   ├── commands
│   │   ├── bundle # 打包
│   │   ├── index.ts
│   │   └── start # 开发服务
│   ├── index.ts
│   └── tools
│       ├── __tests__
│       ├── loadMetroConfig.ts
│       └── metroPlatformResolver.ts
└── tsconfig.json
```

通常你可以直接用 `react-native bundle` 命令打出一个平台的 jsbundle 文件及其资源目录：

```Plain Text
react-native bundle --platform android --dev false --entry-file index.js --bundle-output dist/index.bundle --assets-dest dist/
```

该命令最终会调用 metro 包的 `Server.js` 文件的 [build()](https://github.com/facebook/metro/blob/fa103665c9cd555e3f78e6ed3ef6c54df92687fa/packages/metro/src/Server.js#L179) 方法以及 [getAssets()](https://github.com/facebook/metro/blob/fa103665c9cd555e3f78e6ed3ef6c54df92687fa/packages/metro/src/Server.js#L316) 方法来完成打包工作。

`build()` 会返回两个值 `code` 和 `map`，然后完成 jsbundle 文件的存储：

* code： 表示已经打包完成的目标代码；
* map：表示 sourcemap。

`getAssets()` 会获取到资源文件列表 `AssetData[]`，然后根据对应平台 (android | ios) 把资源文件复制到指定目标目录。

```Plain Text
export interface AssetData {
  __packager_asset: boolean;
  fileSystemLocation: string;
  hash: string;
  height: number | null;
  httpServerLocation: string;
  name: string;
  scales: number[];
  type: string;
  width: number | null;
  files: string[];
}
```

> 虽然 Metro 提供了 API，但是 react-native 并没有直接使用。



### 1.入门（Getting Started）

使用`npm`安装`Metro`

```bash
npm install --save-dev metro metro-core
```

或者使用 `yarn`:

```bash
yarn add --dev metro metro-core
```

#### 1.运行metro

可以使用[脚手架](https://blog.csdn.net/gg_ios/article/details/CLI.md)运行Metro，也可以通过手动引入

首先引入Metro模块:

```javascript
const Metro = require('metro');
```

返回的Metro对象中，有如下几个重要的方法

##### \* **方法runMetro(config)**

传入参数config，将会返回一个metro-server(译者注：被Promise包裹的metro-server)，你可以将它的processRequest方法作为hook链接到合适的HTTP(S)服务器上。

```javascript
'use strict';

const http = require('http');
const Metro = require('metro');

// We first load the config from the file system
Metro.loadConfig().then(async (config) => {
  const metroBundlerServer = await Metro.runMetro(config);

  const httpServer = http.createServer(
    metroBundlerServer.processRequest.bind(metroBundlerServer),
  );

  httpServer.listen(8081);
});
```

为了兼容Express App，当请求不能够被Metro bundler处理时processRequest将调用第三个参数，这允许你将metro-server和已经存在的服务器做合并或者扩展一个新的。

```javascript
const httpServer = http.createServer((req, res) => {
  metroBundlerServer.processRequest(req, res, () => {
    // Metro does not know how to handle the request.
  });
});
```

如果你使用[Express](http://expressjs.com/)，那刚好可以将processRequest作为Express的中间件

```javascript
const express = require('express');
const app = express();

app.use(
  metroBundlerServer.processRequest.bind(metroBundlerServer),
);

app.listen(8081);
```

##### \* **runServer(Config, Options)**

根据给定的配置和选项启动开发服务器。返回服务器。我们建议使用,`runMetro`来代替`runServer`,`runMetro`调用此函数。



Options

* `host (string)`：服务器托管在哪里。
* `onReady (Function)`：当服务器准备好处理请求时调用。
* `secure (boolean)`:**已弃用**服务器是否应运行`https`在`http`.
* `secureKey (string)`：**已弃用**开启`https`时使用的键。`secure`
* `secureCert (string)`：**已弃用**打开`https`时使用的证书。`secure`
* `secureServerOptions (Object)`：要传递到 Metro 的 HTTPS 服务器的选项对象。该对象的存在将使 Metro 的服务器运行在`https`. 有关有效选项，请参阅[节点文档。](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)
* `waitForBundler (boolean)`：是否等待捆绑器完成初始化后再返回服务器实例。

```javascript
const config = await Metro.loadConfig();

await Metro.runServer(config);
```

```javascript
const fs = require('fs');

const config = await Metro.loadConfig();

await Metro.runServer(config, {
  secureServerOptions: {
    ca: fs.readFileSync('path/to/ca'),
    cert: fs.readFileSync('path/to/cert'),
    key: fs.readFileSync('path/to/key'),
  }
});
```

##### \* **runBuild(Config, Options)**

基于指定的config、options及一些默认的option构建Bundle文件，返回值是一个被Promise包裹的对象，该对象有`code`和`map`两个属性(译者注：code就是bundle中的内容，map就是source map的内容)。

 **Options**

* `dev (boolean)`: 指定构建开发版本还是生产版本，在bundle文件的`process.env.NODE_ENV = 'development'`处体现
* `entry (string)`: 指定此次打包的入口文件
* `onBegin (Function)`: 开始构建时调用
* `onComplete (Function)`: 构建结束时调用
* `onProgress (Function)`: 构建过程中调用，有两个参数来表示构建进度
* `minify (boolean)`: 是否压缩bundle
* `out (string)`: bundle的输出路径
* `platform ('web' | 'android' | 'ios')`: 指定平台
* `sourceMap (boolean)`: 在跟out同级目录生成source map文件，并在bundle文件的最后一行指定map文件的路径或者完整map文件的base64内容，例如：`//# sourceMappingURL=./bundle.map`
* `sourceMapUrl (string)`: 在bundle文件的最后一行指定source map文件的路径. 可以找到源映射的 URL。它默认与捆绑包具有相同的 URL，但将扩展名从 更改`.bundle`为`.map`。当`inlineSourceMap`为 时`true`，该属性无效。

```javascript
const config = await Metro.loadConfig();

await Metro.runBuild(config, {
  entry: 'index.js',
  platform: 'ios',
  minify: true,
  out: '/Users/Metro/metro-ios.js'
});
```

##### \* **createConnectMiddleware(config)**

创建一个响应捆绑请求的 Connect 中间件，而不是创建完整的服务器。然后可以将该中间件插入到您自己的服务器中。该`port`参数是可选的，仅用于记录目的。

* `port (number)`：Connect 中间件的端口（仅用于日志记录目的）。

```javascript
const Metro = require('metro');
const express = require('express');
const app = express();
const server = require('http').Server(app);

Metro.loadConfig().then(async config => {
  const connectMiddleware = await Metro.createConnectMiddleware(config);
  const {server: {port}} = config;

  app.use(connectMiddleware.middleware);
  server.listen(port);
  connectMiddleware.attachHmrServer(server);
});
```

#### 2.可用[选项](https://facebook.github.io/metro/docs/getting-started#available-options)

##### Configuration

有关config选项的详细信息，请移步[Configuring Metro](https://blog.csdn.net/gg_ios/article/details/Configuration.md)https://facebook.github.io/metro/docs/configuration)



#### 3.URL和bundle请求

`Metro server`可以处理Assets、bundles、source map三种类型的资源

##### \* **Assets**

为了获取Assets资源，你可以像引用js文件一样使用`require`方法去引用Asset文件，服务器会处理这种特殊引用并返回该Asset资源的路径，当一个资源被请求时(资源通过扩展名识别，它必须在`assetExts`数组上)，一般都是这样处理

除此之外，服务器还能够根据平台和请求的大小(指图片)提供特定的Asset。比如通过点后缀(例如.ios)来加载指定平台的代码，通过@后缀(例如@2x)来根据平台加载不同的图片

##### \* **Bundle**

Bundle请求时，将在`Projectroot`中寻找Bundle的入口文件，跟入口文件相关的所有文件都将包含在改bundle中。打包时会自动将bundle文件的后缀由`.js`更改为`.bundle`。下面是部分构建参数:

* `dev`: 指定打包环境。
* `platform`: 指定打包平台
* `minify`: 是否压缩代码
* `excludeSource`: source map中是否包含源代码(译者注：经测试false为有，ture没有)

比如, 请求 `http://localhost:8081/foo/bar/baz.bundle?dev=true&platform=ios` 将基于`foo/bar/baz.js`在开发环境下为iOS创建一个bundle

##### \* **Source maps**

在使用`http://localhost:8081/index.bundle?dev=true&platform=ios`打包的同时，也通过`http://localhost:8081/index.map?dev=true&platform=ios`为每个bundle创建一个source map文件



#### 4.JavaScript transformer

js转换器是操作js代码的地方，在调用Babel时使用，它导出有两个方法：

##### \* \*\*Method \*\***transform(module)**

强制将指定module(包含路径、代码等信息)转化为AST，默认的转换器仅能将代码转化为AST,以此来完成最低限度的工作

```javascript
const babylon = require('@babel/parser');

module.exports.transform = (file: {filename: string, src: string}) => {
  const ast = babylon.parse(code, {sourceType: 'module'});

  return {ast};
};
```

如果你想使用Babel插件，你可以将代码传递给他来完成

```javascript
const {transformSync} = require('@babel/core');

module.exports.transform = file => {
  return transformSync(file.src, {
    // Babel options...
  });
};
```

##### \* \*\*Method \*\***getCacheKey()**

返回转换器cache key的可选方法。当使用不同的转换器时，这允许将转换后的文件正确地绑定到转换它的转换器。该方法的结果必须是`string`





### 2.概念（Concepts）

Metro在打包过程中有如下三个阶段：解析、转换、序列化

#### 1.解析

Metro通过`resovler`把文件之间的互相引用转化成一个个单独的模块，最后得到一个包含所有模块的图表。实际上这个阶段和转换阶段是在同时进行

#### 2.转换

转换所有的模块都将通过装换器转化成目标平台(比如：React Native)可以识别的模块，另外模块的转换将基于`maxWorkers`指定的数量并行进行

#### 3.序列化

一旦所有的模块被转换完成，它们将把跟入口文件相关的模块组合起来生成一个或者多个js文件，该文件就是我们最终想要的包



Metro已经被拆分成三个模块，分别对应上面的解析阶段、转换阶段、序列化阶段。这三个模块可以根据你的需要换成其他类似的模块，比如可以用Babel来代替默认的转换模块

## 二、Metro Bundler

### 1.配置

有如下三种方式配置Metro(按照优先级排序):

`metro.config.js` 、`metro.config.json` 、`package.json` 中的`metro` 字段

你也可以自定义一个配置文件，在执行bundle脚本时使用`--config <path/to/config>`来指定配置文件路径

Metro 通过项目根目录 `metro.config.js` 文件来对打包进行配置，metro.config.js 的配置结构如下：

```Plain Text
module.exports = {
 /* 通用配置 */
  resolver: {
    /* 解析配置 */
  },
  transformer: {
    /* 转换配置 */
  },
  serializer: {
    /* 序列化配置 */
  },
  server: {
    /* 服务配置 */
  },
  watcher: {
    /* 观察配置 */
    watchman: {
      /* Watchman-specific options */
    }
  }
};
```

从[源码](https://github.com/facebook/metro/blob/fa103665c9cd555e3f78e6ed3ef6c54df92687fa/packages/metro-config/src/loadConfig.js#L84)中得知，Metro 使用 [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) 来加载配置文件的，`metro.config.js` 配置也允许是一个函数，并且接收一个默认配置的实例，因此你也可以直接对已有配置进行修改。

```Plain Text
module.exports = (defaultConfig) => {
  return defaultConfig;
}
```

你可以在[这里](https://facebook.github.io/metro/docs/configuration)获取全部配置项详情。其中，`resolver`、`transformer`、`serializer` 三个配置项下面将详细介绍。

#### 1.通用配置（General Options）

`metro-config` 是 Metro 项目的子包，用于配置 metro 打包。它暴露了以下的一些方法，这些方法方便我们做 React Native 的深度开发。

```Plain Text
module.exports = {
  loadConfig,
  resolveConfig,
  mergeConfig,
  getDefaultConfig,
};

```

在[源码](https://github.com/facebook/metro/blob/fa103665c9cd555e3f78e6ed3ef6c54df92687fa/packages/metro-config/src/defaults/index.js)中，你可以找到其默认配置选项，有几个默认配置需要关注的：

##### \* **projectRoot**

Type: `string` 。项目的根文件夹。如果您的项目依赖于此根目录之外的任何文件，则它们的包含目录必须在`watchFolders`.

> 如果您的 Metro 项目是在 monorepo 中开发的，并且包含来自多个逻辑包的文件，那么您通常需要设置为`projectRoot`存储库的根目录，或者至少在层次结构中设置得足够高，以便无需单独配置即可访问所有相关文件`watchFolders`。

React Native 项目的根目录。如果未指定，默认通过 `node_modules/metro-config` 的位置解析。若指定的 projectRoot 不正确，那么在 Metro 的解析阶段将直接报错。

```Plain Text
projectRoot: projectRoot || path.resolve(__dirname, '../../..'),
```

##### \* **watchFloders**

type:`Array<string>` 。指定要监视的根目录文件夹。该目录之外的目录列表`projectRoot`可以包含该项目的源文件。

> 尽管有此选项的名称，但它不仅仅与文件监视相关。即使在离线构建中（例如，在 CI 中），所有文件也必须通过`watchFolders`和的组合对 Metro 可见`projectRoot`。

##### \* **transfromerpath**

Type: `string` 。要使用转换器模块所在的路径

##### \* **reporter**

Type: `{update: (event: ReportableEvent) => void}`

类型：`{update: (event: ReportableEvent) => void}`

用于报告捆绑过程中捆绑器的状态。默认实现将大多数事件打印到终端。

另请参阅Metro 源代码中[的定义。](https://github.com/facebook/metro/blob/main/packages/metro/src/lib/reporting.js)`ReportableEvent`

##### \* **cacheVersion**

type: `string`。可用于生成一个将整个Metro缓存失效的key。在对项目中的所有缓存键进行哈希处理之前附加到它们的任意字符串。通常不需要明确设置，因为 Metro 会自动从您的项目配置和源文件的内容中派生出正确的缓存密钥。

##### \* **resetCache**

每次编译模块是否忽略缓存重新执行转换，默认值为 `false`，即使用缓存。

> 有时候缓存文件未必是正确的可用文件，此时可以在 react-native 命令后面指定 `--reset-cache` 参数或设置改选项为 true 来修复问题。

##### \* **cacheStores**

Type: `Array<CacheStore<TransformResult<>>`。提供转换后的缓存文件的存储位置，默认存储至`系统临时目录`。

[Metro转换器缓存](https://facebook.github.io/metro/docs/caching)的存储适配器列表。[这可以是内置缓存存储](https://facebook.github.io/metro/docs/caching#built-in-cache-stores)和[自定义缓存存储](https://facebook.github.io/metro/docs/caching#custom-cache-stores)的任意组合。默认使用磁盘上的临时目录作为唯一的缓存存储。

当 Metro 需要转换模块时，它首先计算该文件的与机器无关的缓存键，并使用它尝试按顺序从每个存储中读取。一旦 Metro 获得了转换器的输出（无论是否已缓存），它就会将转换结果写入该键返回（缓存未命中）的\_所有\_存储。`null`

```Plain Text

type CacheStores =
  | Array<CacheStore<Buffer | JsonSerializable>>
  | ((MetroCache) => Array<
      CacheStore<Buffer | JsonSerializable>
    >);

// The exports of 'metro-cache'
type MetroCache = {
  FileStore,
  AutoCleanFileStore,
  HttpStore,
  HttpGetStore,
  ...
};

type JsonSerializable = /* Any JSON-serializable value */;

// 使用
cacheStores: [
  new FileStore({
    root: path.join(os.tmpdir(), 'metro-cache'),
  }),
],

```

除了默认存储至本地文件系统，你还添加一个`服务器存储`：

```Plain Text
cacheStores: [
  new FileStore({/*opts*/}),
  new HttpStore({/*opts*/})
]

```

这种缓存设计是分层的 (multi-layered cache) ，让构建`缓存共享`变成可能。



##### \* **stickyWorkers**

type: `boolean` .如果`true`，是否基于文件名创建workers.Metro 将使用从文件到 Transformer Worker 的稳定映射，因此同一文件始终由同一 Worker 转换。如果`transformer`的初始化成本很高，这可以提高初始构建性能，但会减慢具有不同配置的并发构建（例如连接到一台 Metro 服务器的多个 React Native 应用程序）。默认为`true`.

##### \* **maxWorkers**

Type: `number`。转换时可以并行的最大值。默认为机器上可用核心数量的大约一半，如 所报告`os.cpus()`。

> 1.超过可用核心数量的值不会产生任何影响。

> 2.如果`maxWorkers`设置为 1 或更低，代码将在主 Metro 进程中运行，而不是并发运行

> 3.Metro 有两个独立的工作池 - 一个用于转换，另一个用于构建文件映射。每个池的工作人员数量都独立设置`maxWorkers`。

##### \* **fileMapCacheDirectory**

Type：`string`缓存目录的路径`metro-file-map`，默认为`os.tmpdir()`.



#### 2\. 解析配置（Resolver Options）

##### \* **assetExts**

类型：`Array<string>`

要包含在捆绑包中的资源文件扩展名列表。例如，包含`'ttf'`允许 Metro 捆绑包引用`.ttf`文件。这主要用于启用 React Native 的[图像资源支持](https://reactnative.dev/docs/images)。默认列表包括许多常见的图像、视频和音频文件扩展名。完整列表请参见[Metro 的源代码。](https://github.com/facebook/metro/blob/main/packages/metro-config/src/defaults/defaults.js#L16)

* **sourceExts**

类型：`Array<string>`

要包含在`bundle`的源文件扩展名列表。例如，包含`'ts'`允许 Metro 将文件包含`.ts`在`bundle`中。

这些扩展名的顺序定义了磁盘上文件的匹配顺序。有关详细信息，请参阅[模块解析](https://facebook.github.io/metro/docs/resolution)。

默认为`['js', 'jsx', 'json', 'ts', 'tsx']`.

##### \* **resolverMainFields**

类型：`Array<string>`

Metro中的字段列表`package.json`将被视为描述包的入口点。默认值为`['browser', 'main']`，因此解析器将使用该`browser`字段（如果存在），`main`否则使用该字段。

`browser`[Metro 的默认解析器根据字段规范](https://github.com/defunctzombie/package-browser-field-spec)处理每个字段，包括[替换](https://github.com/defunctzombie/package-browser-field-spec#replace-specific-files---advanced)和[忽略](https://github.com/defunctzombie/package-browser-field-spec#ignore-a-module)特定文件的能力。有关详细信息，请参阅[模块解析](https://facebook.github.io/metro/docs/resolution)。

使用 React Native 时，`resolverMainFields`默认为`['react-native', 'browser', 'main']`.

##### \* **disableHierarchicalLookup**

类型：`boolean`

是否禁用在[文件夹中查找模块](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders)`node_modules`。这仅影响通过目录树的默认搜索，而不影响其他 Metro 选项，例如`extraNodeModules`或`nodeModulesPaths`。默认为`false`.

##### \* **emptyModulePath**

类型：`string`

当需要时使用什么模块作为规范的“空”模块。默认使用`metro-runtime`. 仅当 Metro 安装在项目外部时才需要更改此设置。

##### \* **extraNodeModules**

类型：`{[string]: string}`

包名称到目录的映射，在标准查找后通过`node_modules`以及任何`nodeModulesPaths`. 有关详细信息，请参阅[模块解析](https://facebook.github.io/metro/docs/resolution)。

##### \* **nodeModulesPaths**

类型：`Array<string>`

查看所有目录后检查模块的路径列表`node_modules`。如果第三方依赖项安装在源文件直接路径之外的不同位置，这非常有用。有关详细信息，请参阅[模块解析](https://facebook.github.io/metro/docs/resolution)。

##### \* **resolveRequest**

类型：`?CustomResolver`

用于覆盖默认解析算法的可选函数。这对于使用别名或自定义协议的情况特别有用。例如：

```Plain Text
resolveRequest: (context, moduleName, platform) => {
  if (moduleName.startsWith('my-custom-resolver:')) {
    // Logic to resolve the module name to a file path...
    // NOTE: Throw an error if there is no resolution.
    return {
      filePath: 'path/to/file',
      type: 'sourceFile',
    };
  }
  // Optionally, chain to the standard Metro resolver.
  return context.resolveRequest(context, moduleName, platform);
}
```

有关自定义解析器的更多信息，请参阅[模块解析](https://facebook.github.io/metro/docs/resolution)。

#### 3.转换配置(Transformer Options)

##### \* **dynamicDepsInPackages**

当发现一个动态的依赖库时应该怎么处理.类型：`'throwAtRuntime' | 'reject'`

控制 Metro 如何处理无法在构建时静态分析的依赖项。例如，`require('./' + someFunction() + '.js')`如果不知道会返回什么，就无法解决`someFunction()`。

* \*\*`'throwAtRuntime'`\*\*（默认）：Metro 不会停止捆绑，但`require`调用会在运行时抛出。
* \*\*`'reject'`\*\*：Metro 将停止捆绑并向用户报告错误。

##### \* **getTransformOptions**

获取转换器默认选项。类型：函数（详见下文）。

Metro 调用的函数，用于根据正在构建的特定包计算变压器和串行器的附加选项。

Metro 期望`getTransformOptions`有以下签名：

```Plain Text
function getTransformOptions(
  entryPoints: $ReadOnlyArray<string>,
  options: {
    dev: boolean,
    hot: boolean,
    platform: ?string,
  },
  getDependenciesOf: (path: string) => Promise<Array<string>>,
): Promise<ExtraTransformOptions> {
  // ...
}
```

`getTransformOptions`接收这些参数：

* \*\*`entryPoints`\*\*：到捆绑包入口点的绝对路径（通常只有一个）。
* **options**:
  * \*\*`dev`\*\*：捆绑包是否正在开发模式下构建。
  * **hot**:已弃用, Always true。
  * \*\*`platform`\*\*：目标平台（例如`ios`、`android`）。
* \*\*`getDependenciesOf`\*\*：一个函数，给定模块的绝对路径，返回一个解析为模块传递依赖项的绝对路径的承诺。

`getTransformOptions`应该返回一个解析为具有以下属性的对象的承诺：

```Plain Text
type ExtraTransformOptions = {  preloadedModules?: {[path: string]: true} | false,  ramGroups?: Array<string>,  transform?: {    inlineRequires?: {blockList: {[string]: true}} | boolean,    nonInlinedRequires?: $ReadOnlyArray<string>,  },};
```

* \*\*`preloadedModules`\*\*：一个普通对象，其键代表一组绝对路径。当序列化一个[索引 RAM 包](https://reactnative.dev/docs/ram-bundles-inline-requires#enable-the-ram-format)时，该集合中的模块将被标记为在运行时进行急切评估。
* \*\*`ramGroups`\*\*：绝对路径数组。[序列化索引RAM 包](https://reactnative.dev/docs/ram-bundles-inline-requires#enable-the-ram-format)时，列出的每个模块及其传递依赖项都将被序列化。在运行时，一旦其中任何一个模块被评估，这些模块就会被一起解析。
* \*\*`transform`\*\*：变压器的高级选项。
  * **inlineRequires**:
    * 如果`inlineRequires`是一个布尔值，它控制是否在此包中启用[内联需求。](https://reactnative.dev/docs/ram-bundles-inline-requires#inline-requires)
    * 如果`inlineRequires`是一个对象，则在所有模块中都启用内联需求，但绝对路径显示为 的键的模块除外`inlineRequires.blockList`。
  * \*\*`nonInlinedRequires`\*\*：一组未解析的模块说明符（例如`react`，`react-native`）永远不会内联，即使启用了内联要求也是如此。

##### \* **minifierPath**

类型：（`string`默认`'metro-minify-terser'`：）.`metro-transform-worker`可从解析为在转换后压缩代码的压缩器的路径或包名称。

##### \* **minifierConfig**

类型：`{[key: string]: mixed}`.将传递给压缩器的配置对象（它是可序列化的）。

##### \* **optimizationSizeLimit**

类型：`number`.定义一个阈值（以字节为单位）以禁用对大文件的一些昂贵的优化

**React Native Only**

##### \* **assetPlugins**

Type: `Array<string>`.可以修改Asset资源的模块列表

##### \* **assetRegistryPath**

Type: `string`.在哪里获取资源文件



**Babel-specific transformer options**

类型：`string`

指定一个自定义的转换器,使用 Babel 编译代码并返回 AST 和可选元数据的模块的名称。默认为`metro-babel-transformer`.

有关实现自定义 Babel 变压器的详细信息，请参阅`metro-babel-transformer`和的源代码。`metro-react-native-babel-transformer`

> 该选项仅在默认情况下有效`transformerPath`。自定义可能会忽略它。

##### \* **enableBabelRCLookup**

Type: `boolean` (default: `true`)

是否使用`.babelrc`配置文件

> 该选项仅在默认情况下有效`transformerPath`。自定义变压器可能会忽略它。自定义[Babel 变压器](https://facebook.github.io/metro/docs/configuration/#babeltransformerpath)应该尊重这个选项。

##### \* **enableBabelRuntime**

类型：`boolean | string`

变压器是否应该使用`@babel/transform/runtime`插件。默认为`true`.

如果该值是字符串，则将其视为运行时版本号并传递给`version`配置`@babel/plugin-transform-runtime`。这允许您根据项目中安装的版本优化生成的 Babel 运行时调用。

> 此选项仅在 React Native 的默认设置下有效。`transformerPath`它可能对使用自定义、自定义`babelTransformerPath`或自定义[Babel 配置文件](https://babeljs.io/docs/en/config-files)的项目没有影响。

##### \* **hermesParser**

类型：`boolean`

是否使用`hermes-parser`包来解析JavaScript源文件，而不是Babel。默认为`false`.

> `transformerPath`该选项仅在默认情况下和Metro 内置的[Babel 变压器](https://facebook.github.io/metro/docs/configuration/#babeltransformerpath)下有效。自定义变压器和自定义[Babel 变压器](https://facebook.github.io/metro/docs/configuration/#babeltransformerpath)可能会忽略它。



#### 4\. 序列化配置（Serializer Options）

##### \* **getRunModuleStatement**

Type: `(number` | `string) => string`

指定附加在包末尾的出事初始require语句的格式，默认情况下是`__r(${moduleId});`

##### \* **createModuleIdFactory**

Type: `() => (path: string) => number`

用于为`require`语句生成模块id

##### \* **getPolyfills**

Type: `({platform: ?string}) => $ReadOnlyArray<string>`

要包含在包中的可选Polyfill列表，默认有一些常用的Polyfill，比如Number,String,Array,Object…

##### \* **postProcessBundleSourcemap**

Type: `PostProcessBundleSourcemap`

该函数可以在bundle和sourcemap写入文件之前，修改内容，适用于整个bundle包

##### \* **getModulesRunBeforeMainModule**

Type: `(entryFilePath: string) => Array<string>`

在引用主模块前要引用的一些模块(要指定每个模块的绝对路径)，另外，当这些模块已经作为bundle的一部分时，才会加载其他的reqire语句

##### \* **processModuleFilter**

Type: `(module: Array<Module>) => boolean`

过滤掉特定模块.用于从输出中丢弃特定模块的过滤器函数。

##### \* **isThirdPartyModule**

类型：`(module: {path: string, ...}) => boolean`

`x_google_ignoreList`确定将哪些模块添加到源映射字段的函数。这支持Chrome DevTools 和其他兼容调试器中的[“Just My Code”调试。](https://developer.chrome.com/blog/devtools-modern-web-debugging/#just-my-code)



#### 5.服务配置（Server Options）

##### \* **port**

Type: `number`.指定监听的端口号

##### \* **useGlobalHotkey**

Type: `boolean`.是否启用`CMD+R`热键来刷新bundle

##### \* **enhanceMiddleware**

Type: `(Middleware, Server) => Middleware`.允许将自定义中间件附加到 Metro 的功能`connect`.

> 可以用作`connect()`实用程序来扩展基础`metroMiddleware`并安装其他中间件处理程序。

```Plain Text
enhanceMiddleware: (metroMiddleware: Middleware, metroServer: MetroServer) => {
  return connect()
    .use(metroMiddleware)
    .use('/custom-endpoint', customEndpointMiddleware());
},
```

该`Middleware`类型是 的别名`connect.HandleFunction`。

##### \* **runInspectorProxy**

Type: `boolean` (default: `true`).在Metro中运行Inspector代理服务器，以便能够检查React Native代码。

##### \* **rewriteRequestUrl**

类型：`string => string`

在使用 . 对非标准查询字符串分隔符进行规范化之后，每次 Metro 处理 URL 时都会调用该函数`jsc-safe-url`。Metro 将使用该函数的返回值，就好像它是客户端提供的原始 URL 一样。这适用于所有传入的 HTTP 请求（在任何自定义中间件之后），以及`/symbolicate`请求负载中和热重载协议中的捆绑 URL。





#### 6.观察配置(Watcher Options)

文件系统观察器的选项。

> 本节中的点符号表示嵌套配置对象，例如`watchman.deferStates`→ `watchman: { deferStates: ... }`。

##### \* **additionalExts**

类型：`Array<string>`

除了 之外，Metro 还应该关注的扩展`sourceExts`，但解析器不会自动尝试这些扩展。

`resolver.sourceExts`因此，与导入模块时的两个行为差异是：

* 仅当完全指定时才需要模块（例如`import moduleA from 'moduleA.mjs'`）。
* 不执行特定于平台的解析。

默认为`['cjs', 'mjs']`.

##### \* **healthCheck.enabled**

类型：`boolean`

是否通过将临时文件写入项目并等待其被观察来定期检查文件系统观察器的运行状况。

默认值为`false`。

##### \* **healthCheck.filePrefix**

类型：`string`

如果启用了观察程序运行状况检查，则此属性控制将写入项目文件系统的临时文件的名称。

默认值为`'.metro-health-check'`。

> 无需将运行状况检查文件提交到源代码管理。如果您选择在项目中启用运行状况检查，请确保添加`.metro-health-check*`到`.gitignore`文件中以避免生成不必要的更改。

##### \* **healthCheck.interval**

类型：`number`

如果启用了观察程序运行状况检查，则此属性控制它们发生的频率（以毫秒为单位）。

默认值为 30000。

##### \* **healthCheck.timeout**

类型：`number`

如果启用了观察程序运行状况检查，则此属性控制 Metro 在认为检查失败之前等待观察到文件更改的时间（以毫秒为单位）。

默认值为 5000。

##### \* **watchman.deferStates**

类型：`Array<string>`

使用 Watchman 时适用。当手表中声明这些[状态](https://facebook.github.io/watchman/docs/cmd/state-enter.html)时， Metro 将[推迟处理文件系统更新。](https://facebook.github.io/watchman/docs/cmd/subscribe.html#defer)这对于在文件系统尚未稳定时（例如在大型源代码控制操作期间）消除构建的反跳很有用。

默认值为`['hg.update']`。



### 2.metro-config的合并（Merging Configurations）

使用`metro-config`，可以将多个配置文件合并在一起。(译者注：并不是用于做bundle包的拆分，**猜测**用于将默认配置和自定义的配置合在一块，这样可以避免自定义配置里重复写一些默认的配置)

| Method                                  | Description                      |
| --------------------------------------- | -------------------------------- |
| `mergeConfig(...configs): MergedConfig` | 返回两个或多个配置对象的合并配置 |

> **注意:**

> 1. 基于数组和基于函数的配置参数不会深度合并，而是覆盖任何预先存在的配置参数
> 2. 允许覆盖和删除在您的环境中可能不需要的默认配置参数，例如`platforms`或`getModulesRunBeforeMainModule`

```Plain Text
// metro.config.js
const { mergeConfig } = require("metro-config");

const configA = {
  resolver: {
    /* resolver options */
  },
  transformer: {
    /* transformer options */
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  }
  /* general options */
};

const configB = {
  resolver: {
    /* resolver options */
  },
  transformer: {
    /* transformer options */
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  }
  /* general options */
};

module.exports = mergeConfig(configA, configB);

```

### 3.Bundling API

#### 1.quick Start

##### \* **打包bundle**

```javascript
const config = await Metro.loadConfig();

await Metro.runBuild(config, {
  entry: 'index.js',
  out: 'bundle.js',
});

```

##### \* **启动一个bundle服务，并观察文件的改变**

```javascript
const config = await Metro.loadConfig();

await Metro.runServer(config, {
  port: 8080,
});

```

##### \* **创建 Connect 中间件并将其插入服务器**

```javascript
const Metro = require('metro');
const express = require('express');
const app = express();
const server = require('http').Server(app);

Metro.loadConfig().then(async config => {
  const connectMiddleware = await Metro.createConnectMiddleware(config);
  const {server: {port}} = config;

  app.use(connectMiddleware.middleware);
  server.listen(port);
  connectMiddleware.attachHmrServer(server);
});
```

#### 2.Reference

下面开放的所有方法都接受一个额外的`config`选项。改对象是由`metro.config.js`导出, 你也可以直接使用`Metro.loadConfig`获取默认的配置。下面的options参数都是可传可不传

##### \* **loadConfig(options)**

Basic options: `config`, `cwd`

加载Metro配置，可以从选项中的`config`指定，也可以从当前工作目录遍历层次结构到根目录，直到找到Metro配置文件(默认为`metro.config.js`)。返回的配置将与Metro的默认值合并

##### \* **async runMetro(config)**

根据配置创建Metro服务器并将其返回。您可以将其的processRequest用作现有服务器中的中间件

##### \* **async runBuild(config, options)**

**Required options:** `entry`, `out`

**Basic options:** `dev`, `optimize`, `platform`, `sourceMap`, `sourceMapUrl`

基于给定的config和options开启一个服务并返回该服务

##### \* **async runServer(config, options)**

**Basic options:**  `host`、`port`、`secureServerOptions`、`secure (DEPRECATED)`、`secureKey (DEPRECATED)`、`secureCert (DEPRECATED)`

启动完整的 Metro HTTP 服务器。它将侦听指定的`host:port`，然后可以查询以检索各个入口点的包。如果`secureServerOptions`存在该选项系列，服务器将通过 HTTPS 公开。

`secure`、`secureKey`、`secureCert`现已弃用，并将在以后的版本中删除。的存在`secureServerOptions`及其选项将使 Metro 通过 https 运行。

##### \* **createConnectMiddleware(config, options)**

**Basic options:**  `port` ,`onBundleBuilt`

不是创建完整的服务器，而是创建一个Connect中间件来响应bundle请求。然后可以将此中间件插入您自己的服务器。 `port`参数是可选的，仅用于记录目的。



### 4.模块 API (Module API)

Metro 的设计目的是允许为 Node（或针对 Web 的捆绑程序）编写的代码大部分无需修改即可运行。下面列出了应用程序代码可用的主要 API。

#### 1.`require()`

与Node的功能类似`require()`。`require()`接受模块名称（或路径）并返回评估该模块代码的结果。引用的模块`require()`将添加到捆绑包中。

```javascript
const localModule = require('./path/module');
const asset = require('./path/asset.png');
const jsonData = require('./path/data.json');
const {View} = require('react-native');
```

的参数`require()`必须是编译时常量。config选项控制使用非常量参数进行`dynamicDepsInPackages`调用是否会在构建时或运行时失败。`require()`



#### 2.高级用法(Advanced usage): `require` at runtime

在构建时，Metro将模块名称[解析](https://facebook.github.io/metro/docs/resolution)为绝对路径，并为每个模块[分配一个不透明的模块 ID 。](https://facebook.github.io/metro/docs/configuration#createmoduleidfactory)

在运行时，`require`指的是采用不透明模块 ID（*不是*名称或路径）并返回模块的函数。如果您已经拥有另一个模块 API（例如`require.resolveWeak`

```javascript
const localModule = require('./path/module');
const id = require.resolveWeak('./path/module');
// Bypass the restriction on non-constant require() arguments
const dynamicRequire = require;
dynamicRequire(id) === localModule; // true
```

#### 3.`module.exports`

`module.exports`与Node.js 中类似。该属性保存当前模块完成评估后将返回的`module.exports`值。`require()`

#### 4.ES Modules syntax (`import` and `export`)

`@babel/plugin-transform-modules-commonjs`我们目前建议在 Metro 项目中使用来支持`import`和`export`。

>   `metro-react-native-babel-preset`在使用、`import`和的 React Native 项目中，`export`开箱即用。

#### 5.import 动态引入

`import()`开箱即用地支持呼叫。在 React Native 中，使用`import()`自动分割应用程序代码，以便在开发过程中加载速度更快，而不会影响发布版本。

> **对于框架实施者**：

> 1. 通过添加到框架从 Metro 请求的初始 HTTP 捆绑 URL 来启用[惰性捆绑。](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0605-lazy-bundling.md)`&lazy=true`
> 2. 在运行时，`import()`调用框架定义的函数来[获取和评估](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0605-lazy-bundling.md#__loadbundleasync-in-metro)分割包。如果您的框架使用该参数，则**必须**`lazy=true`实现此函数，否则将出现运行时错误。

#### 6.require.resolveWeak()

获取模块名称（或路径）并返回该模块的不透明 ID，而不将其包含在包中。这是一个专门供框架使用的 API；应用程序代码很少需要直接使用它。[请参阅有关在运行时使用的](https://facebook.github.io/metro/docs/module-api#advanced-usage-require-at-runtime)`require`部分。





### 5.metro-cli (metro-cli-options)

命令行运行程序`metro`有许多有用的选项。您可以运行`metro --help`以查看所有可用选项。以下是简要概述：

#### 1.`build <entry>`

生成一个包含指定入口点及其后代的 JavaScript 包。

##### \* **options**

| 选项               | 别名 | 描述                                                         | 价值                   |
| ------------------ | ---- | ------------------------------------------------------------ | ---------------------- |
| `out`              | `O`  | 文件名 存储输出的位置                                        | String                 |
| `platform`         | `p`  | 捆绑到哪个平台                                               | `web`, `android`,`ios` |
| `minify`           | `z`  | Metro 是否应该缩小捆绑包                                     | Boolean                |
| `dev`              | `g`  | 创建开发版本的构建 ( `process.env.NODE_ENV = 'development'`) | Boolean                |
| `config`           | `c`  | `metro.config.js`使用地点                                    | String                 |
| `max-workers`      | `j`  | 地铁应并联变压器的工人数量                                   | Number                 |
| `project-roots`    | `P`  | 您的项目的根文件夹                                           | Array                  |
| `source-map`       |      | Metro 是否应该生成源地图                                     | Boolean                |
| `source-map-url`   |      | 可以找到源映射的 URL                                         | String                 |
| `legacy-bundler`   |      | Metro 是否应该使用旧版捆绑器                                 | Boolean                |
| `resolver-option`  |      | [Custom resolver options](https://facebook.github.io/metro/docs/resolution#customresolveroptions-string-mixed) of the form `key=value`.表单的自定义解析器选项key=value | Array                  |
| `transform-option` |      | 表单的自定义转换选项`key=value`                              | Array                  |

#### 2.`serve`

在给定端口上启动 Metro，动态构建捆绑包。

3.`get-dependencies <entryFile>`

列出将为给定入口点捆绑的所有依赖项。

##### \* **options**

| 选项          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `entry-file`  | 根 JS 文件的绝对路径。这也可以作为第一个位置参数给出。       |
| `output`      | 文件名 存储输出的位置，例如。/tmp/dependency.txt             |
| `platform`    | 用于选择模块的平台扩展                                       |
| `transformer` | 指定要使用的自定义变压器                                     |
| `max-workers` | 指定工作池为转换文件而生成的最大工作人员数量。这默认为您计算机上可用的核心数量。 |
| `dev`         | 如果为 false，则跳过所有仅限开发的代码路径                   |
| `verbose`     | 启用日志记录                                                 |

## 三、其他

### 1.metro-Cachingz

Metro的多个缓存机制，可以给我们带来很多方便，下面我们将解释一下缓存是如何工作的。

#### 1.为什么要缓存?

缓存可以带来很大的性能提升，它将打包的速度提高十倍以上，很多系统都在使用非持久化缓存。使用Metro可以进行更加复杂的缓存方式。比如我们可以将缓存存储在服务器上，这样的话，所有的打包器都可以使用共享缓存，因此打包脚本和本地开发的初始构建时间将显著降低。

我们希望将缓存存储在多个位置，以便做缓存的回退，这就是为什么设计成多缓存系统的原因

#### 2.缓存的提取和保存

有一种排序机制来确定使用哪个缓存，为了检索缓存，我们将从top往bottom查找，直到找到结果为止。保存缓存同理，直到找到具有缓存的存储

假设你有两个缓存存储：一个在服务器上，另一个在本地文件系统上。你可以用这种方式指定：

```javascript
const config = {
  cacheStores: [
    new FileStore({/*opts*/}),
    new NetworkStore({/*opts*/})
  ]
}

```

当我们检索缓存时，Metro将首先查看`FileStore`，如果在那里找不到缓存，它将去`NetworkStore`查找，以此类推。如果都没有，它将自己生成一个新的缓存，一但生成缓存，Metro将再次从上到下将缓存存储在all stores中，如果找到缓存，同样如此。比如：如果Metro在`NetworkStore`中找到一个缓存文件，它也会将它存储在`FileStore`中
