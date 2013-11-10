/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-11-5
 */

var express = require('express');
var fs = require('fs');
var routes = require('./routes');
var settings = require('./settings');

var app = module.exports = express();
var accessLogfile = fs.createWriteStream('logs/access.log', {flags: 'a'});

app.configure(function() {
	app.set('port', process.env.PORT || settings.port);
	app.use(express.logger({stream: accessLogfile}));
	app.use(express.compress());
	app.use(express.static(__dirname + '/html'));
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.cookieSession({
		secret: settings.cookieSecret,
		cookie: {
			path: '/',
			httpOnly: false,
			maxAge: 3600000 * 7
		}
	}));
	app.use(app.router);
});

routes(app);

if (!module.parent) {
	app.listen(app.get('port'), function() {
		console.log('Server listening on port %d in %s mode', app.get('port'), app.get('env'));
	});
}