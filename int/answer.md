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
- 自适应2列布局(float+overflow)

## 3.IFC

**IFC（Inline formatting contexts）：内联格式上下文** IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。 那么IFC一般有什么用呢？ 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

## 4.GFC

**GFC（GrideLayout formatting contexts）：网格布局格式化上下文** 当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

## 5.FFC

**GFC（GrideLayout formatting contexts）：网格布局格式化上下文** 当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

## 6.如何让一个div水平垂直居中

#### 1.定宽高

- 使用定位+margin

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

- 利用绝对定位和盒模型

```CSS
.parent {
    position: relative;
    width: 200px;
    height: 200px;
}
.child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 80px;
    width: 80px;
}
```

#### 2.不定宽高

- 利用绝对定位元素的偏移属性和translate()函数的自身偏移达到水平垂直居中的效果

```css
.parent {
    position: relative;
    width: 200px;
    height: 200px;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

- 使用flex

```css
// 第一种
.parent { display: flex;}
.child { margin: auto }

// 第二种
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

- 使用grid布局

```css
// 1
.parent {
    display: grid
}
.child {
    margin: auto;
}

// 2.
.parent {
    display: grid
}
.child {
    align-self: center;
    justify-self: center;
}

// 3.
.parent {
    display: grid;
    align-items: center;
    justify-items: center;
}

// 4.
.parent {
    align-content: center;
    justify-content: center;
}
```

## 7.绝对定位和固定定位和z-index

 **绝对定位**

- 一旦给元素加上`absolute`或`float`就相当于给元素加上了`display:block`
- `absolute`元素覆盖正常文档流内元素（不用设z-index，自然覆盖）
- 可以减少重绘和回流的开销（如`absolute+ top:-9999em`，或`absolute + visibility:hidden`，将动画效果放到`absolute`元素中）

**属性介绍**

- `static` 默认值。位置设置为static的元素，它始终会处于文档流给予的位置。
- `inherit`，规定应该从父元素继承 position 属性的值。但是任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 “inherit”。
- `fixed`，生成绝对定位的元素。默认情况下，可定位于相对于浏览器窗口的指定坐标。元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。不论窗口滚动与否，元素都会留在那个位置。但当祖先元素具有`transform`属性且不为none时，就会相对于祖先元素指定坐标，而不是浏览器窗口。
- `absolute`，生成绝对定位的元素，相对于距该元素最近的已定位的祖先元素进行定位。此元素的位置可通过 “left”、”top”、”right” 以及 “bottom” 属性来规定
- `relative`，生成相对定位的元素，相对于该元素在文档中的初始位置进行定位。通过 “left”、”top”、”right” 以及 “bottom” 属性来设置此元素相对于自身位置的偏移

> 浮动、绝对定位和固定定位会脱离文档流，相对定位不会脱离文档流，绝对定位相对于该元素最近的已定位的祖先元素，如果没有一个祖先元素设置定位，那么参照物是body层。
>
> 绝对定位相对于包含块的起始位置：

- - 如果祖先元素是块级元素，包含块则设置为该元素的内边距边界。
  - 如果祖先元素是行内元素，包含块则设置为该祖先元素的内容边界。

> 问答题：

- - 定位的元素的起始位置为父包含块的内边距（不会在border里，除非使用负值，会在padding里）
  - 定位的元素的margin还是能起作用的
  - background属性是会显示在border里的
  - z-index是有层叠层级的，需要考虑同一个层叠上下文的层叠优先级
  - z-index是负值不会覆盖包含块的背景色（但是如果有内容，会被包含块的内容覆盖）
  - z-index的值影响的元素是定位元素以及flex盒子
  - 上面一个定位元素，下面一个正常流的元素，定位元素会覆盖在正常流元素之上，除非给z-index是负值
  - 页面根元素html天生具有层叠上下文，称之为“根层叠上下文”

## 8.flex布局

#### 1.容器属性

- flex-direction:决定主轴的方向（即项目排列方向）
  - row：（默认）主轴为`水平`方向，起点在`左侧`
  - row-revers：主轴为`水平`方向，起点在`右侧`
  - column：主轴为`垂直`方向，起点在`上方`
  - column：轴为`垂直`方向，起点在`上方`

