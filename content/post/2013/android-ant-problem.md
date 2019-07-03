---
title: Android ant 编译问题收集
date: 2013-02-26
categories: [移动开发]
tags: [ant,编译]
---

#### 问题：

```
aapt not found under the right path
```

#### 解决：

```
sudo apt-get install ia32-libs # 12.04
sudo apt-get install lib32z1 # 14.04
```

#### 问题：

```
 Perhaps JAVA_HOME does not point to the JDK. It is currently set to "/usr/lib/jvm/java-6-openjdk/jre"
```

#### 解决：

Fixed it by installing the open jdk:

```
sudo apt-get install openjdk-7-jdk
```
