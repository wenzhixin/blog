---
title: 扩展文件系统
date: 2019-07-09
categories: [操作系统]
tags: []
---

查看文件系统信息：

```bash
df -hT

/dev/mapper/systemvg-rootlv ext4
/dev/mapper/systemvg-homelv xfs
```

增加逻辑卷大小（+nG）：

```bash
lvresize -L +10G /dev/mapper/systemvg-rootlv
lvresize -L +10G /dev/mapper/systemvg-homelv
```

针对 xfs 文件系统：

```bash
xfs_growfs /dev/mapper/systemvg-homelv
```

针对 ext4 文件系统：

```bash
resize2fs /dev/mapper/systemvg-rootlv
```
