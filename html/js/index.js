/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
	'use strict';
	
	function main() {
		$(window).scroll(showGotoTop);
		$(window).resize(showGotoTop);
		resetViews();
		$('#search').click(search);
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
	    if (location.pathname !== "/" && location.pathname !== "/index") {
	        $('#comments').show();
	    }
	}
	
	function showBulletin() {
		$('#bulletin').bulletin();
	}
	
	main();
});