## IE 下 splice 的 bug 

分类：浏览器 | 标签：IE、splice | 发布时间：2013-01-16 00:18:00

___

引用：

	array.splice() in Internet Explorer
	I finally got around to investigating an IE bug I’ve been meaning to look into. The root cause was a difference between JScript and ECMAScript as regards array.splice(). The signature for this handy method that removes and inserts array elements in place:
	
	splice(start, deleteCount, value, ...)
	
	According to the standard, only start (the index at which to start removing elements) is a required argument. So:
	
	var a = ["e1", "e2", "e3"];
	a.splice(1);
	
	should result in a being a single-element array containing “e1″. But of course, IE does not see it that way. According to MSDN, deleteCount is also required argument. Thus, the above would have to be:
	
	var a = ["e1", "e2", "e3"];
	a.splice(1, a.length-1);
	
#### 问题：

使用 markdown.js 在 IE 下无法正常显示 pre 代码

#### 原因：

array.splice() 在 IE 下的 bug 引起的

#### 解决：

将 markdown.js 中的第 1495 行：
	
	code.push.apply( code, jsonml.splice( i ) );
	
改为
	
	code.push.apply( code, jsonml.splice( i, jsonml.length - 1) );