- flex-wrap：决定容器内项目是否可换行
  - nowrap：（默认） 不换行
  - wrap：`项目总尺寸`超过`主轴尺寸`时换行，第一行在`上方`
  - wrap-reverse：换行，第一行在`下方`
- flex-flow: flex-direction 和 flex-wrap 集合
  - 默认 flex-direction: row nowrap
- justity-content:指定主轴方向项目的对齐方式
  - flex-start：(默认)主轴方向`起点`对齐
  - flex-end：主轴方向`终点`对齐
  - center：主轴方向`居中`对齐
  - space-between：左右先对齐，项目`间隔平分`剩下距离
  - space-around：项目两侧`间隔相等`，项目间隔是`项目与边缘`的间隔的`两倍`
- align-items：指定交叉轴上项目的对齐方式
  - stretch(默认)：如果项目未设置高度或者设为 auto，将占满整个容器的高度
  - flex-start：交叉轴方向`起点`对齐
  - flex-end：交叉轴方向`起点`对齐
  - center：交叉轴方向`居中`对齐
  - baseline第一个项目文字`基线对齐`(文字底部)
- align-content: 多根轴线指定对齐方式 **如果项目只有一根轴线`flex-wrap: nowrap`，该属性将不起作用**
  - stretch(默认)：如果项目未设置高度或者设为 auto，将占满整个容器的高度,`轴线平分`容器的`垂直`方向上的`空间`
  - flex-start：轴线在交叉轴方向`起点`对齐
  - flex-end：轴线在交叉轴方向`终点`对齐
  - center：轴线在交叉轴方向`居中`对齐
  - space-between：轴线两端对齐，`间隔平分`垂直空间
  - space-around：轴线两侧`间隔相等`，轴线间隔是`轴线与边缘`的间隔的`两倍`

#### 2.项目属性

- order：定义项目在容器中的排列顺序`数值越小，排列越靠前，默认值为 0`
  - 默认为0, <integer>
- flex-grow 指定项目放大比例`默认为0，即如果存在剩余空间，也不放大`  <number>
  - 所有项目的flex-grow属性都为1，项目将`平分`剩余空间
  - 有一个项目的flex-grow属性为4，其他项目都为1，则前者占据的剩余空间将比其他项多4倍
- flex-shrink 指定项目缩小比例`默认为1，即如果空间不足，该项目将缩小`  <number>; *负值对该属性无效 *
  - 所有项目的flex-shrink属性都为1，都将`等比例缩小`
  - 有一个项目的flex-shrink属性为0，其他项目都为1，前者不缩小```````
- flex-basis: 在分配多余空间前，指定项目占据的主轴空间`浏览器根据这个属性，计算主轴是否有多余空间,默认值为auto，即项目的本来大小`
  - flex-basis: <length> | auto
  - 主轴为`水平方向`的时候，flex-basis的值会`让`项目的`宽度设置`失效
  - flex-basis 需要配合 flex-grow 和 flex-shrink 使用,但flex-grow 和 flex-shrink只有一个会起作用(`不可能既放大又缩小`)
  - 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
  - 当存在剩余空间下，优先分配flex-basis不为auto的项目后，再分配剩余空间
- align-self: 指定项目和其他项目不一样的对齐方式
  - 单个项目定义的属性，表示继承父元素`align-items`属性，如果没有父元素，则等同于 stretch。
    如 项目1是`align-items:flex-end`，其他都是`align-items:flex-start`
  -  align-self: auto | flex-start | flex-end | center | baseline | stretch; */\* default auto \*/*

#### 3.flex多列布局遇到的问题和解决方案

<img src="https://gitee.com/vr2/images/raw/master/uPic/20210120113752.png" alt="img" style="zoom: 50%;" />

这种情况是因为我们使用了justify-content: space-between;为什么使用这个设置，是因为我们不用去专门计算元素之间的间距，flex会帮我们计算好，但是正是因为这样，当我们随后一行元素，不足时，就会出现上面的这种情况，那么问题清楚了，是因为最后一行元素不足造成的，那我们可以认为的给最后一行加上一个空元素，用来占位，就可以完美解决上面的问题：

这里我们使用伪元素，来实现占位，注意伪元素只用设置宽度，千万别设置高度。具体如下：

```css
.container::after{
      content: '';
      width:320px;
    }

