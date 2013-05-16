/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-12-01
 */

;(function($) {
	
	function addEvent($target, options) {
		var template = '<div class="imagebox">' + 
			'<div class="content">' + 
			'<div class="closeButton"></div>' + 
			'<div class="prevButton ' + (options.direction) + '"></div>' +
			'<div class="nextButton ' + (options.direction) + '"></div>' +
			'<a href="" title="' + options.linkTitle + '" target="blank">' + 
			'<img src="/images/loading.gif" />' + 
			'</a>' + 
			'</div>' +
			'<div class="translucent"></div>' +
			'</div>';
		
		$target.css('cursor', 'pointer').unbind('click').bind('click', function(e) {
			var curIndex = $target.index(this);
			$('.imagebox').remove();
			$('body').append(template);
			$('.imagebox .closeButton, .imagebox .translucent, .imagebox a').click(function() {
				$('.imagebox').fadeOut('fast', function() {
					$(this).remove();
				});
			});
			$('.imagebox .prevButton').click(function() {
				curIndex = (curIndex - 1) % $target.length;
				showImage($target.eq(curIndex).attr('src'));
			});
			$('.imagebox .nextButton').click(function() {
				curIndex = (curIndex + 1) % $target.length;
				showImage($target.eq(curIndex).attr('src'));
			});
			if ($target.length > 1) {
				$('.imagebox .' + options.direction).show();
			}
			showImage($(this).attr('src'));
		});
	}
	
	function showImage(imageURL) {
		var maxWidth = $(window).width() * 0.8;
		var maxHeight = $(window).height() * 0.8;
		$('.imagebox a').attr('href', imageURL);
		$('.imagebox').fadeIn('fast');
		var image = new Image();
		image.src = imageURL;
		image.onload = function() {
			if ($('.imagebox').length == 0) return;
			var width = this.width;
			var height = this.height;
			if (width > maxWidth || height > maxHeight) {
				if (width / height > maxWidth / maxHeight) {
					height = height * maxWidth / width;
					width = maxWidth;
				} else {
					width = width * maxHeight / height;
					height = maxHeight;
				}
			}
			$('.imagebox .content').animate({
				marginLeft: width / -2 + 'px',
				marginTop: height / -2 + 'px', width: width,
				height: height
			}, 150);
			$('.imagebox img').attr('src', imageURL);
		};
	}
	
	$.fn.extend({
		imagebox: function(options) {
			options = $.extend({
				linkTitle: '点击查看原图', //图标链接提示
				direction: 'horizontal' //方向: horizontal / vertical
			}, options);
			
			var $img = $('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"], img[src$=".gif"]', this);
			addEvent($img, options);
			return this;
		}
	});
	
})(jQuery);