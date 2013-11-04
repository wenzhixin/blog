var fs = require('fs'),
	rd = require('rd'),
	_ = require('underscore'),
	marked = require('marked'),
	util = require('./helpers/util'),
	
	TEMPLATE_PATH = __dirname + '/templates/',
	API_DIR = __dirname + '/html/api/',
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

function create(posts) {
	var tpl = fs.readFileSync(TEMPLATE_PATH + 'post.tpl').toString(),
		contents = {
			index: ['<ul class="posts-list">']
		},
		categories = {};
		
	util.getCategoryKeys().forEach(function(key) {
		contents[key] = ['<ul class="posts-list">'];
	});
	
	for (var i in posts) {
		var post = posts[i],
			key = util.getCategoryKey(post.category),
			item = _.template(tpl)({
				title: post.title,
				content: post.content,
				url: post.path,
				time: post.time
			});
			
		contents.index.push(item);
		if (key) contents[key].push(item);
	}
	
	contents.index.push('</ul>');
	fs.writeFile(POST_DIR + 'index.md', contents.index.join('\n\n'));
	
	util.getCategoryKeys().forEach(function(key) {
		categories[key] = contents[key].length - 1;
		contents[key].push('</ul>');
		fs.writeFile(POST_DIR + 'index_' + key + '.md', contents[key].join('\n\n'));
	});
	
	createApi(categories);
}

function createApi(categories) {
	if (!fs.existsSync(API_DIR)) {
		fs.mkdirSync(API_DIR);
	}
	fs.writeFile(API_DIR + 'categories', JSON.stringify(categories));
}

list();
