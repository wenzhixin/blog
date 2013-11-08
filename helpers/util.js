/**
 * @author zhixin <wenzhixin2010@gmail.com>
 */

var categories = {
	web: '前端技术',
	ui: '交互设计',
	mobile: '移动开发',
	server: '后台技术',
	sql: '数据库',
	os: '操作系统',
	life: '生活随笔'
};

module.exports = {
	endWith: function(name, str) {
		return name.substring(name.length - str.length) === str;
	},

	getGMTString: function(date) {
		var d = new Date(date);
		return new Date(d.getTime() + ((-d.getTimezoneOffset() / 60 - 8) * 3600000)).toGMTString();
	},
	
	getCategoryKeys: function() {
		var keys = [];
		for (var key in categories) {
			keys.push(key);
		}
		return keys;
	},
	
	getCategoryKey: function(name) {
		for (var key in categories) {
			if (categories[key] === name) {
				return key;
			}
		}
		return null;
	}
};