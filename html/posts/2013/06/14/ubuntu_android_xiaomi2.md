## Ubuntu 系统下 android 连接小米2进行开发

分类：移动开发 | 标签：Ubuntu、android、小米2 | 发布时间：2013-06-14 01:30:00

___

### 问题：

小米2 通过 USB 连接到 Ubuntu 12.10 系统进行开发，发现 adb devices 不能看到设备。

### 解决：

##### 1. 运行下面的命令：

	lsusb

通过对比发现，Bus 002 Device 010: ID 2717:9039 就是小米2的设备号

##### 2. 增加 udev rules 文件：

	sudo vi  /etc/udev/rules.d/70-android.rules

加入内容（对应设备号）：

	SUBSYSTEM=="usb", SYSFS{idVendor}=="2717", MODE=="0666"
	SUBSYSTEM=="usb_device", SYSFS{idVendor}=="2717", MODE=="0666"
	SUBSYSTEM=="usb", ATTR{idVendor}=="2717", ATTR{idProduct}=="9039", SYMLINK+="android_adb"

修改文件权限：

	sudo chmod a+rx /etc/udev/rules.d/70-android.rules
	
##### 3. 重启 udev

	sudo /etc/init.d/udev restart
	
##### 4. 增加 adb_usb.ini 文件

	vi ~/.android/adb_usb.ini
	
加入内容（对应设备号）：

	0x2717
	
##### 5. 到 SDK 下的 platform-tools 下：

	./adb kill-server
	./adb devices
	
##### 6. 搞定！