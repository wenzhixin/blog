## 将本地时间转换为 GMT 时间

分类：前端技术 | 标签：JavaScript、本地时间、时区 | 发布时间：2013-11-05 13:30:00

___

在写 RSS 订阅接口的时候，发现最终输出文章的 RSS 时间（GMT时间），在本地上显示的时间和在服务器上显示的时间不一致。
原因是时区不一致，那么在 JavaScript 中，如何将时间转换为统一的时间呢？

#### 1. 查看本地和服务器的时区

通过 date 命令，可以知道：

* 本地的时区是：GMT+0800 (CST)
* 服务器的时区是：GMT+0400 (MSK)

首先，需要明确的一点是，文章上的时间是基于本地时间的，也就是说是 GMT+0800 (CST)。

#### 2. 代码调试
	
便于理解，我们来举个栗子，例如文章的时间为 2013-11-05 00:00:00，
那么我们最终想要的时间是 2013-11-04 16:00:00 GMT

在本机上

	var date = new Date('2013-11-05 00:00:00'); // Tue Nov 05 2013 00:00:00 GMT+0800 (CST)
	date.toGMTString(); // Mon, 04 Nov 2013 16:00:00 GMT

在服务器上：

	var date = new Date('2013-11-05 00:00:00'); // Tue Nov 05 2013 00:00:00 GMT+0400 (MSK)
	date.toGMTString(); // Mon, 04 Nov 2013 20:00:00 GMT
	
通过对比可以看到，在服务器上也把需要转换的时间当初是本地时间了，所以导致了最终转换的 GMT 时间不一致。

#### 3. 如何解决

Date 对象中有 getTimezoneOffset() 方法，返回的是本地时间与 GMT 时间或 UTC 时间之间相差的分钟数。
	
	var date = new Date('2013-11-05 00:00:00'); // Tue Nov 05 2013 00:00:00 GMT+0400 (MSK)
	
	var localTime = date.getTime() - 8 * 3600000 - date.getTimezoneOffset() * 60000; // 先将文章的时间转换为服务器的本地时间 
	
	var newDate = new Date(localTime); // Mon Nov 04 2013 20:00:00 GMT+0400 (MSK)
	
	newDate.toGMTString(); // Mon, 04 Nov 2013 16:00:00 GMT

可以看到，在服务器上也得到我们想要的结果了。

#### 4. 最终成果

	function getGMTString(time, localTimezone) {
		var date = new Date(time);
		return new Date(date.getTime() - localTime * 3600000 - 
			date.getTimezoneOffset() * 60000).toGMTString(); 
	}
