---
title: Wordpress 打造 CMS 系统小记
date: 2013-12-04
categories: [后台技术]
tags: [Wordpress]
---

### 关闭文章评论：

设置-讨论下，去掉“允许他人在新文章上发表评论”选项

### 关闭页面评论：

到具体页面编辑，打开显示选项中的讨论，去掉“允许评论”选项

### 添加上一篇、下一篇：

打开 single.php 页面，在 footer 中加入
```
<div>
	<div class="left">
		<?php if (get_previous_post()) { previous_post_link('上一篇：%link'); } else { echo '上一篇：没有了！'; }?>
	</div>
	<div class="right">
		<?php if (get_next_post()) { next_post_link('下一篇：%link'); } else { echo '下一篇：没有了！'; } ?>
	</div>
</div>
<div class="clear"></div>
```
在 style.css 中加入
```
.entry-utility .left {
	float: left;
}
.entry-utility .right {
	float: right;
}
```

### 隐藏文章底部分享信息：

打开 functions.php，找到 pinboard_social_bookmarks 函数
```
function pinboard_social_bookmarks() {
	return false;
}
```

### 自定义首页：

新建 home.php
```
<?php
/*
Template Name: Home
*/
?>
<?php get_header(); ?>
<?php if( is_front_page() ) : ?>
	<?php if( pinboard_get_option( 'slider' ) ) : ?>
		<?php get_template_part( 'slider' ); ?>
	<?php endif; ?>
	<?php get_sidebar( 'wide' ); ?>
	<?php get_sidebar( 'boxes' ); ?>
<?php endif; ?>
<div id="container">
</div>
<?php get_footer(); ?>
```
页面-新建，选择模板 home，标题为首页，内容为空。

设置-阅读中，首页显示选择“一个静态页面”，主页选择“首页”。

### 添加首页幻灯片：

[Meta Slider](http://wordpress.org/plugins/ml-slider/)

下载解压到 wp-content/plugins，并启用。

设置大小为：1140px * 350px

在 home.php 加入(id 为幻灯片的ID)
```
<?php echo do_shortcode("[metaslider id=id]"); ?>
```

### 其他

#### content.php

第1行去掉
```
<?php post_class(); ?>
```

#### functions.php
第760行去掉
```
$content.imagesLoaded(function() {
	$content.masonry({
		itemSelector : '.hentry, #infscr-loading',
		columnWidth : container.querySelector('.<?php echo pinboard_teaser_class(); ?>'),
	});
});
```

```
function pinboard_entry_meta () {
}
```

the_author_link() 改为 the_author()

```
<span class="entry-date"><span rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_time( get_option( 'date_format' ) ); ?></span></span>
```

Permalink 改为 更多...

```
function pinboard_excerpt_length() 改为 return 100;
```

#### sytle.css

\#header \#searchform 加上
```
display: none;
```
