## 简要步骤
1. 使用官方降级工具 (我使用的是3.1.19 如有需要我会补充链接) 降回 ColorOS 7.1 (Android 10)，如果已在 ColorOS 7.1 请忽略，先不要更新系统推送的 ColorOS 7.1。
2. 解锁Bootloader。直接参照安卓10以下设备解锁的方法即可。或直接使用exe版本的MTKClient。使用方法不多赘述，酷安内有很多相关教程 [参考](https://blog.bingyue.top/2023/07/12/oppo_realme_bl/#%E8%A7%A3%E9%94%81bl-%E5%AE%89%E5%8D%9310%E4%BB%A5%E4%B8%8B%E7%9A%84%E8%AE%BE%E5%A4%87)
3. (可选) 升级回 ColorOS 11，在官方降级工具中勾选启用升级推送，即可升级回 ColorOS 11。如果像我一样先更了操作前推送的7.1或者无法收到升级推送，则使用SP Flash线刷回ColorOS 11(线刷包暂不补充)。
4. 刷入Magisk。使用MTKClient提取Boot，提取后用Magisk 25.2版本修补Boot并刷入。完成。