```

<img src="https://gitee.com/vr2/images/raw/master/uPic/20210120115452.png" alt="img" style="zoom:50%;" />

## 9.grid布局

[grid布局太多了](https://juejin.cn/post/6854573220306255880)

## 10.css动画

#### 一、transform

**属性**：

- 旋转`rotate`（中心为原点）
- 扭曲、倾斜`skew`（skew(x,y), skewX(x), skewY(y)）
- 缩放`scale`（scale(x,y), scaleX(x), scaleY(y)）
- 移动`translate`（translateX,translateY）
- 矩阵变形`matrix`

**用法：**

- `transform:rotate()`：旋转；其中“10deg”表示“10度”。

  ```css
  transform: rotate(10deg);
  ```

  

<img src="https://gitee.com/vr2/images/raw/master/uPic/20210120175125.png" style="zoom:50%;" />

- `transform:skew()`：倾斜；

  ```css
  transform: skew(20deg);
  ```

  ![image-20210120175455833](https://gitee.com/vr2/images/raw/master/uPic/20210120175459.png)

- `transform:scale()`：比例；“1.5”表示以1.5的比例放大，如果要放大2倍，须写成“2.0”，缩小则为负“-”。

  ```css
  transform: scale(1.5);
  ```

  ![image-20210120175634303](https://gitee.com/vr2/images/raw/master/uPic/20210120175637.png)

- `transform:translate()`：变动，位移；如下表示向右位移120像素，如果向上位移，把后面的“0”改个值就行，向左向下位移则为负“-”

  ```css
  transform: translate(120px,0);
  ```

- 1

  ```css
  .box:hover {
    transform:rotate(360deg) skew(-20deg) scale(3.0) translate(100px,0);
  }
  ```

#### 二、transition

##### css的transition允许css的`属性值`在`一定的时间区间`内`平滑地`过渡。

**四个属性**

- **ttransition-property**是用来指定当元素其中一个属性改变时执行transition效果，其主要有以下几个值：none(没有属性改变)；all（所有属性改变）这个也是其默认值；indent（元素属性名）。当其值为none时，transition马上停止执行，当指定为all时，则元素产生任何属性值变化时都将执行transition效果，ident是可以指定元素的某一个属性值。

- **transition-duration**是用来指定元素,转换过程的持续时间

- transition-timing-function:

  ![clipboard.png](https://gitee.com/vr2/images/raw/master/uPic/20210120190020.png)

- **transition-delay**[延迟] ：是用来指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果

```CSS
   .box {
      width: 100px;
      height: 100px;
      background-color: pink;
      transition: all 0.5s ease-in-out 0s;
    }
    .box:hover {
      width: 500px;
    }
