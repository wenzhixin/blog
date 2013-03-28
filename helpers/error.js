/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-11-08
 */

var fs = require('fs');
var errorLogfile = fs.createWriteStream('logs/error.log', {flags: 'a'});

exports.handler = function(err, req, res, status) {
	console.log(err);
	
	var meta = '[' + new Date() + '] ' + req.url + ' ' + status + '\n';
	errorLogfile.write(meta + err.stack + '\n');
	
	res.status(status);
	res.end('');
}