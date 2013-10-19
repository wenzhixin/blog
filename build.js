var fs = require('fs'),
	rd = require('rd'),
	
	POST_DIR = __dirname + '/html/posts/';


function list() {
	rd.read(POST_DIR, function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		files = files.filter(function(file) {
			if (endWith(file, '/index.md')) { // 过滤 index.md
				return false;
			}
			return endWith(file, '.md'); // 查找 md 结尾的文件
		});
		files.sort().reverse(); // 按日期排序
		parse(files);
	});
}

function endWith(name, str) {
	return name.substring(name.length - str.length) === str;
}

function parse(files) {
	var posts = [];
	for (var i in files) {
		var content = fs.readFileSync(files[i]).toString();
			lines = content.split('\n');
			
		posts.push(getPost(files[i], lines[0], lines[2]));
	}
	create(posts);
}

function getPost(file, title, desc) {
	var arr = desc.split(' | '),
		post = {
			path: file.substring(POST_DIR.length, file.length - 3),
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

function create(posts) {
	var content = ['## 全部文章 (' + (posts.length + 50) + ')'];
	for (var i in posts) {
		var post = posts[i];
		content.push([
			'* ',
			'(' + post.time + ')',
			'[' + post.title + '](' + post.path + ')',
			'【' + post.category + '】'
		].join(' '));
	}
	content.push('* (其他)[更多文章...](http://qing.weibo.com/2292826740/profile) ')
	fs.writeFile(POST_DIR + 'index.md', content.join('\n\n'));
}

list();
