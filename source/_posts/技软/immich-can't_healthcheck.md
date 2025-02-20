---
title: immich解决can't set healthcheck
tags:
  - immich
categories:
  - 技术/软件
date: 2025-02-20 14:21:37
author: DOTVIEW
excerpt: 解决错误信息提示can't set healthcheck.start_interval as feature require Docker Engine v25 or later
---

### 参考来源
[https://tieba.baidu.com/p/9057133310](https://tieba.baidu.com/p/9057133310)

### 解决过程
> 修改docker-compose.yml文件
> > 注释
> > ```yml
> > start_interval: 30s
> > ```
> > [https://github.com/immich-app/immich/releases/tag/v1.126.1](https://github.com/immich-app/immich/releases/tag/v1.126.1)
> > 的docker-compose.yml第75行