## "泰囧"台词生成器 (html5 版)

分类：html5 | 标签：html5 | 发布时间：2013-01-10 20:23:00

___

最近经常看到别人 PS 来恶搞"泰囧"电影中的台词，觉得挺好玩的

先上效果图：

![](/posts/2013/01/10/1.png)

就想用 html5 自己也做一个来玩玩，查了下 API，发现还是挺简单的。

    context.fillText(text, x, y, width)
    
参数：

	text: 要生成的文字
	
	x: 生成文字的 x 坐标
	
	y: 生成文字的 y 坐标
	
	width: 生成文字的宽度，超过会自动换行

主要代码：

html: 

    <canvas id="canvas" width="360" height="607" class="fl"></canvas>
    <div class="fl ml10">
        <input type="text" placeholder="上了5天班？" maxlength="20" />
        <input type="text" placeholder="以为今天星期五吧？" maxlength="20" />
        <input type="text" placeholder="今天是星期三！哈哈哈哈！" maxlength="20" />
        <button id="create">生成</button>
    </div>

js:

    context.drawImage(image, 0, 0);
    context.fillStyle = '#ffffff';
    context.font = 'bold 20px 微软雅黑';
    $inputs.each(function(i) {
        var text = $(this).val() || $(this).attr('placeholder');
        context.fillText(text, (canvas.width - text.length * 20) / 2, 200 * (i + 1) - 10, canvas.width);
    });
    
___
    
源代码(当然，请用支持 html5 的浏览器)：[demo](/posts/2013/01/10/filltext/filltext.html)