### javascript

#### 字节

###### 笔试

- 写new\*** ***的执行过程 

- 写一个处理加法可能产生精度的函数，比如0.1 + 0.2 = 0.3

- 1000000000 + 1000000000 ***允许返回字符串。处理大数。大数问题其实就是通过字符串来处理，从后往前加，然后处理进位的问题。\***

###### 面试 （一面）

- Cookie和Session有什么区别？

- 浏览器如何做到 session 的功能的？

- 说一下浏览器缓存；

- 跨域的处理方案有哪些？

- CORS 是如何做的？

- 对于 CORS ，Get 和 POST 有区别吗？

- 请解释一下csrf 和 xss；

- 怎么防止 csrf 和 xss？

- 了解 HTTPS 的过程吗？

- webpack 如何做性能优化？

- react 里如何做动态加载？

- 动态加载的原理是什么？

- es module 和 commonjs 的区别

- 讲项目

- es6新特性

- vue响应式原理

- 讲lazyloader的实现

- 用了docker做了什么

- 用了webpack做了什么

- hooks和class Component的区别.

- 虚拟滚动如何实现.(简历上有写)

- 写防抖节流,节流两种实现都让写了.

- 写快排.

- 请求头有哪些

- vue是怎么监听数组改变更新视图的 -

- diff算法实现

- 怎么禁止js读取到cookie

- mysql的索引

- 防抖和节流函数封装

- web-push原理

  - web-push是一个协议，只是在草案中有（ VAPID 协议保证用户信息的安全，只能通知到对应的浏览器） 

     授权：询问用户索取权限->生成公钥后验签的用户唯一标识信息->base64转码->ajax给后台数据库保存 

     是发布订阅模式，浏览器授权，去订阅服务器的消息通知，然后接收通知

- web-push和websocket区别

- 不用websocket，不用http2，不用worker，那么如何实现服务端推送消息

- 骨架屏是什么，如何改善首屏优化和白屏

- node中的require加载文件的顺序

- node项目如何部署

- ngix配置路径证书

- http状态码， content-type有哪几种

- x-www-urlecoded-form和application/json在post中的区别

- vue-router有几种形式

- 两种刷新的话有什么现象，history不会变化（已解决，已理清楚）

  ```
  浏览器在刷新的时候，会按照路径发送真实的资源请求，如果这个路径是前端通过 history API 设置的 URL，那么在服务端往往不存在这个资源，于是就返回 404 了。上面的参数的意思就是如果后端资源不存在就返回 history.html 的内容。
  
  因此在线上部署基于 history API 的单页面应用的时候，一定要后端配合支持才行，否则会出现大量的 404。以最常用的 Nginx 为例，只需要在配置的 location / 中增加下面一行即可：
  
  try_files $uri /index.html;
  ```

- hash可能就会回到原始目录，因为hash的url在服务器端找不到对应的文件，这种问题怎么解决

- reduce实现map

- this

  ```javascript
  window.data=5
  var foo={
    data:6,
    click(){
    console.log(this.data)
  }
  }
  div.addEventListener('click',foo.click)
  // 点击div写出控制台的打印值
  // 如何输出5，如何输出6
  ```

- 写出一个正则匹配出图片的后缀,匹配以.jpg或者.png结尾的链接

  ```javascript
  var str='[https://happy.com/img/like.png](https://happy.com/img/like.png)'
  var reg=/\.(png|jpg)$/
  ```

- webpack 的原理是什么？loader 和 plugin 的作用是什么？

- docker 部署有什么好处？

- docker 的底层原理是什么？

- 那隔离环境主要隔离什么环境？

- 有没有了解过 ufs？

- 如果你要读取一个特别大的文件应该如何做

- 你们有没有对服务端的异常进行监控［比如用 sentry 监控异常，elk 打日志，prometheus 监控性能并用 alertmanager 报警，再写一个webhook到钉钉］

- 中间人劫持，怎么防止。x-frame-option?白屏的喔，怎么办？也不一定嵌入iframe啊，可以嵌入脚本、图片，怎么阻止？

  x-frame-option、重定向、https，请求前加密（https、加密代理）、请求中规避（请求拆包）、请求后弥补（[前端]()做一些逻辑）。嵌入非iframe的，如果已经突破了前面两关，走[前端]()逻辑：触发DOMNodeInserted、DOMContentLoaded、DOMAttrModified事件。或者是给能src的标签加上自己的data-xx属性标记区分

- hook缺点，hook代码难维护怎么解决【描述】

- redux为什么每次reducer要返回一个新对象，面对大量节点如何优化【描述】

  immuatable和shouldupdate配合、immuatable数据一些对比问题【描述】
  这是黄金搭配的方案了，用过的人应该能理解到。几个看代码判断 === 是否是true的问答题，原则：只要一个节点变了，那么从他开始回溯的父节点全都是变的

- http缓存、离线包原理、移动端首屏幕加载速度优化、webview冷启动、预热【描述】
  很基础的了，送分题
- websocket和http2解释一下，socket是什么？
- 网络七层协议
- TCP和IP分别属于哪一层？TCP和UDP的区别?分别适用于什么情况？
- vue组件通信怎么实现 父子和不父子
- 



