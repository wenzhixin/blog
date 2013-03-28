/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-03-28
 */

var rss = require('./rss'),
	RSS_URL = '/rss.xml';

module.exports = function(app) {
	app.get(RSS_URL, rss.list);
};