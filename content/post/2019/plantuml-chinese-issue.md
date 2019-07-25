---
title: Plantuml 中文乱码问题
date: 2019-07-25
categories: [操作系统]
tags: [redmine,docker]
---

Redmine 使用了 Plantuml 插件，将其部署到 Docker 中，遇到了中文乱码的坑。

首先需要安装对应的包：

```bash
apt install locales openjdk-8-jdk fonts-arphic-uming
```

**说明：** 需要安装 `fonts-arphic-uming` 中文字体才行，不然会出现方块。

生成并设置中文：

```bash
locale-gen zh_CN.UTF-8
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```

最后生成 `/usr/bin/plantuml` 文件

```bash
#!/bin/bash
/usr/bin/java -Djava.io.tmpdir=/var/tmp -Djava.awt.headless=true -jar /usr/bin/plantuml.jar -charset UTF-8 ${@}
```

**说明：** 这里需要设置字符为 UTF-8，也就是 `-charset UTF-8`。
