## Web 开发——实现滑动特效

分类：前端技术 | 标签：滑动 | 发布时间：2014-01-21 00:00:00

___

先看下 [demo](/demos/mobile/transform.html)

声明 html 标记和 css 样式：
```html
<div class="container">
    <div id="home" class="page stage-center">
        <h1>Home Page</h1>
    </div>
    <div id="products" class="page stage-right">
        <h1>Products Page</h1>
    </div>
    <div id="about" class="page stage-right">
        <h1>About  Page</h1>
    </div>
</div>
```

```css
.container {
    overflow: hidden;
}
.page {
    position: absolute;
    height: 100%;
    width: 100%;
    -webkit-transform: translate3d(0, 0, 0);
}
.stage-center {
    left: 0;
}
.stage-left {
    left: -100%;
}
.stage-right {
    left: 100%;
}
```

我们将三个 page 页面（width 为 100%）放在 container 中，
并且设置 container 的 overflow 为 hidden，
这样就可以将滚动条隐藏起来了。
滑动的时候只要修改 page 的定位就可以了，
stage-left、stage-center、stage-right
分别表示左侧、中间和右侧三个位置，这样方便通过切换样式来实现滑动。

使用 js 来实现切换：
```javascript
$(function() {
    $('a').click(function() {
        var index = $(this).parent().index();

        $('.page:lt(' + index + ')').attr('class', 'page stage-left');
        $('.page:eq(' + index + ')').attr('class', 'page stage-center');
        $('.page:gt(' + index + ')').attr('class', 'page stage-right');
    });
});
```

到现在只是简单的切换界面，并没有实现任何动画效果。

#### 使用 CSS3 实现动画效果

我们只需要用几行 CSS 代码就可以添加动画和硬件加速了。
```
.page {
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-transition-duration: .5s;
}
```
在 page 中加入 translate3d(0, 0, 0) 来激活 GPU，该方法被称做 WebKit 上的万能方法。

然后添加 transition-duration 属性，
transition-duration 属性规定完成过渡效果需要花费的时间，
我们设置动画时间为 0.5 秒。

使用手机（小米）打开我们的 [demo](/demos/mobile/transform.html) 页面，已经可以看到想要的切换效果了。

#### 使用 jQuery 实现动画效果

对于不支持 css3 的浏览器，可以考虑用 jQuery 来实现动画效果。
在 jQuery 中，可以使用 animate() 方法来自定义动画。语法为：
```js
animate(params, speed, callback);
```
参数：

* params：一个包含样式属性及值的映射。
* speed：速度参数，可选。
* callback：在动画完成时执行的函数，可选。

修改 js 代码，分别对应 stage-left、stage-center 和 stage-right，并且设置 speed 为 0.5 秒。
```js
$('.page:lt(' + index + ')').animate({
    left: '-100%'
}, 500);
$('.page:eq(' + index + ')').animate({
    left: '0'
}, 500);
$('.page:gt(' + index + ')').animate({
    left: '100%'
}, 500);
```
可以看到效果跟使用 css3 是一样的。