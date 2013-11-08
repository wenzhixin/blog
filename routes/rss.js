/**
 * @author zhixin <wenzhixin2010@gmail.com>
 * @date 2013-03-28
 */

var fs = require('fs'), 
	rd = require('rd'),
	RSS = require('rss'), 
	marked = require('marked'),
	config = require('../config'),
	util = require('../helpers/util'),
	
	POST_DIR = __dirname + '/../html/posts/';

exports.list = function(req, res) {
	var type = req.query.type || '',
		feed = new RSS({
			title: '文翼的博客',
			description: '简介：  坚持看书，每天进步一点点。 要常常提醒自己：无情的岁月，还有不够努力的自己！',
			feed_url: config.site + '/rss.xml',
			site_url: config.site,
			author: 'wenzhixin'
		});
	
	rd.read(POST_DIR, function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		files = files.filter(function(file) {
			return /\d{2,4}\/\d{1,2}\/\d{1,2}/.test(file) && util.endWith(file, '.md'); // 查找 md 结尾的文件
		});
		files.sort().reverse(); // 按日期排序
		
		for (var i in files) {
			var content = fs.readFileSync(files[i]).toString();
				lines = content.split('\n'),
				category = lines[2].split(' | ')[0].split('：')[1],
				m = lines[2].match(/\d{2,4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}/),
				item = {
					title: lines[0].substring(3),
					description: marked(content),
					url: feed.site_url + files[i].substring(POST_DIR.length - 11, files[i].length - 3),
					author: 'wenzhixin',
					date: m ? util.getGMTString(m[0]) : ''
				};
				
			switch (type) {
			case 'tech':
				if (util.getCategoryKey(category) !== 'life') {
					feed.item(item);
				}
				break;
			case 'life':
				if (util.getCategoryKey(category) === 'life') {
					feed.item(item);
				}
				break;
			default:
				feed.item(item);
				break;
			}
		}
		res.status(200);
		res.end(feed.xml());
	});
};
