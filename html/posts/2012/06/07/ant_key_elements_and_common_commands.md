## Ant 关键元素和常用命令

分类：后台技术 | 标签：ant | 发布时间：2012-06-07 00:00:00

___

### 一、Ant 关键元素

#### 1、project元素

project 元素是 Ant 构件文件的根元素， Ant 构件文件至少应该包含一个 project 元素，否则会发生错误。在每个 project 元素下，可包含多个 target 元素。

* name 属性：用于指定 project 元素的名称。

* default 属性：用于指定 project 默认执行时所执行的 target 的名称。

* basedir 属性：用于指定基路径的位置。该属性没有指定时，使用 Ant 的构件文件的附目录作为基准目录。

#### 2. target 元素

target为Ant的基本执行单元，它可以包含一个或多个具体的任务。多个target 可以存在相互依赖关系。

* name 属性：指定 target 元素的名称，这个属性在一个 project 元素中是唯一的。我们可以通过指定 target 元素的名称来指定某个 target 。

* depends 属性：用于描述 target 之间的依赖关系，若与多个 target 存在依赖关系时，需要以“,”间隔。 Ant 会依照 depends 属性中 target 出现的顺序依次执行每个 target 。被依赖的 target 会先执行。

* if 属性：用于验证指定的属性是否存在，若不存在，所在 target 将不会被执行。

* unless 属性：该属性的功能与 if 属性的功能正好相反，它也用于验证指定的属性是否存在，若不存在，所在 target 将会被执行。

* description 属性：该属性是关于 target 功能的简短描述和说明。

#### 3. property 元素

property元素可看作参量或者参数的定义，project 的属性可以通过 property 元素来设定，也可在 Ant 之外设定。若要在外部引入某文件，例如 build.properties 文件，可以通过如下内容将其引入：<property file=” build.properties”/>。

property 元素可用作 task 的属性值。在 task 中是通过将属性名放在“ ${ ”和“ } ”之间，并放在 task 属性值的位置来实现的。

Ant 提供了一些内置的属性，它能得到的系统属性的列表与 Java 文档中 System.getPropertis() 方法得到的属性一致，这些系统属性可参考 sun 网站的说明。同时， Ant 还提供了一些它自己的内置属性，如下：

* basedir: project 基目录的绝对路径；   

* ant.file: buildfile的绝对路径

* ant.version: Ant 的版本信息

* ant.project.name: 当前指定的project的名字，project的name属性值

* ant.java.version: Ant 检测到的JDK版本

### 二、Ant 常用命令

#### 1. copy 命令

copy主要用来对文件和目录的复制功能

例子：

1) 复制单个文件：

	<copy file="original.txt" tofile="copied.txt"/>

2) 对文件目录进行复制：

	<copy todir="../dest_dir">
		<fileset dir="src_dir"/>
	</copy>

3) 将文件复制到另外的目录：

	<copy file="source.txt" todir="/home/wenyi"/>

#### 2. delete 命令

对文件或目录进行删除

例子：

1) 删除某个文件：

	<delete file="/home/wenyi/photos/wenyi.jpg"/>

2) 删除某个目录：

	<delete dir="/home/wenyi/photos"/>

3) 删除所有的备份目录或空目录：

	<delete includeEmptyDirs="true">
		<fileset dir="." includes="**/*.bak"/>
	</delete>

#### 3. mkdir 命令

创建目录

例子：

	<mkdir dir="/home/wenyi/build/classes"/>

#### 4. move 命令

移动文件或目录

例子：

1） 移动单个文件：

	<move file="sourcefile" tofile=”destfile”/>

2） 移动单个文件到另一个目录：

	<move file="sourcefile" todir=”movedir”/>

3） 移动某个目录到另一个目录：

	<move todir="newdir">
		<fileset dir="olddir"/>
	</move>

#### 5. echo 命令

该任务的作用是根据日志或监控器的级别输出信息。它包括 message 、 file 、 append 和 level 四个属性

例子：

	<echo message="Hello,ANT" file="/home/wenyi/logs/ant.log" append="true"> 
                                            