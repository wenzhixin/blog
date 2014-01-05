## Ubuntu 11.10 将 OpenJDK 换成 Sun JDK 的步骤

分类：操作系统 | 标签：Ubuntu | 发布时间：2012-04-26 00:00:00

___

1、加入repository： 

sudo add-apt-repository "deb http://cz.archive.Ubuntu.com/ubuntu
hardy-updates main multiverse"

(vi /etc/apt/sources.list)


2、更新源：

sudo apt-get update


3、安装 jdk 和 jre：

sudo apt-get install sun-java6-jdk sun-java6-jre


4、切换为 Sun JDK：

sudo update-java-alternatives -s java-6-sun

(ls /usr/lib/jvm)


5、查看是否切换成功：

java -version


