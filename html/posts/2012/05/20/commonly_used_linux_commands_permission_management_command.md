## linux常用命令——权限管理命令

分类：后台技术 | 标签：linux | 发布时间：2012-05-20 00:00:00

___

命令：chmod (change the permissions mode of a file)

功能：改变文件或目录权限

权限：所有用户

语法：chmod [{ugo}{+-=}{rwx}][文件或目录]

chmod [mode=421][文件或目录]

例子：chmod u+x test

chmod 755 wenyi

chmod 644 wenyi.txt

___

命令：chown (change file ownership)

功能：改变文件或目录的所有者

权限：所有用户

语法：chown [用户][文件或目录]

例子：chown wenyi test

___

命令：chgrp (change file group ownership)

功能：改变文件或目录的所属组

权限：所有用户

语法：chgrp [用户组][文件或目录]

例子：chgrp wenyi test

___

命令：umask

功能：显示、设置文件的缺省权限

权限：所有用户

语法：umask [-S]

-S 以 rwx 形式显示新建文件或者目录缺省权限

说明：不加参数或者设置缺省权限需要使用掩码值来设置

例子：umask 0022

umask -S u=rwx,g=rx,o=rx

umask 027 u=rwx,g=rx

___

 \* 文件目录权限：

![linux常用命令——权限管理命令](http://ww4.sinaimg.cn/mw600/88a9c274jw1dt434km8lfg.gif)

___

 \* 文件目录 u/g/o 含义

u：所有者

g：所属者

o：其他人
