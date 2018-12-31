$(function() {
	$(document).on('mouseover', '[title]', function(e) {
		var $this = $(this),
			title = $this.attr('title'),
			titles = [],
			$div = $('<div class="jquery_title"></div>');
			
		$this.attr('data-title', title);
		$this.removeAttr('title');
		
		$.each(title.split('\r'), function(i, item) {
			$.each(item.split('\n'), function(j, t) {
				titles.push(t);
			});
		});
		
		$div.html(titles.join('<br/>')).css({
			'left': e.pageX + 'px',
			'top': e.pageY + 'px',
			'position': 'absolute',
			'padding': '5px',
			'background': '#000',
			'color': '#fff',
			'font-size': '14px',
			'border-radius': '5px'
		});
		$(this).append($div);
	});
	$(document).on('mouseout', '[data-title]', function() {
		var $this = $(this),
			title = $this.attr('data-title');
		
		$this.attr('title', title);
		$this.find('.jquery_title').remove();
	});
});