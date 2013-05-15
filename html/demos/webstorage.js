$(function() {
	
	var $tbody = $('table tbody');

	function main() {
		$(window).on('storage', list);
		
		//添加测试数据
		localStorage.setItem('name', 'wenzhixin');
		localStorage.setItem('age', 26);
		list();
		events();
	}

	function events() {
		$('#clear').click(function() {
			localStorage.clear();
			list();
		});
		$(document).on('click', 'button.edit', function() {
			var key = $(this).parents('tr').attr('data-key'),
				value = localStorage[key],
				newValue = prompt('请输入键为' + key + '的新值：', value);
			if (newValue) {
				localStorage.setItem(key, newValue);
				list();
			}
		});
		$(document).on('click', 'button.remove', function() {
			var key = $(this).parents('tr').attr('data-key');
			localStorage.removeItem(key);
			list();
		});
	}

	function list() {
		var html = [];
		for (var key in localStorage) {
			html.push(getItem(key, localStorage[key]));
		}
		$tbody.html(html.join(''));
	}
	
	function getItem(key, value) {
		return [
			'<tr data-key="' + key + '">', 
				'<td>' + key + '</td>', 
				'<td>' + value + '</td>', 
				'<td>',
					'<button class="btn edit">编辑</button>',
					'<button class="btn remove ml10">删除</button>',
				'</td>',
			'</tr>'
		].join('');
	}

	main();
}); 