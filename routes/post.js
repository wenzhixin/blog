/**
 * @author zhixin <wenzhixin2010@gmail.com>
 */

var fs = require('fs'), 
	_ = require('underscore'),
	marked = require('marked'),
	
	TEMPLATE_PATH = __dirname + '/../templates/',
	POST_PATH = __dirname + '/../html/posts/';

exports.get = function(req, res) {
	try {
		var path = [req.params.yy, req.params.mm, req.params.dd, 
				req.params.file || 'index'].join('/'),
			tpl = fs.readFileSync(TEMPLATE_PATH + 'index.tpl').toString(),
			text = fs.readFileSync(POST_PATH + path + '.md').toString(),
			m = /^##\s(.*)/.exec(text);
		res.send(_.template(tpl)({
			title: m && m[1],
			content: marked(text)
		}));
	} catch (e) {
		var tpl = fs.readFileSync(TEMPLATE_PATH + '404.tpl').toString();
		res.send(_.template(tpl)());
	}
};