## VirtualBox 虚拟机设置共享文件夹

分类：开发工具 | 标签：VirtualBox | 发布时间：2013-01-06 12:34:00

___

Windows7 x64 下安装 Ubuntu12.04 x64 虚拟机，设置共享文件夹：

##### 1. 安装 VirtualBox 的 VBoxGuestAddition.iso。在 “设备”->“安装增强功能”，安装完成后关闭虚拟机。

##### 2. VirtualBox 的“设备”->“分配数据空间”，添加固定分配，如 F:\share, 名称share。记得勾选 Auto-mount 选项

##### 3. 到 Terminal 命令行下：

	sudo mkdir /mnt/share
	sudo mount -t vboxsf share /mnt/share
