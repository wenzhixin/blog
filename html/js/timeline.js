/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-12-11
 */

$(function() {
	'use strict';
	
	var text = '<div class="pr">' +
				 '<a class="wenyi-logo" href="/">' +
			     '<div class="border">' +
				   '<div class="circle">' +
				     '<div class="wy">' +
				       '<div class="wen">文</div>' +
				       '<div class="yi">翼</div>' +
				       '<div class="bo">博</div>' +
				       '<div class="ke">客</div>' +
				     '</div>' +
				   '</div>' +
				 '</div>' +
			     '</a>' +
			   '</div>' +
			   '<p class="my_description">坚持看书，每天进步一点点。 </p>' +
			   '<p class="my_description">要常常提醒自己：无情的岁月，还有不够努力的自己！</p>',
		json = {
	    timeline: {
	        headline: '文翼的博客',
	        type: 'default',
			text: text,
			startDate: '2012,10,24',
	        date: []
	    }
	};
	
	function main() {
		getIndex();
	}
	
	function getIndex() {
		$.ajax({
			url: 'posts/index.md', 
			success: function(data) {
				var $list = $(markdown.toHTML(data));
				$list.find('a').each(function() {
					try {
						var text = $(this).parent().text(),
							matchs = text.match(/\d{4}-\d{2}-\d{2}/),
							date = matchs[0],
							param = {
								headline: $(this).text(), 
								startDate: Util.getStartDate(date), 
								endDate: Util.getEndDate(date)
							};
						getPost($(this).attr('href'), param);
					} catch (e) {}
				});
				createStory(json);
			},
			error: function(data) {
			}
		});
	}
	
	function getPost(url, param) {
		$.ajax({
			url: 'posts/' + url + '.md', 
			async: true,
			success: function(data) {
				var text = markdown.toHTML(data);
				param.text = text.replace(/^(<h2>)(.*)(<\/h2>)/, '');
				json.timeline.date.push(param);
			},
			error: function(data) {
			}
		});
	}
	
	function createStory(json) {
		createStoryJS({
			type : 'timeline',
			width : $(window).width(),
			height : $(window).height(),
			source : json,
			embed_id : 'my-timeline',
			lang : 'zh-ch',
			debug : false,
			js: 'timeline/js/timeline.js'
		});
	}
	
	main();
});

;(function() {
	window.Util = {
		getStartDate: function(str) {
			var d = new Date(str.split('-'));
			return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join(',');
		},
		getEndDate: function(str) {
			var d = new Date(str.split('-'));
			d.setDate(d.getDate() + 1);
			return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join(',');
		}
	};
})(window);