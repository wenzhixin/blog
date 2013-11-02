/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
	'use strict';
	
	function main() {
		$(window).scroll(showGotoTop);
		$(window).resize(showGotoTop);
		resetViews();
		showGotoTop();
		showImageBox();
		showShare();
		showComments();
		showBulletin();
		hljs.initHighlightingOnLoad();
	}
	
	function resetViews() {
		$('table').addClass('table table-bordered table-striped');
	}
	
	function showGotoTop() {
		var $gotoTop = $('.goto_top');
		
		// position
		if ($(window).width() > 767) {
			$gotoTop.css({
				'left': '50%',
				'margin-left': $('.posts').width() / 2 + 'px',
				'right': 'auto'
			});
		} else {
			$gotoTop.css({
				'left': 'auto',
				'margin-left': '0',
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
	    if (location.pathname !== "/" && location.pathname !== "/index") {
	        $('#comments').show();
	    }
	}
	
	function showBulletin() {
		$('#bulletin').bulletin();
	}
	
	main();
});