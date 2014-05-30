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
		showGotoTop();
		showImageBox();
		showShare();
		showComments();
		hljs.initHighlightingOnLoad();
	}
	
	function resetViews() {
		$('#nav a[href="' + location.pathname + '"]').parent().addClass('active');
		$('table').addClass('table table-bordered table-striped');

        $('.menu-open, .menu-close').click(function() {
            $('.menu-open').toggle();
            $('.navs, .contents').toggleClass('push-right');
        });
		$('.posts-type div').click(function() {
			var type = $(this).data('type');
			$.cookie('posts-type', type, {expires: 365});
			switchTo(type);
		});
		switchTo($.cookie('posts-type'));
		$('.contents').removeClass('hidden');
	}
	
	function switchTo(type) {
		type = type === 'tile' ? 'tile' : 'list';
		$('.contents > ul').removeClass('posts-tile posts-list').addClass('posts-' + type);
	}
	
	function getApi() {
        $.get('/api/stats.json').done(function(stats) {
            $('.alert.alert-info div').html([
                '<p>统计时间：' + stats.start + ' - ' + stats.end + '</p>',
                '<p>总文章数：' + stats.posts + ' 篇，',
                '技术文章：' + stats.tech + ' 篇，',
                '生活随笔：' + stats.life + ' 篇</p>',
                '<p>博客总字数：' + stats.words + '，',
                '总访问量：' + stats.views + '，',
                '总用户量：' + stats.visits + '</p>'
            ].join(''));
        });
		$.get('/api/categories.json').done(function(categories) {
			for (var key in categories) {
				$('#nav a[href$="' + key + '"]').append(' <span>(' + categories[key] + ')</span>');
			}
		});
		$.get('/api/posts.json').done(function(list) {
			var index = -1,
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
	
	function showGotoTop() {
		var $gotoTop = $('.goto_top'),
            $bdshare = $('#bdshare');

		if ($(document).scrollTop() > 0) {
			$gotoTop.fadeIn('slow');
            $bdshare.fadeOut('slow');
		} else {
			$gotoTop.fadeOut('slow');
            $bdshare.fadeIn('slow');
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
	        $('#comments').removeClass('hidden');
	    }
	}
	
	main();
});