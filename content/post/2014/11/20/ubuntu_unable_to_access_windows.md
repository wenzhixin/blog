---
title: Ubuntu 下不能访问 Windows 文件系统
date: 2014-11-20 15:07:00
categories: [操作系统]
tags: [Ubuntu,Windows 文件系统]
---

Ubuntu 和 Windows 双系统下，Ubuntu 不能访问 Windows 下的分区，例如：`/dev/sdb1`，显示如下错误：
```bash
Error mounting /dev/sdb1 exited with non-zero exit status 14: The disk contains an unclean file system (0, 0).
Metadata kept in Windows cache, refused to mount.
Failed to mount '/dev/sdb1': Operation not permitted
The NTFS partition is in an unsafe state. Please resume and shutdown
Windows fully (no hibernation or fast restarting), or mount the volume
read-only with the 'ro' mount option.
```

### 解决

不确定具体是什么原因引起这个错误，应该是 Windows 没有正确关闭所引起。可以通过 `ntfsfix` 命令，来对 NTFS 磁盘进行检查和修复。

```bash
$ sudo ntfsfix /dev/sdb1
Mounting volume... The disk contains an unclean file system (0, 0).
Metadata kept in Windows cache, refused to mount.
FAILED
Attempting to correct errors... 
Processing $MFT and $MFTMirr...
Reading $MFT... OK
Reading $MFTMirr... OK
Comparing $MFTMirr to $MFT... OK
Processing of $MFT and $MFTMirr completed successfully.
Setting required flags on partition... OK
Going to empty the journal ($LogFile)... OK
Checking the alternate boot sector... OK
NTFS volume version is 3.1.
NTFS partition /dev/sdb1 was processed successfully.
```
