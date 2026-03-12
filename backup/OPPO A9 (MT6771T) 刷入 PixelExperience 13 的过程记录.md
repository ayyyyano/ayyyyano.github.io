# OPPO A9 刷入 PixelExperience 13 GSI
### 前言
1. (26.3.12 / Bilibili 发布时间: 25.4.20) 本文已归档。不再发布任何更新。你仍然可以提出疑问或发布使用体验。但我可能无法给予有效答复。
2. 主要是记录自己的踩坑点。步骤仅为辅助说明。本篇记录了我根据其他教程或现有方案进行操作出现问题时的解决方案。
因此我建议优先参考酷安或其它平台上的一些相关教程。
[酷安@夏北泽Sumrum 适用于OPPO A9（MTK 6771）及部分联发科芯片保姆级刷机教程（包含解bl和root）](https://www.coolapk.com/feed/48469840?shareKey=NTllMmUyM2Q3MGVlNjgwM2I5Mjg~&shareUid=2529353&shareFrom=com.coolapk.market_14.3.0)
[酷安@雨空_RainSky OPPO A9（Helio P70）解bl与刷Magisk教程](https://www.coolapk.com/feed/38984351?shareKey=NTk4OTJmZDM1ODU0NjgwM2JkMDc~&shareUid=2529353&shareFrom=com.coolapk.market_14.3.0)
3. 需要一定的刷机基础。对操作不当出现的问题个人概不负责。

### 下载
[123 云盘 (提取码: XkIU)](https://www.123pan.com/s/kCTTjv-qGL8H.html)

### 展示
![Image](https://github.com/user-attachments/assets/8f68dfe2-0d34-4d33-a438-bfd6e85e38dc)

<img width="1026" height="686" alt="Image" src="https://github.com/user-attachments/assets/8cc9bba8-e93d-4091-92c6-d4f4512078fe" />

### 步骤
#### 检查设备的安卓版本
如果你运行的是Android 10 (ColorOS 7.1)，那么请直接跳至第二步。
如果你运行的是Android 11 (ColorOS 11)，可尝试进行第二步操作 (成功可以跳过第三步 能节省很多时间)。

直接进行第二步操作无法解锁bl时，我的办法是使用官方降级工具降级到Android 10后再进行第二步的操作 (原因见下)。或用 https://blog.bingyue.top/2023/07/12/oppo_realme_bl/ 的方法在Android 11上进行解锁bl的操作 (失败)。
我拿到这部A9时其使用的是Android 11，但是我的设备无法在Android 11上通过电源键与音量加减键进入MTK的刷机模式，而是进入了OPPO的Recovery，导致后面一系列操作都无法进行 (也可能是驱动或环境问题? )。因此我降级到Android 10后再进行了解锁BL的操作。

`关于降级` 请使用对应版本的降级工具(在所给链接的必要文件夹中)。根据降级工具的指示进行操作即可。降级后记得在降级工具中打开接收升级推送。不要在未更改此设置的情况下擅自在手机中升级。通过这种升级后的版本无法收到ColorOS 11的更新推送，需要用SP Flash线刷至ColorOS 11或通过售后处理 (别问我为什么知道)。

#### 解锁Bootloader
A9的这颗处理器在运行Android 10或更低版本的情况下，可以直接使用MTKClient快速解锁Bootloader，不需要额外操作。过程如下。

1. 在确保手机电量大于20%的情况下，关闭手机，下载并打开MTKClient工具。手机连接电脑后立即按住电源键与音量加减键，此时MTKClient应能够进入第一次识别。第一次识别结果成功如图。(此时手机应该处于黑屏状态，没有进入Recovery或系统，且命令窗口出现如图变化后即为第一次识别成功)
![Image](https://github.com/user-attachments/assets/c16f218e-2d03-4334-85c8-ddd3243b1840)
如果仍未能识别成功，请考虑驱动或操作问题 ，或安装Python或Git环境。
2. 将手机拔离数据线，再次连接并同时按住电源键与音量加减键，进入第二次识别。第二次识别成功如图。
![Image](https://github.com/user-attachments/assets/c2342aef-d644-430f-a3a4-28a071fe1037)
第二次识别可能不会一次成功，如果你在重复第二步的过程中工具识别到设备，但MTKClient出现Handshake Failed或None等报错。请重复第二次识别应进行的操作。连接失败如图。
![Image](https://github.com/user-attachments/assets/16bec0d0-0b81-484f-bb71-25439fe2eb96)
第二次识别成功后，在MTKClient选择"Flash工具"选项，点击"解锁Bootloader"，进度条走完就是成功解锁了BL。
![Image](https://github.com/user-attachments/assets/56da100c-c124-4ba7-8ba3-b249df02d4f9)
如此时重启设备可能会出现警告，出现LOGO需点击一次电源键方能进入系统，系正常现象。
#### 升级至ColorOS 11
如果没有更改升级推送的设置的话，直接在设置中更新即可。如果收不到ColorOS 11的更新推送，请使用SP Flash线刷ColorOS 11或通过售后处理。C11线刷包以及SP Flash在开头链接中均有提供。线刷过程不赘述，资源有需要可使用。

`注意` 使用SP Flash时可能需要Bypass锁定端口或者安装链接中的驱动 (安装后可能影响MTKClient识别 线刷后若MTKClient异常请卸载这里安装的驱动)

#### 刷入Magisk
这里使用的是Magisk 25.2版本。不要使用低于25的版本，会出现各种问题。高版本未测试。

1. 重复解锁BL操作中的方法进入MTKClient。相信你已熟悉了MTKClient的一些操作，出于篇幅考虑这里不再放出图片。
2. 进入MTKClient后，选择"读分区"选项，下拉，在里面找到"boot"分区，读取保存。
3. 将保存得到的boot.bin复制两份，一份留作备份防止意外情况。另一份改后缀为.img并存至手机。
4. 在手机上安装Magisk，点击Magisk内的安装，然后选"选择并修补一个文件"，之后就选择刚才保存的boot.img。完成后Magisk会将修补后的boot.img保存至内部存储的Download文件夹内 (修补后的是以magisk开头的img文件)，将其改名boot.bin后传回电脑 (记得与原先的作出区分，不要后面刷错了)
5. 重复操作进入MTKClient，将这个改好的boot.bin刷入设备。此时Magisk已成功刷入。

#### 刷入第三方Recovery (TWRP)
建议在C11_F07及以上版本操作。其余版本可自行测试。

推荐使用这个文章里给的TWRP。保存后改名recovery.bin刷入。测试可用。
[酷安@夏北泽Sumrum ](https://www.coolapk.com/feed/48469840?shareKey=YWZiMGZmN2VkNDE1NjgwM2M4NjI~&shareUid=2529353&shareFrom=com.coolapk.market_14.3.0) [直达链接 (密码:114514)](https://qwer582020-my.sharepoint.com/:f:/g/personal/qwer582020_qwer582020_onmicrosoft_com/EoIwpHkA6EhPrkZRpAsBFiEBntQnefFToNGtYC2g4ej9VA?e=LiLOK6) 
也可使用我上面资源里给出的三方REC。

过程就不详细说了。还是MTKClient，在"读分区"选项中选择"recovery"读取出recovery.bin备用，之后在"写分区"选项中找到"recovery"，把三方REC刷入即可。

REC的进入方法: 关机状态下长按电源键与音量减键。重复4-5次后松开音量减，不出意外就能成功进入REC。切记不要从面具中重启至Recovery。

#### 刷入PE13
在MTKClient中读取system.bin备用 (出现意外可刷回)，而后直接用MTKClient把这个大佬的system改名system.bin刷入system分区即可。
不需要用到SP Flash。刷入后参照上文操作进入第三方REC，格式化data即可开机。
最后重复第四条刷入Magisk的操作，完成。
[参考](https://www.coolapk.com/feed/49775235?shareKey=OTNlYjM5ZTg4MGY1NjgwM2NmZjc~&shareUid=2529353&shareFrom=com.coolapk.market_14.3.0) [镜像直达](https://www.123pan.com/s/3MbUVv-k4uJH.html)