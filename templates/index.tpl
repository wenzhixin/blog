<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title><%= title %>文翼的博客</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="author" content="zhixin wen"/>
    <meta name="Keywords"
          content="文翼的博客，web前端博客"/>
    <meta name="description"
          content="简介：坚持看书，每天进步一点点。 要常常提醒自己：无情的岁月，还有不够努力的自己！"/>
    <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml"/>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" href="/assets/highlight.js/styles/github.css"/>
    <link rel="stylesheet" href="/css/jquery.imagebox.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
</head>
<body>
<div class="blog">
    <div class="navbar navbar-inverse navbar-fixed-top bs-docs-nav">
        <div class="navbar-inner">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse"
                            data-target=".bs-navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">文翼的博客</a>
                </div>
                <div class="collapse navbar-collapse bs-navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="http://repos.wenzhixin.net.cn">个人开源项目</a></li>
                        <li><a href="http://books.wenzhixin.net.cn">我的藏书</a></li>
                        <li><a href="http://travels.wenzhixin.net.cn">游遍广州</a></li>
                        <li><a href="/about">关于我</a></li>
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
        <a class="menu-open" href="javascript:void(0)">
            <i class="glyphicon glyphicon-chevron-right"></i>
        </a>
        <div class="navs">
            <a href="javascript:void(0)" class="menu-close">&times;</a>
            <div class="nav-title">分类列表</div>
            <ul id="nav" class="nav-content">
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
        <div class="container contents hidden">
            <%= list %>
            <%= post %>
            <div id="comments" class="hidden">
                <div class="ds-thread m10"></div>
            </div>
        </div>
    </div>

    <div class="goto_top"
         onclick="javascript:document.body.scrollTop=0;document.documentElement.scrollTop=0;return false;">
        <i class="glyphicon glyphicon-plane"></i>
    </div>
    <div class="footer">
        <p>
            Copyright © 2012-2014 wenzhixin.net.cn
        </p>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="blog-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">博客信息</h4>
          </div>
          <div class="modal-body">
            <ol>
              <li>本博客由 nodejs + markdown 实现。</li>
              <li>统计信息由 google analytics 提供。</li>
              <li>评论使用多说评论插件。</li>
            </ol>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</div>
<script src="/js/jquery.min.js"></script>
<script src="/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="/assets/highlight.js/highlight.pack.js"></script>
<script src="/js/jquery.imagebox.js"></script>
<script src="/js/jquery.cookie.js"></script>
<script src="/js/index.js"></script>
<script src="/js/analytics.js"></script>
<script id="bdshare_js" data="type=slide&amp;img=6&amp;pos=right&amp;uid=6692400"></script>
<script id="bdshell_js"></script>
<script src="/js/duoshuo.js"></script>
</body>
</html>
