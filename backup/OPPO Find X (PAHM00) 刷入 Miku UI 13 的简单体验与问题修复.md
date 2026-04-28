# OPPO Find X Miku UI
### 前言
在今年元旦，我放弃了对 PAHM00 Flyme 9 的继续支持。其实我本就没做什么改动，只是在GSI的基础上添加了一个修复模块，修复刷入之后的部分系统问题。

论放弃的原因，主要是以下几点：
1. 个人能力不足，无法修复剩下的 Bug 。如热点、人脸解锁、息屏显示等。而且有很多的修复方案并非原创，且不能保证100%可用，如蓝牙。
2. Android 10 底层在第三方系统下没有可用的升降驱动。要使用升降必须手动物理/软件调节。
3. Android 10 不支持极暗、无线调试等功能。进而无法使用伪 DC 调光等模块。

### 准备工作
于是，我想做出一些变化，就得放弃 Android 10 底层，升级至 Android 11 。因此，我经过一番查找，成功找到了 PAHM00 的 Color OS 11 刷机包 [官方](https://gauss-otacostauto-cn.allawnfs.com/remove-9f3f9284965affbe029fc9e498268ce5/ota/21/12/16/e6a96980-be65-43cd-b43f-0239fcd1bea4.ozip) [去验证](https://www.123pan.com/s/kCTTjv-2qy8H.html) 。

在刷入 Color OS 11 前，需要先刷回[官方 Color OS 7.1](https://www.coloros.com/rom/firmware?id=165) ，否则可能会出现 TWRP 卡机型验证或刷入后无网络等问题。双清并格式化 Data 刷入 Color OS 7.1 后，在 Fastboot 模式下再次刷入 [A10_TWRP](https://www.123pan.com/s/kCTTjv-rqy8H.html) ，然后就可以刷入去除机型验证的包了。若要在 TWRP 刷入原包，需手动将 .ozip 转为 .zip [转换工具](https://www.123pan.com/s/kCTTjv-sqy8H.html) 。刷入过程就不再细说了，本文更侧重于系统体验相关。

刷入 Color OS 11 后，先试一下能否开机，如果能正常开机，那就可以开始刷 Miku UI 了，如果不能，使用 `fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img` 刷入 [vbmeta.img](https://www.123pan.com/s/kCTTjv-Oqy8H.html) 。

### 刷入 Miku UI
首先，下载 Miku UI 的系统镜像。这里我推荐使用由 CoolApk @同执Tonzy 打包的[卡刷包](https://www.123pan.com/s/kCTTjv-8qy8H.html)。其加入了升降补丁与 Magisk 25.2 ，并且可以直接在 TWRP 刷入，不需要线刷。

进入 Fastboot 模式，刷入 [A11_TWRP](https://www.123pan.com/s/kCTTjv-rqy8H.html) ，双清就可以刷入 Miku UI 了。若无法开机，可尝试刷入上面卡刷包链接里的 Vbmeta_Patch.zip 。

### 问题发现与修复
进入系统，我测试了基本功能。当作游戏机其实没有什么大的问题，甚至可以卸载包内的 Magisk 日用。可以通过 Phh Treble 设置来修改一些设置项。比如开启高通设置中的"使用其它音频方案"就可以暂时修复铃声的问题，但不知为何每次重启需要重新配置一遍。

1. IMS 问题
我有电信卡的电话短信需求，在这一块 Miku UI 的问题是比较明显，不进行其它配置的情况下，可以在 4G 网络下上网，但无法接打电话和收发短信。通过 `*#*#4636#*#*` 可以发现 IMS 未注册。我先在 Phh Treble 设置的 IMS 设置中安装 IMS APK 。安装后重启，发现 IMS 依旧是未注册。这时候需要用到 [Pixel IMS](https://www.123pan.com/s/kCTTjv-Kqy8H.html) 这一依赖于 Shizuku 的软件。安装它、授予对应权限并启用 VoLTE 功能后重启就可以注册上 IMS 了。此时可以正常收发短信与拨打电话，但无法收到他人来电。该问题暂时无解。

2. 调度问题
我尝试在 Magisk 中刷入 Uperf Game Turbo 以及 A-SOUL Game Optimization Plus 模块。但发现刷入模块后导致系统音量无法调节。且 Magisk 已无法适应于当下的环境检测要求。我刷了 APatch 的一个分支 FolkPatch 。再刷入上面的模块仍然出现音量问题。最后将前者换为早期的 [Uperf Extreme Spdo](https://www.123pan.com/s/kCTTjv-uqy8H.html) 解决了问题。

3. 音质问题
刷入 [ViperFX](https://www.123pan.com/s/kCTTjv-Uqy8H.html) 模块，并在控制器中勾选传统模式。设置项根据个人喜好调节。

4. 拍照问题
在没有谷歌服务的包，需要先刷入 [microG](https://www.123pan.com/s/kCTTjv-lqy8H.html) 模块并向 Google 注册设备。然后安装兼容的 [谷歌相机 Apk](https://www.123pan.com/s/kCTTjv-Sqy8H.html) 即可。