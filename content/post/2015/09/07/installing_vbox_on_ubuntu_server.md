---
title: Installing Virtualbox On Ubuntu Server 14.04
date: 2015-09-07 16:07:00
categories: [操作系统]
tags: [Virtualbox, Ubuntu Server]
---

For some reasons, my computer just only installed Ubuntu Server 14.04 system.
But sometimes I need to use Windows system to test our project, so I think if I can install virtualbox on the Ubuntu Server,
and then manage the virtualbox by website.

How to do that?

### Install Virtualbox

First we go to the [website](http://www.oracle.com/technetwork/server-storage/virtualbox/downloads/index.html),
and download the latest verion(5.0.2) of Virtualbox:

```sh
wget http://download.virtualbox.org/virtualbox/5.0.2/virtualbox-5.0_5.0.2-102096~Ubuntu~trusty_amd64.deb
wget http://download.virtualbox.org/virtualbox/5.0.2/Oracle_VM_VirtualBox_Extension_Pack-5.0.2-102096.vbox-extpack
```

Install:

```sh
sudo dpkg -i virtualbox-5.0_5.0.2-102096\~Ubuntu\~trusty_amd64.deb
sudo apt-get install -f # install dependency
sudo VBoxManage extpack install Oracle_VM_VirtualBox_Extension_Pack-5.0.2-102096.vbox-extpack
```

### Add vbox user

Because we want to use the web service that Virtualbox provide, we need to create a new user and set the password of the user:

```sh
sudo useradd -m -G vboxusers vbox
sudo passwd vbox
```

### Install web server

Install apache, PHP and Other components:

```sh
sudo apt-get install apache2 php5 libapache2-mod-php5 php-soap
```

### Install phpvirtualbox

[Phpvirtualbox](http://sourceforge.net/projects/phpvirtualbox/) is an open source project that is a web-based front-end to VirtualBox written in PHP.
We use it to manage our Virtualbox, download the latest verion(5.0.2):

```sh
wget http://downloads.sourceforge.net/project/phpvirtualbox/phpvirtualbox-5.0-2.zip -O phpvirtualbox.zip
```

Unzip the package and move to the root dir:
```sh
unzip phpvirtualbox.zip
sudo mv phpvirtualbox-5.0-2 /var/www/html/vbox
```

Setup the config file, make `$username` and `$password` match the user we created earlier:
```sh
sudo mv /var/www/html/vbox/config.php-example /var/www/html/vbox/config.php
sudo vi /var/www/html/vbox/config.php
```

### Config Virtualbox webservice

Add `VBOXWEB_USER=vbox` to file:

```sh
sudo vi /etc/default/virtualbox
```

Start the service:
```sh
sudo /etc/init.d/vboxweb-service start
```

### Done

Now we can open bowser and go to `http://server/vbox` and login with username `admin` and password `admin` (you can change it when login into phpvirtualbox).

We can see the view is so familiar, that's it.

![](/2015/09/07/finish.png)
