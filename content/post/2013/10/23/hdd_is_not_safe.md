---
title: 移动硬盘安全吗？备份数据真的很重要！
date: 2013-10-23 00:00:00
categories: [生活随笔]
tags: [移动硬盘,安全,备份]
---

我的移动硬盘居然挂掉了，简直不敢相信！才买了不到一年的时间，平时也很少用到。

因为之前笔记本硬盘坏了，所以买了移动硬盘（还是有牌子的），买它就是为了保存我的重要的数据文件的，为什么突然就坏了呢。。。

接上电脑，无法识别该移动硬盘，显示需要格式化才能继续使用。  
错误的信息为：

	MFT is corrupt, cannot read its unmapped extent record 415777
	Note : chkdsk cannot fix this, try ntfsfix
	Inode is corrupt (0): 输入/输出错误
	Failed to load runlist for $MFT/$DATA.
	highest_vcn = 0x3, last_vcn - 1 = 0x1963f
	Failed to load $MFT: 输入/输出错误
	Failed to mount '/dev/sdc1': 输入/输出错误
	NTFS is either inconsistent, or there is a hardware fault, or it's a
	SoftRAID/FakeRAID hardware. In the first case run chkdsk /f on Windows
	then reboot into Windows twice. The usage of the /f parameter is very
	important! If the device is a SoftRAID/FakeRAID then first activate
	it and mount a different device under the /dev/mapper/ directory, (e.g.
	/dev/mapper/nvidia_eahaabcc1). Please see the 'dmraid' documentation
	for more details.

根据提示，在 Windows 系统中运行 chkdsk /f 对硬盘进行检查，是文件的索引损害了，导致无法正常的读取文件的内容，程序会自动将索引删除。

上网查了一下原因，才知道是因为我把移动硬盘挂载到树莓派上，供电不足或者电压不稳定，所以才出现损坏的情况。

有看到其他原因导致移动硬盘出问题的，
例如有研究生不小心将导师的移动硬盘掉在地上，导致整个实验室长达半年的研究结果及多篇论文丢失，对学术研究造成无可挽回的损害。

其实，由于移动硬盘经常随身携带，很容易造成碰撞和跌落，例如我是骑车上下班，会经常颠簸到，出现问题也是比较正常的。

可见，移动硬盘安全吗？答案当然是否定的，备份数据真的很重要！

以后要及时备份重要的数据才行，例如专业资料、代码、照片、文章等等，因为这些丢失了，是需要付出惨重的时间和代价的。

（后记：虽然后面硬盘中的内容都找回来了，但是却花了好多时间和精力。）