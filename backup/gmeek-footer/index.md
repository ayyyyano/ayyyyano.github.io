---
title: Gmeek 博客页脚添加超链接
published: 2026-04-09
pinned: false
description: 在 Gmeek 博客页脚添加超链接的一种方法。
tags: [网站]
category: 存档备份
licenseName: "CC BY-NC-SA 4.0"
draft: false
date: 2026-04-09
pubDate: 2026-04-09
permalink: "gmeek-footer"
---

<aside>
😋

使用 AIGC 技术辅助写作

</aside>

<aside>
🤔

在 Gmeek 的官方文档中，讲了很多的基础设置项，但似乎没有提到在页脚处添加文案或超链接的方法。

</aside>

# 一键添加

只需在仓库的 `config.json` 中添加以下行。

> 若已有 allHead ，直接把 <script> 到 </script> 复制进去即可，链接根据自己的需求替换:
> 

```json
"allHead":"<script>document.addEventListener('DOMContentLoaded', function() { var interval = setInterval(function() { var footer = document.getElementById('footer2'); if (footer) { if (!document.getElementById('customLink')) { var link = document.createElement('a'); link.id = 'customLink'; link.href = '<https://你的链接.com>'; link.innerHTML = '你的链接文字'; link.style.marginLeft = '8px'; link.target = '_blank'; footer.appendChild(document.createTextNode(' | ')); footer.appendChild(link); } clearInterval(interval); } }, 100); });</script>",
```

# 碎碎念

在测试过程中，我踩了几个坑，我会指出并且给出对应的修改方法。

开始时，我根据 Gmeek 文档描述，决定从 bottomText 入手。结果就是在文章的右下角多了一串文字，除此之外没有什么变化。在添加了几个斜杠后，超链接就可以正常跳转 (见3) 。

后来，我觉得应该在 script 上动点东西，我在 script 上添加了下面的代码，发现超链接只在文章页面有效。

```json
"script":"<script>function addLink(){var f=document.getElementById('footer2');if(f&&!document.getElementById('customLink')){var s=document.createElement('span');s.id='customLink';s.innerHTML=' | <a href=\\"<https://你的链接.com>\\" target=\\"_blank\\">你的链接</a>';f.appendChild(s);clearInterval(it)}}var it=setInterval(addLink,200);</script>"
```

因此，我又关注到了 indexScript ，但要在两个地方加入同样的代码多少是有点多余了。我看到了 Gmeek 的插件，其通过在 allHead 中添加字段，最终也可以在页脚添加文字。但在我把上面的代码移到 allHead 中时，问题出现了，它不在任何地方显示。

上面似乎是渲染速率的问题，添加了定时器轮询后超链接便能够正常显示在页脚了。最后只需要在一个地方插入代码。
