---
title: 去除信号x[adb命令]
tags:
  - ADB
  - 手机
categories:
  - 技术/软件
date: 2023-04-01 15:11:39
author: 陈小可
excerpt: 使用adb去除信号x
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
下载[adb环境](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn)
解压后在解压的目录下运行上述命令，如果为Linux或MacOS系统，则需要加上./

如果不会操作，可尝试与我取得联系，QQ`2777610842`微信`a844660952`

* * *

如果安卓7.1/7.0/6.X如果使用上面的命令不行，可以试试下面代码

``` BASH
adb shell settings delete global captive_portal_serveradb shell settings put global captive_portal_detection_enabled 0
```
