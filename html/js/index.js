/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-11-29
 */

$(function() {
	'use strict';
	var INDEX = 'index';
	
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
	
	getPost(url('?'));
});