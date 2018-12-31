---
title: 导出或者备份新浪轻博客
date: 2013-11-14 00:00:00
categories: [前端技术]
tags: [导出,备份,轻博客]
---

新浪轻博客没有提供 RSS 或者导出等功能，很不方便对博客进行备份或者迁移。
不过我们可以换种思路，那就是对博客网页进行解析从而得到我们想要的内容，包括：
标题、标签、日期、内容、评论等。

这里使用 [node-scraper](https://github.com/mape/node-scraper) 对网页进行解析。

	var scraper = require('scraper');
	scraper('http://qing.blog.sina.com.cn/2292826740/profile', function(err, $) {
	    if (err) {throw err;}
	
	    $('ul.archivelist .txtz strong a').each(function(i) {
			var href = $(this).attr('href');
			console.log(href);
		});
	});

他的原理是，首先获取（get）整个网页的内容，过滤 script 脚本，
并把 head 和 body 的内容放到 jQuery 中，这样我们就可以相当于在浏览器中，
用 jQuery 对 dom 进行操作了。

先获取归档页面，这样就可以得到所有文章的地址了，在对每篇文章进行独一解析。

这里仅仅提供了一种思路，对于其他需要解析网页内容的当然也适用，关键代码：

	scraper('http://qing.blog.sina.com.cn/2292826740/profile', function(err, $) {
		if (err) throw err;
		
		var hrefs = [];
		
		$('ul.archivelist .txtz strong a').each(function(i) {
			scraper($(this).attr('href'), function(err, $) {
				var $post = $('.post'),
					$content = $post.find('div.caption'),
					post = {};
				
				post.title = $.trim($post.find('span.title').text());
				post.tags = [];
				$post.find('.tags a').each(function() {
					post.tags.push($(this).text());
				});
				post.date = $post.find('p.label strong').text() + '/' + $post.find('p.label em').text();
				post.content = $content.text();
				
				console.log(post);
			});
		});
	});

获取了文章信息之后，在写到文件（markdown）或者写入到数据库即可。