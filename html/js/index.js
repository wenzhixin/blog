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
	
	main();
});