```

#### 三、animation

CSS3中添加的新属性`animation`是用来为元素实现动画效果的，但是`animation`无法单独担当起实现动画的效果。承载动画的另一个属性——`@keyframes`。使用的时候为了兼容可加上`-webkit-、-o-、-ms-、-moz-、-khtml-`等前缀以适应不同的浏览器。

- 创建动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。
- 通过 @keyframes 规则，您能够创建动画。
- @keyframes定义一个动画，并定义具体的动画效果，比如是放大还是位移等等。
- @keyframes 它定义的动画并不直接执行，需要借助animation来运转。
- 在动画过程中，您能够多次改变这套 CSS 样式。
- 以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。

```
@keyframes animationname {keyframes-selector {css-styles;}}
```

| 值                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| animationname      | 必需。定义动画的名称。                                       |
| keyframes-selector | 必需。定义动画的名称。 合法的值： 1. 0-100% 2. from（与 0% 相同） 3. to（与 100% 相同） |
| css-styles         | 必需。一个或多个合法的 CSS 样式属性。                        |

**属性** *animation*: name duration timing-function delay iteration-count direction fill-mode;

- animation-name: 动画名称(默认值为none)
- animation-duration: 持续时间(默认值为0)
- animation-timing-function: 时间函数(默认值为ease)
  - linear 匀速
  - ease 逐渐慢一下
  - ease-in加速
  - ease-out 减速
  - ease-in-out先加速后减速
- animation-delay: 延迟时间(默认值为0)
- animation-iteration-count: 循环次数(默认值为1)   *infinite | <number>[,infinite | <number>]*
- animation-direction: 动画方向(默认值为normal)
  - normal: 正向播放
  - reverse: 反向播放
  - alternate: 若动画只播放一次，则和正向播放一样。若播放两次以上，偶数次效果为反向播放
  - alternate-reverse: 若动画只播放一次，则和反向播放一样。若播放两次以上，偶数次效果为正向播放
- animation-play-state: 播放状态(默认值为running)
  - running
  - paused
- animation-fill-mode: 填充模式(默认值为none)
  - none: 动画结束后，元素移动到初始状态
      [注意]初始状态并不是指0%的元素状态，而是元素本身属性值
  - forwards: 元素停在动画结束时的位置
      [注意]动画结束时的位置并不一定是100%定义的位置，因为动画有可能反向运动，也有可能动画的次数是小数
  - backwards:在animation-delay的时间内，元素立刻移动到动画开始时的位置。若元素无animation-delay时，与none的效果相同
      [注意]动画开始时的位置也不一定是0%定义的位置，因为动画有可能反向运动。
  - both: 同时具有forwards和backwards的效果

例子：一个小球从向右匀速移动 `200px`，然后移动回来，再移动过去，最后停留在 `200px` 处。

```css
   .box {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: pink;
        animation: move 2s linear 3 alternate both;
      }
      @keyframes move {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(200px, 0);
        }
      }
```



## 11.css动画animation 和 transition有何区别

- transition关注的是CSS property的变化，property值和时间的关系是一个三次贝塞尔曲线。

- animation作用于元素本身而不是样式属性，可以使用关键帧的概念，应该说可以实现更自由的动画效果。

- 至于实现动画效果用哪一种，我的感觉是要看应用场景，但很多情况下transition更简单实用些
- **animation**强调流程与控制，Duration＋TransformLib＋Control＝多个关键帧的Animation而Transition强调过渡，Transition＋Transform＝两个关键帧的Animation。顾明思议，两个全部以CSS打头动画属性还是有不同的关注点的。
- **animation**主要用于从视觉上描述一段过程，它可以是循环的，也可以是单次的。也就是说，**animation**更侧重于中间过程，而**transition**更侧重于其实和结束两个状态。
- **animation**从flash延伸出来，属于关键帧动画的范畴，它本身用于可以用于替代一些**javascript**代码，实现动画。而transition则是从hover延伸出来的。
- **Animation**可以和**@keyframe**结合，做出超出现在人想象的动画效果。今后，**animation**和**transition**的区别也将愈发明显。

## 12.两列布局单列定宽单列自适应



## 13.两列自适应布局

## 14.三列布局

## 15.三栏布局（圣杯和双飞翼布局）



## 15.分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

结构： display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击， visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承： display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能： displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少

## 16.如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性

```css
单行： overflow: hidden; text-overflow:ellipsis; white-space: nowrap; 多行： display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; //行数 overflow: hidden; 兼容： p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;} p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px; background: -webkit-linear-gradient(left, transparent, #fff 55%); background: -o-linear-gradient(right, transparent, #fff 55%); background: -moz-linear-gradient(right, transparent, #fff 55%); background: linear-gradient(to right, transparent, #fff 55%); }
```

```javascript
// 使用split + 正则表达式将单词与单个文字切割出来存入words
// 加上 '...'
// 判断scrollHeight与clientHeight，超出的话就从words中pop一个出来
// <p>这是一段测试文字，this is some test text，测试文字，测试文字测 </p>
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}

```

