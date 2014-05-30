var fs = require('fs'),
	rd = require('rd'),
	_ = require('underscore'),
	marked = require('marked'),
    shelljs = require('shelljs'),
	util = require('./helpers/util'),
    ga = require('./models/ga.js'),
	
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
		commons = [
            '<div class="alert alert-info">',
            '<h2>文翼的博客 <a href="javascript:void(0)" data-toggle="modal" data-target="#blog-info"><i class="glyphicon glyphicon-info-sign"></i></a></h2>',
            '<div></div>',
            '</div>',
			'<div class="posts-type">',
				'<div data-type="tile"><img class="img-tile" src="images/tile.png" /></div>',
				'<div data-type="list"><img class="img-list" src="images/list.png" /></div>',
			'</div>',
			'<ul class="posts-tile">'
		].join('');
		contents = {
			index: [commons]
		},
		apiCategories = {},
		apiPosts = [];
		
	util.getCategoryKeys().forEach(function(key) {
		contents[key] = [commons];
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
	
	apiCategories.index = contents.index.length - 1;
	contents.index.push('</ul>');
	fs.writeFile(POST_DIR + 'index.md', contents.index.join('\n\n'));
	
	util.getCategoryKeys().forEach(function(key) {
		apiCategories[key] = contents[key].length - 1;
		contents[key].push('</ul>');
		fs.writeFile(POST_DIR + 'index_' + key + '.md', contents[key].join('\n\n'));
	});
	
	posts.forEach(function(post) {
		apiPosts.push({
			path: post.path,
			title: post.title
		});
	});
	
	createApi(apiCategories, apiPosts);
}

function createApi(apiCategories, posts) {
	if (!fs.existsSync(API_DIR)) {
		fs.mkdirSync(API_DIR);
	}
	fs.writeFile(API_DIR + 'categories.json', JSON.stringify(apiCategories));
	fs.writeFile(API_DIR + 'posts.json', JSON.stringify(apiPosts));


    ga.getVisits('', function(err, result) {
        if (err) {
            return console.log(err);
        }

        var wordsCmd = 'find html/posts/$1 -name "*.md" -print0 | xargs -0 cat | wc -m';

        fs.writeFile(API_DIR + 'stats.json', JSON.stringify({
            posts: apiCategories.index,
            life: apiCategories.life,
            tech: apiCategories.index - apiCategories.life,
            start: apiPosts[apiPosts.length - 1].path.substring(0, 10),
            end: apiPosts[0].path.substring(0, 10),
            words: shelljs.exec(wordsCmd, {silent:true}).output.replace(/\n/g, ''),
            views: result['ga:pageviews'],
            visits: result['ga:visits']
        }));
    });
}

list();