###### 算法

- 大到小数组排序算法

- 蛇形二叉树组合算法

- 斐波那契实现，复杂度， **斐波那契递归时间复杂度（O(2^N)）**

- 实现一个sleep函数

  ```js
  async function sleep(time){
   // 这里是实现
   return new Promise((res)=>{
     setTimeout(()=>{
       res()
     },time)
   })
  }
  console.log(1)
  await sleep(3000)
  console.log(2)
  ```

- 数组乱序（考察洗牌算法）
- .[leetcode](https://www.nowcoder.com/jump/super-jump/word?word=leetcode) 找出数组中两个元素的和为target的组合
- 场景题，写一个组件实现如下功能
  - ![组件](https://uploadfiles.nowcoder.com/images/20200911/586453626_1599810735019_270011980CF0F7A390E5CCB99CACC540)
- 找出数组中最大的连续子数组和
- 实现加法函数使得sum(2)(3)和sum(2,3)都输出5
- 找出二叉树路径和为n的路径
- 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。
- sum(1)(2)(3)(...n)
- 写一段匹配URL的正则，包括协议、域名、端口、path、hash、querystring
- 寻找两个[二叉树](https://www.nowcoder.com/jump/super-jump/word?word=二叉树)节点的第一个公共父节点。
- n级台阶，从0开始走起，一次可以走一步或者两步，那么走完n级台阶一共有多少种走法？
- sort()是内部使用了什么[算法](https://www.nowcoder.com/jump/super-jump/word?word=算法) 时间复杂度是多少 indexOf()的时间复杂度是多少

###### 面试（二面）

- 询问项目。项目的难点以及是怎么解决的？项目有哪些亮点？

- 写一个es6继承

- 写一个大数相乘的解决方案。传两个字符串进来，返回一个字符串。

- js **异步编程原理** 

  -  引擎负责解析，执行 [JavaScript]() 代码，但它并不能单独运行，通常都得有一个宿主环境，一般如浏览器或 Node 服务器，前文说到的单线程是指在这些宿主环境创建单一线程，提供一种机制，调用 [JavaScript]() 引擎完成多个 [JavaScript]() 代码块的调度，这种机制就称为事件循环（ Event Loop ）。 
  - 关于事件循环流程分解如下： 
    - 宿主环境为[JavaScript]() 创建线程时，会创建堆 (heap) 和栈 (stack) ，堆内存储 [JavaScript]() 对象，栈内存储执行上下文； 
    - 栈内执行上下文的同步任务按序执行，执行完即退栈，而当异步任务执行时，该异步任务进入等待状态（不入栈），同时通知线程：当触发该事件时（或该异步操作响应返回时），需向消息队列插入一个事件消息； 
    - 当事件触发或响应返回时，线程向消息队列插入该事件消息（包含事件及回调）； 
    - 当栈内同步任务执行完毕后，线程从消息队列取出一个事件消息，其对应异步任务（函数）入栈，执行回调函数，如果未绑定回调，这个消息会被丢弃，执行完任务后退栈；
    - 当线程空闲（即执行栈清空）时继续拉取消息队列下一轮消息（next tick ，事件循环流转一次称为一次 tick ）。

- 优化项目

- vue原理，包括计算属性，依赖收集

- 用`js`实现sleep函数

- 304状态码,以及强缓存和协商缓存.

- 实现一个antd modal组件.(提到了要用portal,但忘了语法)

- 实现redux的connect.(没看过,不会)

- 实现一个36进制加法.(这个比较简单,很快做好了)

- 实现左边固定,右边自适应的布局.(这个也简单)

- tcp如何保证安全连接

- dns查询过程，使用的协议

- 浏览器如何构建和渲染页面

- cdn原理【描述】

- 为什么多域名部署【描述】

- event loop【描述】

- `Babel`是怎么将`ES6`转换为`ES5`的？

- 

  

###### 三面

- 手写快排，时间复杂度，优化
- 手写实现 jsonp
- 项目部署，线上问题等等
- websocket 握手过程
- 对 vuex 的理解，单向数据流
- 设计一个单点登录的系统，类似阿里系那种
- 手写一个算法，这道牛客题霸上有原题，大家可以去看看：NC66 两个链表的第一个公共结点
- 项目有什么难点
- 实现一个带并发限制的异步调度器Scheduler,保证同时运行的任务最多有两个.(这个之前没接触过过,做了20分钟左右,但也只做对90%吧,少了个判断条件,而且太紧张,忘了可以调试了)
- js实现带并发限制的调度器，其实就是使用promise限制并发
- 移动端适配方案
- 如何提升移动端用户的使用体验，让用户能更快的看到页面
- 如何设计权限系统，如何维护和定义、表的数据结构是怎样的【举例】【描述】
  我们的[项目](https://www.nowcoder.com/jump/super-jump/word?word=项目)是rbac1类型的权限系统。展示是树形结构，但权限是扁平化的，只需要勾选权限，可以达到灵活修改权限
- 权限系统业界内怎么设计，常见的几种【描述】
- 从输入域名到页面展现之间发生了什么