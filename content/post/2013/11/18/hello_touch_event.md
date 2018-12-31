---
title: 手机 web 开发之 Touch 入门
date: 2013-11-18
categories: [移动开发]
tags: [web,Touch]
---

微博应用上用手向左滑动，便可以触发返回事件，这一小小的功能虽说很简单，
但是却大大提高了用户体验（特别是用左手拿手机的人）。

今天来研究在 web 上模拟这一简单的功能。

#### 1. TouchEvent

TouchEvent 是一类描述手指在触摸平面（触摸屏、触摸板等）的状态变化的事件。
这类事件用于描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少，等等。

#### 2. 触摸事件的属性与类型

**TouchEvent.touches**

一 个 TouchList 对象，包含了所有当前接触触摸平面的触点的 Touch 对象，
无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化。

touches 有两个重要的属性分别是 pageX 和 pageY，表示触摸点相对于页面的位置。

**touchstart**

当用户在触摸平面上放置了一个触点时触发。事件的目标 element 将是触点位置上的那个目标 element

**touchend**

当一个触点被用户从触摸平面上移除（当用户将一个手指离开触摸平面）时触发。
当触点移出触摸平面的边界时也将触发。例如用户将手指划出屏幕边缘。
事件的目标 element 和这个 touchend 事件对应的 touchstart 事件的目标 element 相同，
哪怕 touchend 事件触发时，触点已经移出了该 element 。

**touchmove**

当用户在触摸平面上移动触点时触发。
事件的目标 element 和这个 touchend 事件对应的 touchstart 事件的目标 element 相同，
哪怕当 touchend 事件触发时，触点已经移出了该 element 。

#### 3. 简单模拟功能

	(function() {
		'use strict';

		var startPos = {},
			endPos = {};

		window.addEventListener('touchstart', function(event) {
			event.preventDefault();

			var touch = event.touches[0];
			startPos.x = touch.pageX;
			startPos.y = touch.pageY;
		}, false);

		window.addEventListener('touchmove', function(event) {
			event.preventDefault();

			var touch = event.touches[0];
			endPos.x = touch.pageX;
			endPos.y = touch.pageY;
		}, false);

		window.addEventListener('touchend', function(event) {
			if (startPos.x < endPos.x) {
				location.href = 'index.html';
			} else if (startPos.x > endPos.x) {
				location.href = 'page.html';
			}
		}, false);

	})();

在 touchstart 事件中，我们将位置保存到 startPos
在 touchmove 事件中，我们将位置保存到 endPos
在 touchend 事件中，我们通过比较 startPos 和 endPos 的关系得到用户是向左滑动还是向右滑动。

更多相关知识，请见[Touch_events](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Events/Touch_events)
