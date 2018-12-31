---
title: Java 获取当前路径
date: 2013-02-21 23:32:00
categories: [前端技术]
tags: [当前路径]
---

#### 1. 利用 System.getProperty( )函数获取当前路径：

	System.out.println(System.getProperty("user.dir"));//user.dir指定了当前的路径
	
#### 2. 使用 File 提供的函数获取当前路径：
	
	File directory = new File("");//设定为当前文件夹
	try {
	    System.out.println(directory.getCanonicalPath());//获取标准的路径
	    System.out.println(directory.getAbsolutePath());//获取绝对路径
	} catch(Exceptin e) {}
	
#### 3. 使用当前类获取当前路径：

	 System.out.println(Test.class.getResource(""));//获取标准的路径