# 可能是目前成本最低的科学上网方案
### 前言
最近似乎不少机场都炸了，查了一下似乎是国内各大机房在打击转发业务的原因，不是排查翻墙就是屏蔽海外，拥有一个备用的科学上网手段的重要性就上来了。
在24年年底的时候，Cloudflare 更新了其服务条款，明确说明不得将其作为代理使用，也不得优选IP。[相关报道](https://www.landiannews.com/archives/107113.html)
当时我认为用 Cloudflare 作代理已经不大现实。直到我最近发现了这个项目 [Edgetunnel](https://github.com/cmliu/edgetunnel) 。
恰好，现在有比较稳定的免费二级域名注册方案 [DNSHE](https://www.dnshe.com/?domain/) 。比我此前看到的各种二级域名分发平台，其注册简单且不收取任何费用。最重要的是无需实名认证。当然有条件用自己的域名肯定更好，可惜我没钱。
成品展示: [Test](https://sekai.ccwu.cc/admin/)
> 我此前曾经用过 Freenom 免费域名，可惜它后来收回了我的域名且不再开放注册，我的老个人博客还有一系列网站项目也因此泡汤。现在似乎也没有这样的免费一级域名了，有些遗憾。

### 简要步骤
1. 在 [DNSHE](https://www.dnshe.com/?domain/) 注册账号和域名。它提供了5个免费额度，如果需要更多额度可以在页面中输入我的邀请码: KNAF9D92EC。
2. 注册并登录 Cloudflare 。
3. 部署 [Edgetunnel](https://github.com/cmliu/edgetunnel) 。其 Readme 提供了三种部署方法，我这里使用的是第三种: CF Pages + GitHub ，根据自身需要选择即可。大致步骤: 创建 CF Pages -> 绑定 Github -> 新建 KV 命名空间 -> 在 Pages 绑定 KV 命名空间 和 自定义域名 -> 访问后台配置订阅。
4. 完成。