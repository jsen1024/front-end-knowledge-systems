[TOC]



# HMTL

## 1.H5新特性

### 一、语义标签

html5语义标签，可以使开发者更方便清晰构建页面的布局

| 标签      | 描述                               |
| --------- | ---------------------------------- |
| <header>  | 定义了文档的头部区域               |
| <footer>  | 定义了文档的尾部区域               |
| <nav>     | 定义文档的导航                     |
| <section> | 定义文档中的节                     |
| <article> | 定义文章                           |
| <aside>   | 定义页面以外的内容                 |
| <details> | 定义用户可以看到或者隐藏的额外细节 |
| <summary> | 标签包含details元素的标题          |
| <dialog>  | 定义对话框                         |
| <figure>  | 定义自包含内容，如图表             |
| <main>    | 定义文档主内容                     |
| <mark>    | 定义文档的主内容                   |
| <time>    | 定义日期/时间                      |

![img](https://img2018.cnblogs.com/blog/1239961/201905/1239961-20190527090526985-576135815.png)

 

### **二、增强型表单**

html5修改一些新的input输入特性，改善更好的输入控制和验证

| 输入类型       | 描述                     |
| -------------- | ------------------------ |
| color          | 主要用于选取颜色         |
| date           | 选取日期                 |
| datetime       | 选取日期(UTC时间)        |
| datetime-local | 选取日期（无时区）       |
| month          | 选择一个月份             |
| week           | 选择周和年               |
| time           | 选择一个时间             |
| email          | 包含e-mail地址的输入域   |
| number         | 数值的输入域             |
| url            | url地址的输入域          |
| tel            | 定义输入电话号码和字段   |
| search         | 用于搜索域               |
| range          | 一个范围内数字值的输入域 |

 

html5新增了五个表单元素

| <datalist> | 用户会在他们输入数据时看到域定义选项的下拉列表 |
| ---------- | ---------------------------------------------- |
| <progress> | 进度条，展示连接/下载进度                      |
| <meter>    | 刻度值，用于某些计量，例如温度、重量等         |
| <keygen>   | 提供一种验证用户的可靠方法生成一个公钥和私钥   |
| <output>   | 用于不同类型的输出比如尖酸或脚本输出           |

html5新增表单属性

| 属性         | 描述                                  |
| ------------ | ------------------------------------- |
| placehoder   | 输入框默认提示文字                    |
| required     | 要求输入的内容是否可为空              |
| pattern      | 描述一个正则表达式验证输入的值        |
| min/max      | 设置元素最小/最大值                   |
| step         | 为输入域规定合法的数字间隔            |
| height/wdith | 用于image类型<input>标签图像高度/宽度 |
| autofocus    | 规定在页面加载时，域自动获得焦点      |
| multiple     | 规定<input>元素中可选择多个值         |

### **三、音频和视频**

html5提供了音频和视频文件的标准，既使用<audio>元素。

音频：<audio src=" "></audio>

```
<audio controls>    //controls属性提供添加播放、暂停和音量控件。
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
您的浏览器不支持 audio 元素。        //浏览器不支持时显示文字
</audio>
```

视频：<video src=" "></video>

```
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
您的浏览器不支持Video标签。
</video>
```

 

### **四、Canvas绘图**

[https://www.runoob.com/w3cnote/html5-canvas-intro.html ](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

 

### **五、SVG绘图**

什么是SVG?

 SVG指可伸缩矢量图形

 SVG用于定义用于网络的基于矢量的图形

 SVG使用XML格式定义图形

 SVG图像在放大或改变尺寸的情况下其图形质量不会有损失

 SVG是万维网联盟的标准

SVG的优势

与其他图像格式相比，是哟个SVG的优势在于：

  SVG图像可通过文本编译器来创建和修改

  SVG图像可被搜索、索引、脚本化或压缩

  SVG是可伸缩的

  SVG图像可在任何的分辨率下被高质量的打印

  SVG可在图像质量不下降的情况下被放大

 

SVG与Canvas区别

*SVG适用于描述XML中的2D图形的语言

*Canvas随时随地绘制2D图形（使用javaScript）

*SVG是基于XML的，意味这可以操作DOM，渲染速度较慢

*在SVG中每个形状都被当做是一个对象，如果SVG发生改变，页面就会发生重绘

*Canvas是一像素一像素地渲染，如果改变某一个位置，整个画布会重绘。

| Canvas                           | SVG                        |
| -------------------------------- | -------------------------- |
| 依赖分辨率                       | 不依赖分辨率               |
| 不支持事件处理器                 | 支持事件处理器             |
| 能够以.png或.jpg格式保存结果图像 | 复杂度会减慢搞渲染速度     |
| 文字呈现功能比较简单             | 适合大型渲染区域的应用程序 |
| 最合适图像密集的游戏             | 不适合游戏应用             |

### **六、地理定位**

使用getCurrentPosition()方法来获取用户的位置。以实现“LBS服务”

```
<script>
var x=document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
  x.innerHTML="Latitude: " + position.coords.latitude +
  "<br />Longitude: " + position.coords.longitude;
  }
</script>
```

 

### **七、拖放API**

 拖放是一种常见的特性，即捉取对象以后拖到另一个位置。

在html5中，拖放是标准的一部分，任何元素都能够拖放。

```
<div draggable="true"></div>
```

当元素拖动时，我们可以检查其拖动的数据。

```
<div draggable="true" ondragstart="drag(event)"></div>
<script>
function drap(ev){
    console.log(ev);
}
</script>
```

| 拖动生命周期 | 属性名      | 描述                                           |
| ------------ | ----------- | ---------------------------------------------- |
| 拖动开始     | ondragstart | 在拖动操作开始时执行脚本                       |
| 拖动过程中   | ondrag      | 只要脚本在被拖动就运行脚本                     |
| 拖动过程中   | ondragenter | 当元素被拖动到一个合法的防止目标时，执行脚本   |
| 拖动过程中   | ondragover  | 只要元素正在合法的防止目标上拖动时，就执行脚本 |
| 拖动过程中   | ondragleave | 当元素离开合法的防止目标时                     |
| 拖动结束     | ondrop      | 将被拖动元素放在目标元素内时运行脚本           |
| 拖动结束     | ondragend   | 在拖动操作结束时运行脚本                       |

 

### **八、Web Worker**

  Web Worker可以通过加载一个脚本文件，进而创建一个独立工作的线程，在主线程之外运行。

 基本使用：

   Web Worker的基本原理就是在当前javascript的主线程中，使用Worker类加载一个javascript文件来开辟一个新的线程，

起到互不阻塞执行的效果，并且提供主线程和新县城之间数据交换的接口：postMessage、onmessage。

javascript:

```
//worker.js
onmessage =function (evt){
  var d = evt.data;//通过evt.data获得发送来的数据
  postMessage( d );//将获取到的数据发送会主线程
}
```

html

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript">
//WEB页主线程
var worker =new Worker("worker.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
worker.postMessage("hello world");     //向worker发送数据
worker.onmessage =function(evt){     //接收worker传过来的数据函数
   console.log(evt.data);              //输出worker发送来的数据
}
</script>
</head>
<body></body>
</html>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

### **九、Web Storage**

 WebStorage是HTML新增的本地存储解决方案之一，但并不是取代cookie而指定的标准，cookie作为HTTP协议的一部分用来处理客户端和服务器的通信是不可或缺的，session正式依赖与实现的客户端状态保持。WebSorage的意图在于解决本来不应该cookie做，却不得不用cookie的本地存储。

websorage拥有5M的存储容量，而cookie却只有4K，这是完全不能比的。

客户端存储数据有两个对象，其用法基本是一致。

localStorage：没有时间限制的数据存储

sessionStorage:在浏览器关闭的时候就会清除。

```
localStorage.setItem(key,value);//保存数据
    let value = localStorage.getItem(key);//读取数据
    localStorage.removeItem(key);//删除单个数据
    localStorage.clear();//删除所有数据
    let key = localStorage.key(index);//得到某个索引的值
```

### **十、WebSocket**

  WebSocket协议为web应用程序客户端和服务端之间提供了一种全双工通信机制。

特点：

 （1）握手阶段采用HTTP协议，默认端口是80和443

 （2）建立在TCP协议基础之上，和http协议同属于应用层

 （3）可以发送文本，也可以发送二进制数据。

 （4）没有同源限制，客户端可以与任意服务器通信。

 （5）协议标识符是ws（如果加密，为wss），如ws://localhost:8023

 

# CSS

## 1.文档流

### 普通流

### 定位流

### 浮动流



## 2.BFC

### FC

​	FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。

### BFC

**BFC**是block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域。

### **触发条件**

　满足下列条件之一就可触发BFC

- 根元素，即HTML元素
- float的值不为none
- overflow的值不为visible
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或fixed

### 作用

​	BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。它与普通的块框类似，但不同之处在于:

- 可以阻止元素被浮动元素覆盖

  ![1SoBEE](https://gitee.com/vr2/images/raw/master/uPic/1SoBEE.png)

![12](https://gitee.com/vr2/images/raw/master/uPic/VEJtQV.png)

- 属于同一个BFC的两个相邻块级子元素的上下margin会发生重叠
- 解决浮动元素造成的父元素高度塌陷问题

## 3.IFC

## 4.GFC

## 5.如何让一个div水平垂直居中

#### 1.定宽高

使用定位+margin

```css
style {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -250px;
    width: 500px;
    height: 500px;
    background: yellow;
    z-index: 1;
}
```





