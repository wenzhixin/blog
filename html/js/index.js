/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

$(function() {
	'use strict';
	
	function main() {
		$(window).scroll(showGotoTop);
		showGotoTop();
		showImageBox();
		showShare();
		showComments();
		showBulletin();
		hljs.initHighlightingOnLoad();
	}
	
	function showGotoTop() {
		var $gotoTop = $('.goto_top');
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