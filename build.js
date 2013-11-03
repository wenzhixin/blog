var fs = require('fs'),
	rd = require('rd'),
	_ = require('underscore'),
	marked = require('marked'),
	util = require('./helpers/util'),
	
	TEMPLATE_PATH = __dirname + '/templates/',
	POST_DIR = __dirname + '/html/posts/';


function list() {
	rd.read(POST_DIR, function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		files = files.filter(function(file) {
			return /\d{2,4}\/\d{1,2}\/\d{1,2}/.test(file) && util.endWith(file, '.md'); // 查找 md 结尾的文件
		});
		files.sort().reverse(); // 按日期排序
		parse(files);
	});
}

function parse(files) {
	var posts = [];
	for (var i in files) {
		var content = fs.readFileSync(files[i]).toString();
			lines = content.split('\n'),
			index = content.indexOf('___') + 5;
			
		content = content.substring(index);
		content = content.replace(/\n|###\s|####\s|\*\*/g, '');
		content = content.replace(/</g, '&lt;');
		content = content.replace(/>/g, '&gt;');
		content = content.substring(0, 80) + '……';
			
		posts.push(getPost(files[i], lines[0], lines[2], content));
	}
	create(posts);
}

function getPost(file, title, desc, content) {
	var arr = desc.split(' | '),
		post = {
			path: file.substring(POST_DIR.length, file.length - 3),
			content: content,
			title: title.substring(3),
			category: '个人作品',
			time: '置顶'
		};
		
	if (arr.length === 3) {
		post.category = arr[0].split('：')[1];	
		post.time = arr[2].split('：')[1].split(' ')[0];
	}
	return post;
}

// function create(posts) {
	// var content = ['## 全部文章 (' + (posts.length + 50) + ')'];
	// for (var i in posts) {
		// var post = posts[i];
		// content.push([
			// '*',
			// '(' + post.time + ')',
			// '[' + post.title + '](' + post.path + ')',
			// '【' + post.category + '】'
		// ].join(' '));
	// }
	// content.push('* (其他) [更多文章...](http://qing.weibo.com/2292826740/profile) ')
	// fs.writeFile(POST_DIR + 'index.md', content.join('\n\n'));
// }

function create(posts) {
	var content = ['<ul class="posts-list">'],
		tpl = fs.readFileSync(TEMPLATE_PATH + 'post.tpl').toString();
		
	for (var i in posts) {
		var post = posts[i];
		content.push(_.template(tpl)({
			title: post.title,
			content: post.content,
			url: post.path,
			time: post.time
		}));
	}
	content.push('</ul>');
	fs.writeFile(POST_DIR + 'index.md', content.join('\n\n'));
}

list();
