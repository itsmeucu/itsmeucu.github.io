---
title: 云南移动机顶盒-改源安装软件
date: 2024-07-02 19:59:30
#index_img: //z.ucu520.top/pics/images/2024/07/02/a0f58d9fc0c66d1a3e7e6e8bd76480f3.jpg

categories: 
 - 技术/软件

tags:
 - 机顶盒
 - Nginx
author: 陈小可
excerpt: 给机顶盒安装软件，不拆机，不刷机。恢复出厂不影响
---



# 前言
``由于运营商的机顶盒存在着安装软件的限制，同时设置里面的adb无法打开
因此另辟西路解决-机顶盒为移动和广电联合的机顶盒``
>![a0f58d9fc0c66d1a3e7e6e8bd76480f3.jpg](//z.ucu520.top/pics/images/2024/07/02/a0f58d9fc0c66d1a3e7e6e8bd76480f3.jpg)
>![826d2f8c23e42585a31b9f9e15a9b565.jpg](//z.ucu520.top/pics/images/2024/07/02/826d2f8c23e42585a31b9f9e15a9b565.jpg)
# 条件
- 路由器/光猫（支持添加路由）
- 一台电脑，建议Windows(我用的Windows抓包，macos搭服务)，如有条件，建议2台
- 使用虚拟机或将一个路由器的网段改成目的网段

# 思路
至少2种方法
>
> > 使用虚拟机创建网卡为目的网段，将虚拟机的ip设置为目的ip，在路由器设备上添加路由指向物理主机，并在物理主机上做路由转发。
>
> > 把一个路由器的网段改为目的网络的段，然后手动配ip，在机顶盒连接的网络设备上添加路由指向这个路由器。
> > 注：需要2个路由器，因为其他的网络业务会用到这个网段的其他ip，因此不能让机顶盒处于这个网段中

> 以上两种方法我都试过，差别仅仅在于路由的时候单独使用路由器来做转发还是在电脑上做配置，电脑上存在防火墙等情况，不确定能否实现转发策略
> > 本文主要记录第二种方法，物理机的部分

# 机顶盒型号
> ![e0244d0c5b85114d6537f11b3dfdaabb.jpg](//z.ucu520.top/pics/images/2024/07/02/e0244d0c5b85114d6537f11b3dfdaabb.jpg)

# 网络连接
## 抓包
> 抓包，如果路由器有端口镜像，可以直接使用端口镜像后抓数据包，路由器不支持，我采用下面的方法进行
> > 把Windows连接到Wifi，在【网络适配器】，右击无线网卡，【属性】【共享】，选择有线网卡
> ![8f2443b36d9da4886d858bd107a001f2.jpg](//z.ucu520.top/pics/images/2024/07/02/8f2443b36d9da4886d858bd107a001f2.jpg)
> 
> 我用[Wireshark](https://www.wireshark.org/)进行抓包，打开后选择有线网卡即可开始抓包

## 分析数据包
> 第二张图那里，有个【应用中心】，可以通过Wireshark看到数据包的传输
> 可以看到如下数据 [搜索A] [我改了部分数据]
> `http://*.*.*.*:9091/app_epg/api/search/search.json?initals=A&size=*&pageindex=*&apkChannel=*`
> 复制下来，使用Get访问会的到如下数据
[![c41a514d0afaf9f28cb659137b06fe6c.jpg](https://z.ucu520.top/pics/images/2024/07/02/c41a514d0afaf9f28cb659137b06fe6c.jpg)](https://z.ucu520.top/pics/image/SsR)
> > 恭喜你，通过这个连接，你可以自由的下载【应用中心】中的各类apk

> 此时再点进一个应用，会发现有一个json数据，这个json中包含着软件的信息
> > 访问json,会得到如下数据[ES文件浏览器],这是我自己改过的
> > ```json
> > {"status":200,"message":null,"app":{"appId":"app_*","packageName":"com.estrongs.android.pop","name":"ES文件浏览器","simpleDes":"","score":"9.0","downloadUrl":"http://*.*.*.*/es.apk","versionCode":"4268","versionName":"4.2.6.8","fileSize":"36828172","updateTime":"2024-06-14","downloadNum":"","descripiton":"这是一个文件浏览器，浏览文件的浏览器","pics":["http://*.*.*.*/logo-108-108.png"],"icon":"http://*.*.*.*/logo-108-108.png","flag":"1","type":"apptype_*","language":"中文","lastUpdateDes":"","apkMd5":"52fee4ee728e89dd6890e2ab2b7714ec","needUpdate":1,"autoInstall":1,"autoUpdate":0}}
> > ```
> > 数据对应的位置如下图所示[下载软件中]
> ![6596cc2b091c3e2d5e4ecad815038750.jpg](//z.ucu520.top/pics/images/2024/07/02/6596cc2b091c3e2d5e4ecad815038750.jpg)
> 下载之后会自动安装
> ![4e4660193101f224069d2a1848930446.jpg](//z.ucu520.top/pics/images/2024/07/02/4e4660193101f224069d2a1848930446.jpg)
> 安装之后运行
> ![b9a94b681237c980ddd76fff02bd277f.jpg](//z.ucu520.top/pics/images/2024/07/02/b9a94b681237c980ddd76fff02bd277f.jpg)
> ![12d04af8814af61f0093dd27c01dce44.jpg](//z.ucu520.top/pics/images/2024/07/02/12d04af8814af61f0093dd27c01dce44.jpg)
> ![09efd9d0d40f6f17e19e8315d81dc305.jpg](//z.ucu520.top/pics/images/2024/07/02/09efd9d0d40f6f17e19e8315d81dc305.jpg)
> 
> 如果要传文件到机顶盒上，把机顶盒的网线插到和笔记本同一个网络的路由器等设备上，使用ES的局域网传文件即可解决
> 
> 使用es安装的时候，选择apk，直接安装即可，会自动安装软件，机顶盒支持鼠标，如果遥控不好用，可以直接使用鼠标
>

## 运行Nginx服务
使用电脑安装Nginx服务，再配置nginx.config文件
局部配置如下,如果需要，记得对照上面的图，把数据改成你自己的
```nginx.config
    server {
        listen 9091;
        server_name 183.[改成你抓到json包的ip] localhost 127.0.0.1 0.0.0.0;

        index index.php index.html index.htm default.php default.htm default.html;
        
        # location / {
        #     default_type application/json;
        #     return 200 '{"status": 200, "message": null}';
        # }
        location / {
            default_type application/json;
            return 200 '{"status":200,"message":null,"app":{"appId":"app_*","packageName":"com.estrongs.android.pop","name":"ES文件浏览器","simpleDes":"","score":"9.0","downloadUrl":"http://*.*.*.*/es.apk","versionCode":"4268","versionName":"4.2.6.8","fileSize":"36828172","updateTime":"2024-06-14","downloadNum":"","descripiton":"这是一个文件浏览器，浏览文件的浏览器","pics":["http://*.*.*.*/logo-108-108.png"],"icon":"http://*.*.*.*/logo-108-108.png","flag":"1","type":"apptype_*","language":"中文","lastUpdateDes":"","apkMd5":"52fee4ee728e89dd6890e2ab2b7714ec","needUpdate":1,"autoInstall":1,"autoUpdate":0}}';        }
    }
```

## FAQ
> 建议，先到应用的列表，然后再将路由之类的指向你开服务的电脑，这时候再点进去，数据就是你改的
> 
> 如果你一来就把路由指向你自己开服务的ip，那么会造成应用商店的页面加载不出来【因为你用的这个ip不止跑着这一个服务，应用列表等都再跑】，你也可以把其他包都用nginx搭建
> 
> 包名一定要时你软件的包名，md5，size这些都必须时你软件的，不然会提示【文件不完整】
