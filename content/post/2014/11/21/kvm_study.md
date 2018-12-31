---
title: KVM 虚拟机的学习和使用
date: 2014-11-21
categories: [操作系统]
tags: [Ubuntu,KVM]
---

KVM 是 Kernel-based Virtual Machine的简称，是一个开源的系统虚拟化模块，是基于硬件的完全虚拟化。

### 查看硬件是否支持

通过命令行可以查看硬件是否支持：

```bash
# INTEL芯片
grep vmx /proc/cpuinfo

# AMD芯片
grep svm /proc/cpuinfo

# 不知道芯片的
egrep '(vmx|svm)' /proc/cpuinfo
```

假如有输出，表示 cpu 是支持 KVM 虚拟机的。

### Ubuntu 下安装 KVM

基本安装包：
```bash
sudo apt-get install kvm libvirt-bin ubuntu-vm-builder bridge-utils
```

界面管理：
```bash
sudo apt-get install virt-manager virt-viewer
```

### 使用

直接打开虚拟机管理器会报错，我们需要用命令行通过 root 方式运行：
```bash
sudo virt-manager
```

继续学习...
