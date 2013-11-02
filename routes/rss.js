/**
 * @author zhixin <wenzhixin2010@gmail.com>
 * @date 2013-03-28
 */

var fs = require('fs'), 
	RSS = require('rss'), 
	marked = require('marked'),
	config = require('../config'),
	
	POST_PATH = __dirname + '/../html/posts/';

exports.list = function(req, res) {
	var feed = new RSS({
		title: '文翼的博客',
		description: '简介：  坚持看书，每天进步一点点。 要常常提醒自己：无情的岁月，还有不够努力的自己！',
		feed_url: config.site + '/rss.xml',
		site_url: config.site,
		author: 'wenzhixin'
	});

	var text = fs.readFileSync(POST_PATH + 'index.md').toString(), 
		m = text.match(/\([^\(\)]\d{2,4}-\d{1,2}-\d{1,2}\)\s\[[^\[\]]*\]\([^\(\)]*\)/g);
	m.forEach(function(str) {
		var results = /\[([^\[\]]*)\]\(([^\(\)]*)\)/.exec(str),
			title = results[1],
			path = results[2],
			description = fs.readFileSync(POST_PATH + path + '.md').toString(),
			m = description.match(/\d{2,4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}/);
		feed.item({
			title: title,
			description: marked(description),
			url: feed.site_url + '?' + path,
			author: 'wenzhixin',
			date: m ? m[0] : ''
		});
	});
	res.status(200);
	res.end(feed.xml());
};
