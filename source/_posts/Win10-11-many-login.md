---
title: 'Win11 多用户同时登录 '
date: 2024-07-03 13:46:24
categories: 
 - 技术/软件
tags:
 - Windows
author: 陈小可
excerpt: [笔记]Win11 多用户同时登录远程桌面配置方法
---

## 前言

转载自-https://www.wyr.me/post/701

winHex-https://www.52pojie.cn/thread-1252078-1-1.html

## 修改文件内容

```bash
C:\Windows\System32\termsrv.dll
39 81 3C 06 00 00 0F 84 XX XX XX XX
替换为：
B8 00 01 00 00 89 81 38 06 00 00 90
```



## 修改组策略

```bash
打开住策略编辑器命令
gpedit.msc
```

打开`编辑组策略`应用，进入`本地计算机策略`–`计算机配置`–`管理模板`–`Windows组件`–`远程桌面服务`–`远程桌面会话主机`–`连接`。

## 参考视频

B站录屏地址-https://www.bilibili.com/video/BV12h411M7vp/

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=227395045&bvid=BV12h411M7vp&cid=1095208885&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
