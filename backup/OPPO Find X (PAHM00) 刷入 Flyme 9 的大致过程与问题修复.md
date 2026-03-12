# OPPO Find X Flyme 9 GSI
### 时间线
25.7.5: Bilibili 原文发布。
26.1.1: 归档。不再更新。
26.3.12: 文章转移到 Github 。未进行其它改动。

### 前言
步骤很简单，解锁BL后在ColorOS 7(A10)原包下直接通过fastboot刷入system，之后格data补v5宽容和vbmeta即可。写文章是方便让不大了解机型情况的人刷入，且不会出现解密失败或开机系统破坏警告。
理论上本方案适用于在Find X 高配版 (PAHM00)上刷入任何一个处在A10底层的GSI，也可用于Find X 标准版 (PAFM00)。但其余GSI的Bug难以得知，有条件请自行测试。
特别感谢: 酷安@林子汐c @同执Tonzy @某贼 @爱多功能手机
三编: 补充了一些之前没有发现的Bug。有蓝牙外放需求请谨慎刷入。我无法复现蓝牙问题，故无法提供修复方案。网盘内已上传修复模块，可通过刷入Magisk模块的方式解决遇到的部分问题 (屏幕亮度 手电筒 设备信息等)。Find X的MIUI 11篇我已自行删除，有需要可以私信获取相关文件。

### 包相关
#### 下载
GSI Vbmeta修复 V5宽容 以及自制的Bug修复模块等: [下载](https://www.123pan.com/s/kCTTjv-HU58H.html)

#### 已知问题 (未修复)
蓝牙 (半残废 互传可用 据他人反馈无法连接耳机等外放)
息屏显示 (可开启 但时间不更新)
热点 (无法开启)
人脸解锁 (可添加 但无法正常识别)
自带相机 (闪退 可手动安装Open Camera)
摄像头升降 (可手动或通过Jay's Home控制)
锁屏手电筒和相机点击 (关闭密码使用滑动解锁可恢复正常)

### 注意事项
1. 刷机有风险，请做好不开机的准备，个人操作导致的问题本人不负责。
2. 建议在Android Q (ColorOS 7.1) 下刷入，不建议在ColorOS 11上降级进行操作，可能引发未知问题。
3. 除修复必须选项外，不要轻易动vendor分区，出问题后果自负。
4. 不建议刷入Uperf调度，可能导致功耗异常升高。

### 展示
WiFi/数据/蓝牙均正常 可正常获取面具权限
![Image](https://github.com/user-attachments/assets/dbad7afb-40ed-4967-b597-bf47d3021b6e)

### 大致过程
#### 解锁BL 
略。根据安卓版本选择深度测试App，在App内申请后等待一个月通过即可。链接内提供了安装包。

#### 刷入底包 (ColorOS 7.1可跳过)
1. 刷入TWRP
重启至Fastboot，使用秋之盒等工具箱/ADB命令刷入提供的对应安卓版本TWRP文件。若一次未能成功刷入，则尝试两次，或检查TWRP是否与安卓版本对应。

2. 刷入底包
使用TWRP刷入提供的C7底包，并在TWRP中清除Cache与Dalvik/ART Cache，并格式化Data分区。若无法格式化，则在清除内的修复或更改文件系统选项中将Data分区格式为EXFAT或其它格式。

#### 刷入Flyme
1. 刷入system
重启至Fastboot模式，使用秋之盒等工具箱启用ADB命令行，输入fastboot flash system xxx.img (xxx为提供的7z文件中解压出的system.img)

2. 清除数据
待system刷入完成后，在Fastboot模式下刷入官方Recovery，随后重启至Rec，选择繁体中文。之后格式化数据分区，成功并点击确定后会自动重启。

3. 补vbmeta与刷入v5宽容
在重启过程中手动进入Fastboot模式，刷入TWRP后重启至TWRP，格式化Data分区后，刷入提供的Permissiver_v5.zip与Vbmeta_Patch.zip后重启进入系统。

4. 系统软件安装
7z压缩包有提供缺失的系统应用，选择需要的应用手动安装或用MT管理器之类的应用移动至对应文件夹设置权限为755即可。相机建议用上传的安装包。压缩包内的可能会闪退。

#### Bug修复
目前已上传修复模块，刷入便可以解决下面列出的问题。也可以通过手动更改特定文件的方式修复。
部分方案来自网络 (已知来源的会标注)，经个人测试能够起作用，如有侵权请联系我删除。

1. 刷入面具
在MT管理器或TWRP复制dev/block/by-name下的boot文件到本地。
使用面具修补 (我使用的是Kitsune Mask 不勾选保持强制加密与刷入到Recovery)。
将修补的boot用工具箱/命令刷入即可。
若出现卡二屏/炸WiFi等不明问题就把刚才提取的Boot刷回去，然后尝试更换面具版本。

2. 机型信息修改 (非必需)
(1) 修改build.prop的ro.product.model ro.product.brand等项。或使用爱玩机等工具进行修改。
(2) 修改手机电池数据 (修改自酷安 @啊啊啊啊啊啊旋)
a. 用MT管理器打开位于/system/framework/目录的framework-res.apk
b. 打开apk后，在里面搜索"Power"，选择"Power_profile"
c. 进入后搜索现在系统显示的电池数据，改成所需要的数值。例如Find X高配版的的3400，保存退出。替换后重启生效。
(3) 修改提示信息 (如: 电池容量，系统版本等提示语)
打开文件Settings.apk (即设置) ，一般路径在system/product/priv-app/Settings/Settings.apk，用MT管理器点击这个APP → 查看 → resources.arsc → Arsc编辑器 → 搜索资源值 → 搜索你想改的关键字即可找到进行更改 → 退出并保存 (不选择自动签名) → 重启
(4) 修改设置内其他配置参数信息
在SettingsProvider.apk (即设置存储apk) 里改，路径/system/priv-app/SettingsProvider/SettingsProvider.apk

3. 屏幕最大亮度修改
用MT管理器打开位于/system/framework/目录的framework-res.apk，点击resources.arsc，选择Arsc编辑器，进入 android/integer/integer ，把config_screenBrightnessSettingMaximum (最大亮度) 的数值改成255 (本来是1000左右)；把config_screenBrightnessSettingDefault的数值改成100；config_screenBrightnessSettingMinimum (最小亮度) 无需改动。修改后退出并保存 (不选择自动签名)，修改后重启即可。

4. 数据网络/通知中心手电筒修复
见所给文件。或直接在酷安/Bilibili上搜索他人总结的GSI通用修复教程，基本上可以解决。