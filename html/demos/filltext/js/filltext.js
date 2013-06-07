/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2013-01-10
 */

$(function() {
	var image = new Image(),
		canvas = $('#canvas')[0],
		context = canvas.getContext('2d'),
		$inputs = $('input'),
		$button = $('#create');
	
	function main() {
		image.onload = fillText;
		image.src = 'images/bg.jpg';
		$button.click(fillText);
	}
	function fillText() {
		context.drawImage(image, 0, 0);
		context.fillStyle = '#ffffff';
		context.font = 'bold 20px 微软雅黑';
		$inputs.each(function(i) {
			var text = $(this).val() || $(this).attr('placeholder');
			context.fillText(text, (canvas.width - text.length * 20) / 2, 200 * (i + 1) - 10, canvas.width);
		});
	}
	main();
});
