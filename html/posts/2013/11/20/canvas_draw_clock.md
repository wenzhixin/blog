## 使用 canvas 绘制时钟

分类：前端技术 | 标签：canvas、时钟 | 发布时间：2013-11-20 23:10:00

___

今天我们利用 canvas 来画一个基本的时钟程序。通过一边实践一边学习新的知识。

准备工作，我们先定义需要用到的变量：

```html
<canvas id="canvas" width="300" height="300"></canvas>
<script src="clock.js"></script>
```

```javascript
var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	
	WIDTH = canvas.width,
	HEIGHT = canvas.height,
	RADIUS = WIDTH / 2 - 30;
	NUMBER_RADIUS = RADIUS + 10,
	FONT_HEIGHT = 15;
	
context.font = FONT_HEIGHT + 'px';
```

#### 1. 画圆

**API：**

* beginPath()：起始一条路径，或重置当前路径
* arc(): 创建弧/曲线（用于创建圆或部分圆）
* stroke()：绘制已定义的路径
* fill()：填充当前绘图（路径）

**JavaScript 语法：**

```javascript
context.arc(x, y, r, sAngle, eAngle, counterclockwise);
```

| 参数 | 描述 |
| --- | --- |
| x | 圆的中心的 x 坐标。 |
| y | 圆的中心的 y 坐标。 |
| r | 圆的半径。 |
| sAngle | 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。 |
| eAngle | 结束角，以弧度计。 |
| counterclockwise | 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。 |

**关键代码：**

```javascript
function drawCircle() {
	context.beginPath();
	context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
	context.stroke();
}

function drawCenter() {
	context.beginPath();
	context.arc(WIDTH / 2, HEIGHT / 2, 5, 0, Math.PI * 2, true);
	context.fill();
}
```
	
![](/posts/2013/11/20/1.png)
	
#### 2. 画数字

**API：**

* measureText()：返回包含指定文本宽度的对象
* fillText()：在画布上绘制“被填充的”文本

**JavaScript 语法：**

```javascript
context.fillText(text,x,y,maxWidth);
```

| 参数 | 描述 |
| --- | --- |
| text | 规定在画布上输出的文本。 |
| x | 开始绘制文本的 x 坐标位置（相对于画布）。 |
| y | 开始绘制文本的 y 坐标位置（相对于画布）。 |
| maxWidth | 可选。允许的最大文本宽度，以像素计。 |

**关键代码：**

```javascript
function drawNumbers() {
	var i, angle, numWidth;
		
	for (i = 1; i <= 12; i++) {
		angle = Math.PI / 6 * (i - 3);
		numWidth = context.measureText(i).width;
		context.fillText(i, WIDTH / 2 + Math.cos(angle) * NUMBER_RADIUS - numWidth / 2, 
			HEIGHT / 2 + Math.sin(angle) * NUMBER_RADIUS + FONT_HEIGHT / 3);
	}
}
```
	
![](/posts/2013/11/20/2.png)

#### 3. 画指针

**API：**

* moveTo()：把路径移动到画布中的指定点，不创建线条
* lineTo()：添加一个新点，然后在画布中创建从该点到最后指定点的线条

**关键代码：**

```javascript
function drawHands() {
	var date = new Date(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();
	
	drawHand((h % 12) * 5 + (m / 60) * 5, RADIUS - 60);
	drawHand(m, RADIUS - 40);
	drawHand(s, RADIUS - 20);
}

function drawHand(loc, radius) {
	var angle = Math.PI * 2 * (loc / 60) - Math.PI / 2;
	
	context.moveTo(WIDTH / 2, HEIGHT / 2);
	context.lineTo(WIDTH / 2 + Math.cos(angle) * radius, 
		HEIGHT / 2 + Math.sin(angle) * radius);
	context.stroke();
}
```
	
![](/posts/2013/11/20/3.png)

#### 4. 加上计时器

**API：**

* clearRect()：在给定的矩形内清除指定的像素

**关键代码：**

```javascript
function drawClock() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
	
	drawCircle();
	drawCenter();
	drawNumbers();
	drawHands();
	setTimeout(drawClock, 1000);
}

drawClock();
```

到此，大功告成！查看 [demo](/demos/canvas/clock.html)
