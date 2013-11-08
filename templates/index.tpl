<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title><%= title %>文翼的博客</title>
    <!-- <meta name="viewport" content="width=device-width; initial-scale=1.0" /> -->
    <meta name="author" content="zhixin wen" />
    <meta name="Keywords" 
      content="文翼的博客，web前端博客" />
    <meta name="description" 
      content="简介：坚持看书，每天进步一点点。 要常常提醒自己：无情的岁月，还有不够努力的自己！" />
    <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
    <link rel="stylesheet" href="/css/base.css" />
    <link rel="stylesheet" href="/css/bootstrap.css" />
    <link rel="stylesheet" href="/css/jquery.imagebox.css" />
    <link rel="stylesheet" href="/css/logo.css" />
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/fork.css" />
    <!-- <link rel="stylesheet" href="/css/bootstrap-responsive.css" /> -->
    <link rel="stylesheet" href="/assets/highlight.js/styles/github.css">
    <link rel="stylesheet" href="/p/bulletin/assets/bulletin/bulletin.css" />
  </head>
  <body>
    <div class="blog">
      <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
          <div class="container">
            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="brand" href="/">文翼的博客</a>
            <div class="nav-collapse collapse">
              <ul class="nav">
                <li><a href="/projects">个人开源项目</a></li>
                <li><a href="/demos">好玩的东东</a></li>
                <!-- <li><a href="/timeline.html">时间轴</a></li> -->
                <li><a href="/rss.xml">RSS订阅</a></li>
                <li><a href="http://weibo.com/2292826740">新浪微博</a></li>
                <li><a href="http://qing.weibo.com/2292826740/profile">更多文章</a></li>
              </ul>
              <!-- <form class="navbar-form pull-right">
                <input id="query" type="text" class="input-medium search-query" />
                <button id="search" class="btn">搜索</button>
              </form> -->
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <div class="navs">
          <ul id="nav" class="nav nav-tabs nav-stacked">
            <li><a href="/index">首页</a></li>
            <li><a href="/index_web">前端技术</a></li>
            <li><a href="/index_ui">交互设计</a></li>
            <li><a href="/index_mobile">移动开发</a></li>
            <li><a href="/index_server">后台技术</a></li>
            <li><a href="/index_sql">数据库</a></li>
            <li><a href="/index_os">操作系统</a></li>
            <li><a href="/index_life">生活随笔</a></li>
          </ul>
        </div>
        <div class="contents">
          <%= list %>
          <%= post %>
          <div id="comments" class="none">
            <div class="ds-thread m10"></div>
          </div>
        </div>
      </div>
      
      <div id="bulletin" class="bulletin">
        <ul>
          <li><a href="http://wenzhixin.net.cn/p/multiple-select/">Multiple Select - Multiple select is a jQuery plugin to select multiple elements with checkboxes.</a></li>
          <li><a href="http://wenzhixin.net.cn/p/bootstrap-table/">Bootstrap Table - Simple table for bootstrap.</a></li>
          <li><a href="http://wenzhixin.net.cn/p/bootstrap-login/">Bootstrap Login - Login plugin from for bootstrap.</a></li>
          <li><a href="http://wenzhixin.net.cn/p/bulletin/">Bulletin - A jQuery plugin to show bulletin for website.</a></li>
        </ul>
        <div class="close"><a href="javascript:void(0)">×</a></div>
      </div>

      <a href="https://github.com/wenzhixin/blog" class="fork_me"></a>
      <div class="goto_top"
      onclick="javascript:document.body.scrollTop=0;document.documentElement.scrollTop=0;return false;">
        <i class="icon-plane"></i>
        <span>返回顶部</span>
      </div>
      <div class="footer">
        <p>
          Copyright © 2012-2013 wenzhixin.net.cn
        </p>
      </div>
    </div>
    <script type="text/javascript" src="/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="/js/jquery.imagebox.js"></script>
    <script type="text/javascript" src="/assets/highlight.js/highlight.pack.js"></script>
    <script type="text/javascript" src="/p/bulletin/assets/bulletin/jquery.bulletin.js"></script>
    <script type="text/javascript" src="/js/index.js"></script>
    <script type="text/javascript" id="bdshare_js" data="type=slide&amp;img=6&amp;pos=right&amp;uid=6692400" ></script>
    <script type="text/javascript" id="bdshell_js"></script>
    <script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-36708951-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
    </script>
    <script type="text/javascript">
    var duoshuoQuery = {short_name:"wenzhixin"};
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';ds.async = true;
      ds.src = 'http://static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0] 
      || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
    </script>
  </body>
</html>
