---
title: 博客从 Node 迁移到 Hugo
date: 2019-01-05
categories: [操作系统]
tags: [shell]
---

由于以前的博客是用 Node.js 自己定制开发的，使用起来也不是很方便。现在将其迁移到 Hugo，并使用 GitHub Pages 自动部署，这里记录下一些迁移的重点。

### 迁移目录结构和文件名

将 post 下的 markdown 文件从 YYYY/MM/DD/file_name.md 迁移到 YYYY/file-name.md。

迁移思路：使用 find 查找出所有的 md 文件，然后使用 sed 将文件名进行替换，在使用 mv 进行改名。

```bash
cd content/post
# YYYY/MM/DD/ to YYYY/
find . -name "*.md" | sed -e 'p;s!/[0-9]\{2\}/[0-9]\{2\}!!' | xargs -n2 mv
# file_name.md to file-name.md
find . -name "*.md" | sed -e 'p;s!_!-!g' | xargs -n2 mv
# remove empty dir
find . -type d -empty -delete
```
