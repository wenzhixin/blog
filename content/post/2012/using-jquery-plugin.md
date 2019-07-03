---
title: jQuery 插件使用小记（使用、问题、解决）
date: 2012-09-16
categories: [前端技术]
tags: [jQuery,插件]
---

#### 1、bootstrap.js (v2.1.0)

问题：

bootstrap dropdown 菜单使用 on 或者 live 无效

解决：

注释 .on('click.dropdown touchstart.dropdown.data-api', '.dropdown', function (e) { e.stopPropagation() }) (第 720 行)

2、...
