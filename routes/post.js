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
			m = /^##\s(.*)/.exec(text),
			options = {
				title: m ? m[1] + ' —— ' : '',
				list: '',
				post: ''
			};
			
		// if (/\d{2,4}\/\d{1,2}\/\d{1,2}/.test(path)) {
		if (/index$/.test(path)) {
			options.list = text;
		} else {
			options.post = '<div id="post">' + marked(text) + '</div>';
		}
		res.send(_.template(tpl)(options));
	} catch (e) {
		var tpl = fs.readFileSync(TEMPLATE_PATH + '404.tpl').toString();
		res.send(_.template(tpl)());
	}
};