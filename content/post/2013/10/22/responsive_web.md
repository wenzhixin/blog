---
title: 让你的网站支持自适应界面
date: 2013-10-22 08:50:00
categories: [前端技术]
tags: [博客,自适应,响应式]
---

#### 1. 介绍

随着智能手机的普及，越来越多的人使用手机上网。
我自己就是，经常懒得开电脑，直接用手机查看网页，简单又方便。
那么，如何才能把自己的博客做成在不同大小的设备上呈现同样的界面？

#### 2. 如何做

1) 在网页代码的头部，加入 viewport 元标签

    <meta name="viewport" content="width=device-width; initial-scale=1.0" />
    
viewport 是页面默认的宽度和高度，上面代码的意思是：
页面宽度默认等于屏幕宽度（width=device-width），
并且原始缩放比例（initial-scale=1.0）为1.0，即页面初始大小占屏幕面积的100%。

这样，我们在手机上查看就可以看到整个页面的大小了。

2) 设置 CSS 的 @media 规则

在同一个CSS文件中，可以根据不同的屏幕分辨率，选择应用不同的CSS规则。

例如：

    @media (min-width: 768px) and (max-width: 979px) {
        /* CSS1 */
    }
    
    @media (max-width: 767px) {
        /* CSS2 */
    }
    
分别表示屏幕在 768px-979px 之间显示 CSS1 内容 和 屏幕宽度小于 767 像素显示 CSS2 内容。

由于博客用到了 bootstrap，所以我引入了 bootstrap-responsive.css 样式，它已经帮我做了大部分工作了。

3) 加入自定义样式

    @media (max-width: 767px) {
        body {
            padding-left: 0px;
            padding-right: 0px;
        }
        .header_content {
              padding-left: 10px;
        }
        .fork_me, .header_top, .wenyi-logo, .weibo_content, #bdshare, .bulletin {
              display: none;
        }
        .post_content {
            padding: 10px;
        }
    }
    
这段代码的意思是，如果屏幕宽度小于 767 像素，那么 body 的左右间距都为 0，博客的标题和文章的间距为 10 像素，
并且隐藏 fork me 图片、标题图片、博客的 logo、微博、百度分享和公告功能。

这样，我们在手机上查看就可以看到我们自己想要的内容了。

4) 设置 js 代码

由于“返回顶部”按钮在电脑以及手机上的显示位置不同，所以无法用css来进行设置（知道的人麻烦告诉我下），
所以只能用 js 来进行设置，代码如下：

    $(window).resize(showGotoTop);
    
    function showGotoTop() {
        if ($(window).width() > 767) {
            $gotoTop.css({
                'left': '50%',
                'margin-left': $('.posts').width() / 2 + 'px',
                'right': 'auto'
            });
        } else {
            $gotoTop.css({
                'left': 'auto',
                'margin-left': '0',
                'right': '0'
            });
        }
    }
    
代码监听了界面改变大小时的事件，并且计算出“返回顶部”的位置。

#### 3. 其他问题

由于 IE6-8 等浏览器不支持 CSS3 Media，这里推荐使用 github 上的开源项目 [Respond.js](https://github.com/scottjehl/Respond)。

Respond.js 是一个快速、轻量的 polyfill，用于为 IE6-8 以及其它不支持 CSS3 Media Queries 的浏览器提供媒体查询的 min-width 和 max-width 特性，实现响应式网页设计（Responsive Web Design）。

使用：

    <!--[if lt IE 9]>
        <script src="respond.js"></script>
    <![endif]-->
