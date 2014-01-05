## 《锋利的jQuery》学习笔记——jQuery中的动画

分类：前端技术 | 标签：jQuery、动画 | 发布时间：2012-03-13 00:00:00

___

​**1. show和hide方法**

 • ("element").show(speed[, callback])-显示element元素

 • ("element").hide(speed[, callback])-隐藏element元素

(1)show() 和 hide() 方法同时修改多个样式属性即高度、宽度和不透明度

(2)hide() 方法在将内容的 display 属性值设置为 none 之前，会记住原先的
display 属性值，当调用 show() 方法时，会根据之前记住的值来显示元素


​**2. fadeIn方法和fadeOut方法**

 • ("element").fadeIn(speed[,
callback])-渐入，在指定事件内增加元素的不透明度

 • ("element").fadeOut(speed[,
callback])-渐出，在指定事件内降低元素的不透明度

(1)fadeIn() 和 fadeOut() 方法只改变元素的不透明度


​**3. slideUp方法和slideDown方法**

 • ("element").slideUp(speed[, callback])-元素由下到上缩短隐藏

 • ("element").slideDown(speed[, callback])-元素由上至下延伸显示

(1)slideUp() 和 slideDown() 只改变元素的高度


​**4. 动画参数**

 • 在 jQuery 中的任何动画效果，都可以指定 3 种速度参数，即
“slow”、“normal” 和 “fast”（时间长度分别是 0.6 秒、0.4 秒和 0.2
秒）；也可以使用数组作为时间参数（单位：毫秒）


​**5. 自定义动画**

 • animate(params[, speed][, callback]);

(1)params: 一个包含样式属性及值的映射，如 {property1: "value1",
property2: "value2", ...}

(2)speed: 速度参数，可选

(3)callback: 在动画完成时执行的回调函数，可选


​**6. 停止动画和判断是否处于动画状态**

(1)停止元素的动画

 • stop([clearQueue][, gotoEnd]);

 •
参数说明：参数都为可选参数，clearQueue表示是否清空未执行完的动画队列，gotoEnd表示是否直接将正在执行的动画跳转到末状态

(2)判断元素是否处于动画状态

 • (element).is(":animated")


​**7. 其他动画方法**

 • toggle(speed[, callback])-切换元素的可见状态

 • slideToggle(speed[, callback])通过高度变化来切换匹配元素的可见性

 • fadeTo(speed, opacity[,
callback])-把元素的不透明度以渐进方式调整到指定的值
