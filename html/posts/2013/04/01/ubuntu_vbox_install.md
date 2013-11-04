## Ubuntu 12.10 VirtualBox 问题

分类：操作系统 | 标签：VirtualBox | 发布时间：2013-04-01 00:29:00

___

#### 问题：

Ubuntu 12.10 unable to find sources of your current kernel

#### 错误信息：

	Kernel driver not installed (rc=-1908)

    The VirtualBox Linux kernel driver (vboxdrv) is either not loaded or there is a permission problem with /dev/vboxdrv. Please reinstall the kernel module by executing

    '/etc/init.d/vboxdrv setup'

    as root. If it is available in your distribution, you should install the DKMS package first. This package keeps track of Linux kernel changes and recompiles the vboxdrv kernel module if necessary.
    
#### 解决：

	sudo apt-get install dkms build-essential linux-headers-generic
	
	sudo /etc/init.d/vboxdrv setup