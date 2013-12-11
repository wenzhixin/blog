## 鼠标滚轮事件 MouseWheel

分类：前端技术 | 标签：MouseWheel | 发布时间：2013-12-03 00:00:00

___

### 前言

编写 [jQuery SideMenu 插件](https://github.com/wenzhixin/side-menu)的时候，
对目录过长的进行鼠标滚动操作，因为默认的 scroll 不好看，所以对滚动条进行了自定义。

先看看[演示 demo](/demos/mousewheel.html)

### css 设置

首先将 parent 的 overflow 设置为 hidden：
```
.parent {
	position: relative;
    height: 100px;
	overflow: hidden;
}
.child {
    position: absolute;
}
</style>

<div class="parent">
  <div class="child">
    <p>数据0</p>
    <p>数据1</p>
    <p>数据2</p>
    <p>数据3</p>
    <p>数据4</p>
    <p>数据5</p>
    <p>数据6</p>
    <p>数据7</p>
    <p>数据8</p>
    <p>数据9</p>
  </div>
</div>
```
这里我们可以通过指定 child 的 top 来显示当前的位置。

### 滚轮事件 MouseWheel

接下来需要对滚轮事件进行监听：
```
var iScroll = 0,
    maxHeight = $('.child').outerHeight(true) - $('.parent').outerHeight(true);
    
$('.parent').on('mousewheel', function(e) {
	var oEvent = event.originalEvent,
        iDelta = oEvent.wheelDelta ? -oEvent.wheelDelta / 120 : oEvent.detail / 3;
        
    iScroll += iDelta * 40;
    iScroll = Math.min(maxHeight, Math.max(0, iScroll));
    $('.child').css('top', -iScroll);
});
```
这里只用到了滚轮事件重要的两个属性：wheelDelta 和 detail

除了 FireFox 之外的浏览器，每次往下滚动，wheelDelta 值都是 -120；  
对于 FireFox 浏览器，每次往下滚动，detail 值都是 3，所以我们通过：
```
oEvent.wheelDelta ? -oEvent.wheelDelta / 120 : oEvent.detail / 3
```
判断向下滚动了多少次，而每次滚动：
```
iScroll += iDelta * 40;
```
再设置 child 的 top 属性就可以了