# 增强希沃桌面批注体验 —— 使用 Ink Canvas Artistry 替换希沃桌面的批注功能
### 解决希沃桌面批注打开慢、效率低的问题
#### 前言
没有意外的话，本文将同时在[智教联盟](https://forum.smart-teach.cn/t/ica)、GitHub 与 Bilibili 上同时发布。似乎半年没写过新文章了，那就来一个大伙都能看懂的。我想肯定有很多人认为这篇文章的做法没有实际用处，而且自己也不知道有没有前人发布过类似的内容，但本文的东西大部分是我一步步摸索出来的，没指望能收获什么浏览量，就当是我的一次测试记录吧。

**测试环境**: SEEWO BG86EG (MT51C) 、Windows 10 1703 (10.0.15063) 
**所需软件**: Microsoft Office 2024、SEEWO FAMILY BUCKET 8.1.0.30、Ink Canvas Artistry 4.9.4

不知道看这篇文章的各位·，在班级内使用 6.5 代机及以后的希沃一体机时，是否遇到过这样的问题: 老师授课时点击了侧边栏，好不容易看完了动画，点击批注功能之后又要卡顿好一会儿才能打开批注。展开动画和打开批注用的时间最少需要 5 秒 ，属于是既没有观感又没有效率。

面对这一严重问题，班里老师总是为此苦恼，最终他们一致选择在课前打开希沃白板，然后最小化，使用桌面的 EN 批注工具。但这样做也有不小问题。希沃白板自身的启动速度并不算快，光打开白板这一动作在班里一体机上也需要花费至少 10 秒的时间。另外论资源占用和美观性，甚至还不如侧边栏批注。

于是，我在 Github 上进行搜索，发现了 Ink Canvas 和基于它的几个衍生项目。经过一番筛选，我认为最适合采用的就是 [Ink Canvas Artistry](https://bgithub.xyz/InkCanvas/Ink-Canvas-Artistry) (下文简称为 ICA ) 。它在 Ink Canvas 上添加了很多实用功能，并且由于该项目已经停更，一般来说不需要考虑后续的文件替换操作。于是，我就下载了它的便携版并解压到 D 盘的一个文件夹下，经过几天班里老师的测试，其功能已经能够满足我班当下的使用需求，但还有很多优化的空间。本文就从我遇到的问题出发，给出我目前认为较好的解决方案。

#### 我遇到的问题
1. 启用软件内置的自启动后，在使用希沃桌面助手的一键下课/侧边栏进程管理/上滑菜单的关闭应用等功能后，软件入口难以被老师发现，从而必须重启电脑继续教学。
2. 在部分情况下，ICA 的桌面窗口/ PPT 功能会被当前应用覆盖，导致无法进行批注或PPT翻页等功能。
3. 在更换前台放映的课件时，ICA 有概率崩溃，未能切换课件状态，进而导致翻页等一系列功能异常。

#### 开始吧
既然我们已经有了更好的批注方案，我对上面几个问题的想法便是: 我直接把希沃桌面的批注替换为 ICA 吧。是的，我开始的想法正如标题所示，我后续进行的操作也同样。但在执行过程中，我遇到了几个新的问题，下文会一一列举并给出它们的解决方法。

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6085d5f0-7fb4-4a69-a896-19060a534d44" />
最初，我试着将 ICA 的文件直接移动到希沃桌面批注工具的目录下 (位于"C:\Program Files (x86)\Seewo\MiniApps\DesktopAnnotation") ，然后修改 ICA 的主程序名为"DesktopAnnotation.exe" ，并备份原来的主程序为"DesktopAnnotation.exe.bak" (最好也留一份 ICA 的主程序备份，便于在希沃桌面更新后还原配置) ，但这会导致 ICA 无法正常工作。详细表现为：在 ICA 设置中更改的配置不能生效、ICA 窗口位置严重偏移 (正常来说是左右居中，高度比只比任务栏高一点) 、手写墨迹全部被识别为橡皮擦......大概就是完全用不了吧。

很快，我便发现了问题所在，在 Program Files 文件夹下的应用一般来说是没有普通应用的权限的，会受到更多的限制。这也是现在不少 App 选择把自身安装目录设置在 AppData 而非 Program Files 的原因。这意味着我们无法将 ICA 移动到希沃桌面批注的文件夹下。本文到此结束。(划掉)

#### 真的要止步于此吗? 

其实不然，我们还是可以通过某些方式提升文件夹下应用的权限。这里我使用的方案是: 更改上级文件夹的所有者为当前登录用户 (例如 Administrator ) ，并且禁用继承，以及给予当前用户完全控制的权限。这样我们就可以规避一部分 Program Files 下的权限问题了。操作如下。
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/6316fa22-d916-4aea-916d-b78dbe584af2" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/e0c90662-3bcd-44a0-a084-1e0f49176342" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/10bb7b58-333d-4f7e-b33a-bdf35985e3f6" />
1. 选中"C:\Program Files (x86)\Seewo\MiniApps\DesktopAnnotation"文件夹，右键"属性" -> "安全" -> "高级"。
2. 在"所有者"旁点击"更改"，输入当前用户名 (如 Administrator ) ，检查名称，确定，勾选"替换子容器和对象的所有者"。
3. 再次回到"安全"选项卡，点击"禁用继承"，选择"从此对象中删除所有已继承的权限"。在"禁用继承"上方点击添加用户，左上角"选择主体"，输入当前用户名，检查名称，完成后一路确定即可。
4. 重启系统。

经过上面的操作，再次运行改名后的 ICA 主程序，发现可以正常运行了。此时能够保存设置项，窗口位置与橡皮擦的问题也得到了解决。我们也可以通过桌面助手的批注以及侧边栏进入 ICA 。但这样只解决了第一个问题，如果保留原来的自启动设置，开机自启仍然会出现 ICA 窗口被覆盖的情况。若关闭进程通过侧边栏或桌面助手打开，它就不会被其它窗口覆盖了 (系统/ UWP 应用除外)，但 PowerPoint 在放映 PPT 时不会出现 PPT 功能，和正常状态没有区别。

上文基本解决了 ICA 因放于 Program Files 文件夹下从而导致的权限不足问题，现在可以视作它位于普通的文件夹下了。要解决窗口置顶问题，不考虑 UIAccess 的话，只需要让主程序以管理员权限运行即可。操作如下。
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/598696f8-8440-4446-aa39-ace8c7640042" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/4e7f5d1c-2c6c-4ea3-ae57-75c8a0fc6180" />
1. 进入 ICA 主程序，禁用内置的自启动功能
2. 然后在设置中搜索计划任务，进入任务计划程序，创建一个基本任务。触发器选择当前用户登录时，操作选启动程序，程序就是刚才我们改好的 C:\Program Files (x86)\Seewo\MiniApps\DesktopAnnotation\DesktopAnnotation.exe 。
3. 添加完成后双击刚才创建的任务进入配置页面，勾选使用最高权限运行。
重启系统后不出意外就是用最高权限运行 ICA 了。使用桌面助手或侧边栏打开同理。那么，我们只需要解决 PowerPoint 出现的问题就可以了。

这里我们就不对 ICA 下手了，让 PowerPoint 也使用管理员权限运行就可以解决Office COM相关的问题。这里我们需要修改注册表以实现 COM 接口的成功识别。操作如下。
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/13deecd0-658e-4d18-9c06-cb47d4fbe9b8" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/1e767939-a826-4196-9995-30656b98b26b" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/304ee0d4-a535-428d-a92b-f8901499a6ce" />
1. Win+R 输入"regedit"
2. 打开"HKEY_CURRENT_USER\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers"，在右侧新建一个字符串值，名称为 PowerPoint 主程序所在的文件路径 (例如: "C:\Program Files\Microsoft Office\Root\Office16\POWERPNT.EXE" 若使用的是 WPS Office ，则查找"ksolaunch.exe") ，双击在数值数据填入"~ RUNASADMIN"。
3. 打开"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers"，再新建一个字符串值，名称和数值数据同上。
4. 修改完成后重启系统。

到这里，修改已经全部完成了。ICA 已实现了最高权限自启，若老师通过一键下课等关闭了 ICA ，只需点击侧边栏的批注功能即可重新打开。PPT 功能，指定软件自动收纳等工作正常。