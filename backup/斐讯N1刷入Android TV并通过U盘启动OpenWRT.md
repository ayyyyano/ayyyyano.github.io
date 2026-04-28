# 斐讯 N1 刷入 Android TV 并通过 U 盘启动 OpenWRT
#### 前言
本文非教程向文章，不会提供具体步骤指导。仅用于个人备份，防止丢失或遗忘。

#### 传送门
[所用到的资源](https://www.123865.com/s/kCTTjv-oHV8H)
[Android 固件原帖 (非常感谢 Lilith 大佬)](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=4078508)
[Flippy 的 OpenWRT 固件](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=981406&extra=page=1&filter=typeid&typeid=21&page=1)
视频演示: [Official](https://www.bilibili.com/video/BV1Pp4y1t7C1) [个人](https://www.bilibili.com/video/BV12b6bB4Ews/)

#### 简易步骤

> 先准备好一根 USB 双公头线，一个 8G 以上的 USB 2.0 U盘 (3.0 以上可能无法被 N1 正常识别) 。如果按步骤操作最后无法启动 OpenWRT 系统，大概就是 U 盘导致的问题。

1. 从链接中下载好 OpenWRT 固件 (N1_Openwrt_r9.12.31_k5.4.13-amlogic-flippy-22+.img) 、Android TV 固件 (PHICOMM_P1_LILIN_MOD_CASTLEBRAVO_Ⅱ.img) 、晶晨烧录工具 (Amlogic USB Burning Tool v3.1.0.exe) 、U 盘启动工具 (U盘启动.apk)、U 盘刻录工具 [(balenaEtcher)](https://www.ghxi.com/etcher.html) 。若 N1 的固件版本高于或等于 V2.22 ，且此前未刷入过第三方系统，则需要额外下载降级工具。
2. 使用 balenaEtcher / RuFUs 将 OpenWRT 固件刻录至 U 盘。
3. 用双公头线连接设备与电脑，并使用 Amlogic USB Burning Tool 刷入 Android 固件 (若设备无法顺利进入线刷模式，请检查当前固件版本，或更换双公头线 / 电脑 USB 口等) 。注意不要在 Amlogic USB Burning Tool 勾选擦除 Bootloader 与擦除 Flash 。
4. 刷写完成进入系统后，插入制作好的 OpenWRT U 盘，安装 "U盘启动.apk" 并给予 Root 权限后打开，在打开的窗口中确认即可重启至 OpenWRT 系统。

#### 原作者提供的部分功能说明
> 只摘取了一部分内容，完整的还请转至 Lilith [原帖](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=4078508&extra=&page=1)

- SSH / SFTP 连接到 N1

`默认用户: sshd`
`初始密码: Monarch`
`端口: 2211`
`更改密码输入: mount -o rw,remount /system 再次输入: passwd`
`配置文件所在位置: /data/ssh/sshd_config   /data/ssh/sshd_config`

- TELNET 连接到 N1

`端口: 2233`

- SAMBA

`默认用户: monarch`
`初始密码: godzilla`
`默认关闭: 首次使用需要先选择 "停用" 再选择 "启用"   默认允许访问根目录 允许读取/删除/编辑文件 注意使用安全   USB外接存储设备: \\PHICOMMP1G\root\storage\XXXX-XXXX`

- ADB 连接到 N1

`adb connect <host>[:<port>]`
`adb root 31183118`
`adb connect <host>[:<port>]`
`adb及fastboot连接 请使用特定的 MotorolaFastboot (mfastboot) 专用工具包`
`需要默认开启adb shell的Root权限请在 /system/build.prop 中添加一句 ro.secure=0`

- 显示部分系统信息  

`配置文件 /.config/neofetch`
`输入: neofetch`

- 修改 查看 SELinux 安全策略

`输入: sepolicy-inject`
`输入: sesearch`
`输入: seinfo`
`帮助: https://github.com/phhusson/sepolicy-inject`

- 自带一个原生的简易终端，在原生设置 开发者选项 中启用，仅支持实体键盘或带有键盘功能的飞鼠

- N1 本机通过 MOD 中自带的 ADB 工具包连接到其他安卓设备

`使用任意连接方式连接到N1 (SSH/TELNET) 或在打开安装在N1上的终端模拟器应用 (需要root权限)`
`停止adbd: stop adbd`
`N1通过adb连接到其他安卓设备: adb connect <host>[:<port>]`
`正常调试其他安卓设备: adb shell / adb xxxx`