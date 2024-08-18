---
title: 去除信号x[adb命令]
tags:
  - ADB
  - 手机
categories:
  - 技术/软件
date: 2023-04-01 15:11:39
---

手机为原生系统，可能连接wifi会遇到【网络连接受限】,移动数据有个x，wifi也有个x的情况。

我个人将其称之为: 【信号x】

* * *

先打开手机的usb设备调试，之后连接电脑，电脑的adb环境下输入

``` BASH
adb shell settings put global captive_portal_https_url http://www.google.cn/generate_204;
```

之后，重新开关手机飞行模式即可，或者重启手机也行

* * *

如果您不是很了解在哪输入命令，只需将usb调试打开，并安装驱动（可使用驱动精灵等一些工具安装）

下载并解压 [ADB环境](https://alist.ucu520.top/d/%E7%B3%BB%E7%BB%9F-SP/phone/environment-%E7%8E%AF%E5%A2%83/ADB.zip) 运行 x.bat 脚本即可，如链接访问失效，可尝试访问 [链接2](https://z.ucu520.top/adb-fastboot/ADB-%202020-10-02%20.zip) 或尝试与我取得联系，留言或QQ微信加我好友都行

* * *

如果安卓7.1/7.0/6.X如果使用上面的命令不行，可以试试下面代码

``` BASH
adb shell settings delete global captive_portal_serveradb shell settings put global captive_portal_detection_enabled 0
```
