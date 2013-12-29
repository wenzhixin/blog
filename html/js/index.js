/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
	'use strict';
	
	function main() {
		resetViews();
		$(window).scroll(showGotoTop);
		$(window).resize(showGotoTop);
		getApi();
		$('#search').click(search);
		showGotoTop();
		showImageBox();
		showShare();
		showComments();
		showBulletin();
		hljs.initHighlightingOnLoad();
	}
	
	function resetViews() {
		$('#nav a[href="' + location.pathname + '"]').parent().addClass('active');
		$('table').addClass('table table-bordered table-striped');
		
		$('.posts-type div').click(function() {
			var type = $(this).data('type');
			$.cookie('posts-type', type, {expires: 365});
			switchTo(type);
		});
		switchTo($.cookie('posts-type'));
		$('.contents').show();
	}
	
	function switchTo(type) {
		type = type === 'list' ? 'list' : 'tile';
		$('.contents > ul').removeClass('posts-tile posts-list').addClass('posts-' + type);
	}
	
	function getApi() {
		$.get('/api/categories').done(function(data) {
			var categories = $.parseJSON(data);
			for (var key in categories) {
				$('#nav a[href$="' + key + '"]').append(' <span>(' + categories[key] + ')</span>');
			}
		});
		$.get('/api/posts').done(function(data) {
			var list = $.parseJSON(data),
				index = -1,
				postNavs = [];
				
			$.each(list, function(i, post) {
				if (location.pathname === '/' + post.path) {
					index = i;
					postNavs = ['<hr/>'];
					return false;
				}
			});
			if (index + 1 <= list.length - 1) {
				postNavs.push(
					'<div class="mt10">',
						'上一篇：',
						'<a href="/' + list[index + 1].path + '">',
							list[index + 1].title,
						'</a>',
					'<div>'
				);
			}
			if (index - 1 >= 0) {
				postNavs.push(
					'<div class="mt10">',
						'下一篇：',
						'<a href="/' + list[index - 1].path + '">',
							list[index - 1].title,
						'</a>',
					'<div>'
				);
			}
			$('#post').append(postNavs.join(''));
		});
		if (/(\/\d+){3}.*/.test(location.pathname)) {
			$.get('/stat?path=' + location.pathname).done(function(data) {
				var $p = $('#post p:eq(0)');
				$p.text($p.text() + ' | 唯一身份浏览量：' + data.visits);
			});
		}
	}
	
	function search() {
		
	}
	
	function showGotoTop() {
		var $gotoTop = $('.goto_top');
		
		// position
		if ($(window).width() > 767) {
			$gotoTop.css({
				'right': '76px'
			});
		} else {
			$gotoTop.css({
				'right': '0'
			});
		}
		
		if ($(document).scrollTop() > 0) {
			$gotoTop.fadeIn('slow');
		} else {
			$gotoTop.fadeOut('slow');
		}
	}
	
	function showImageBox() {
		$('#post').imagebox({
			direction: 'vertical'
		});
	}
	
	function showShare() {
		$('#bdshell_js').attr('src', 'http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000');
	}
	
	function showComments() {
	    if (location.pathname !== "/" && location.pathname.indexOf("/index") === -1) {
	        $('#comments').show();
	    }
	}
	
	function showBulletin() {
		$('#bulletin').bulletin();
	}
	
	main();
});