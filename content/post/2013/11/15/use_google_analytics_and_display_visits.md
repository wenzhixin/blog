---
title: 使用 google analytics 和显示页面浏览量
date: 2013-11-15 00:00:00
categories: [前端技术]
tags: [analytics,浏览量]
---

Google Analytics 的强大就不说了，因为它代表了这个领域的最高水平。

我们这里主要讲安装和显示每个页面的浏览量。

#### 1. 安装 Google Analytics

注册统计帐号：https://www.google.com/analytics/web

安装代码很简单，只要在每个需要统计的页面加上跟踪代码（注册后会提供）即可。

Google Analytics 的主面板非常直观的显示统计概况，让你一目了然。
Google Analytics 还有一些好玩的统计功能，充满乐趣的同时更显示出了Google Analytics的强大技术支持。
当然，我们还可以使用它的 API 进行开发。

#### 2. 显示每个页面的流量量

详细的 API：https://developers.google.com/analytics/?hl=zh-CN&csw=1

对于访问量的 API，提供了 REST-ful 接口，例如：

	GET https://www.googleapis.com/analytics/v3/data/ga
	  ?ids=ga:12345
	  &start-date=2008-10-01
	  &end-date=2008-10-31
	  &metrics=ga:visits,ga:bounces
	  
可能是因为自己的英文阅读水平比较差或者文档说的比较不清楚，
找了好久，才找到自己想要的：

	GET https://www.googleapis.com/analytics/v3/data/ga
	  ?ids=ga:12345
	  &start-date=2012-10-01
	  &end-date=today
	  &metrics=ga:visits,ga:bounces
	  &dimensions=ga:pagePath
	  &filters=ga:pagePath==/2013/11/15/use_google_analytics_and_display_visits
	  
* ids：表示统计的 ID 数据视图的 ID （具体位置：管理›报告数据视图设置）
* start-date：开始统计的时间，这里设置为博客的开始时间
* end-date：结束时间，表示到今天
* metrics：表示需要返回浏览量
* dimensions：根据文章路径进行查询
* filters：过滤条件，具体的文章路径

注：该接口需要用户认证，涉及到 OAuth 2.0，更多的信息见 API 文档