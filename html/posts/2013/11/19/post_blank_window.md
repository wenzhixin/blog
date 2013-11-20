## post 提交数据到新窗口中

分类：前端技术 | 标签：post、新窗口 | 发布时间：2013-11-19 13:08:00

___

在很多时候，我们需要 post 数据到新的窗口中，例如在需要提交大数据到后台中但是无法通过 url 的时候，或者打印报表等等。

这里记录了 flex 和 js 中如何使用 post 方法提交数据到新窗口（新页面）中。

#### 1. flex

flex 中使用 navigateToURL() 方法，可以指定 target 为 blank，
而URLRequest 可以指定 method 方法，并且将数据保存到 data 中。  
关键代码如下：

	var request:URLRequest = new URLRequest(url); // 后台 url
	request.method = URLRequestMethod.POST;
	var data:URLVariables = new URLVariables();
	data.username = 'wenzhixin';
	data.password = 'password';
	request.data = data;
	navigateToURL(request, '_blank');

#### 2. js

js 中使用 form 表单来 submit 数据到指定的 url 中，
这里设置 method 为 post，并且指定 target 为 blank，
需要将 form 元素通过 display:none 隐藏起来。  
关键代码如下：

	<form action="url" method="post" target="_blank" style="display: none;">
		<input type="hidden" name="username" />
		<input type="hidden" name="password" />
	</form>
	<script>
		var $form = $('form');
		$('input[name="username"]').val('wenzhixin');
		$('input[name="password"]').val('password');
		$form.submit();
	</script>
	
**注：**  
使用动态生成 form 的情况在 firefox 下不起作用，
原因是 firefox 需要 form 在 DOM 中进行初始化才起作用。