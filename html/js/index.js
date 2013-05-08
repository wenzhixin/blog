/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-11-29
 */

$(function() {
	'use strict';
	var INDEX = 'index';
	
	function main() {
		$(window).scroll(showGotoTop);
		getPost(url('?'));
	}
	
	function getPost(url) {
		if (!url) {
			getPost(INDEX);
			return;
		}
		$.ajax({
			url: 'posts/' + url + '.md', 
			success: function(data) {
				$('#post').html(markdown.toHTML(data)).imagebox({
					direction: 'vertical'
				});
				document.title = $('#post h2').text() + ' - ' + document.title;
				if (url !== INDEX) {
					$('#comments').show();
				}
				showShare();
			},
			error: function(data) {
				getPost(INDEX);
			}
		});
	}
	
	function showGotoTop() {
		var $gotoTop = $('.goto_top');
		if ($(document).scrollTop() > 0) {
			console.log($gotoTop.length);
			$gotoTop.fadeIn('slow');
		} else {
			$gotoTop.fadeOut('slow');
		}
	}
	
	function showShare() {
		$('#bdshell_js').attr('src', 'http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000');
	}
	
	main();
});