## canvas 如何在保留 background 的情况下重置画布

分类：前端技术 | 标签：canvas、background | 发布时间：2014-02-16 00:00:00

___

前几天在用 canvas 实现动画的时候，因为是需要设置画图的背景，
所以一开始想到的就是使用 canvas 的 drawImage() 方法：
```
context.drawImage(img, x, y, width, height);
```

但是后面发现了在此基础上画动画的话，假如通过：
```
context.clearRect(0, 0, width, height);
```
来重置画布的话，背景也被清除掉了，再次重画背景就先出现一闪一闪的问题，
并不是自己想要的结果。

查阅了相关资料：

> HTML5 Canvas is a Non-Retained Drawing Mode Graphics API.

意思是说画布是一种类似油彩画的画图模式。就像现实世界中的油彩画一样，
当你使用 ```stroke()``` 或者 ```fill()``` 或者 ```drawImage()```
的时候，其实就像油彩一样变为画布的一部分。例如，一个画家画了一个人，
你说让那个人移动或者变大，是不可能的，你不能改变它，也不能擦掉它。
当然你可以重新拿一张白纸重新开始画，就相当于调用```clearRect()```。

那么，应该如何解决这个问题呢？

* 1. 假如背景图片是静态的，那么就使用 css 对 canvas 的样式 ```background``` 属性进行设置。
例如我上面遇到的问题就是这种情况。

* 2. 假如背景是动态的，可以考虑使用 Retained Drawing Mode 的 SVG 或者 HTML。
使用这些元素，就可以改变背景的位置或者大小。
