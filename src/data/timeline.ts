import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	{
		id: "gmeek",
		title: "利用 Gmeek 建立个人博客",
		description:
			"原虚拟主机商跑路, 且 Freenom 域名未能续费, 它便是我重新写作的开始。",
		type: "work",
		startDate: "2024-08-09",
		skills: ["HTML", "Github Pages"],
		achievements: [
			"个人博客恢复更新",
			"部分文章被转载到国内平台 获得较高浏览",
		],
		icon: "mingcute:news-line",
		color: "#ccaa88",
	},
	{
		id: "onemanager-login-theme",
		title: "OneManager 登录页面美化",
		description:
			"利用 MDUI 重新改造了 OneManager 登录页面, 页面美观度大幅提升。由于原博客已关闭, 目前只有私信记录留存。",
		type: "project",
		startDate: "2022-07-26",
		skills: ["HTML", "MDUI"],
		achievements: [
			"方案曾被 B 站 10w 粉级别 UP 主使用",
			"B 站相关专栏浏览量突破千次",
			"可利用 MDUI 进行简单的静态页面开发",
		],
		icon: "mingcute:code-line",
		color: "#bb6688",
	},
	{
		id: "flash-rom",
		title: "初次为设备刷入第三方 ROM",
		description:
			"给手里的 OPPO A31C 先后刷入 MIUI、CM。认识到刷机能够极大激发旧设备潜能。",
		type: "work",
		startDate: "2022-05-07",
		skills: ["-"],
		achievements: [
			"了解 Android 设备刷机基本流程",
			"为后续折腾华为、小度在家等设备提供可行方案",
		],
		icon: "mingcute:flash-line",
		color: "#33aaee",
	},
	{
		id: "my-first-website",
		title: "建站初尝试",
		description:
			"在 Freenom 注册免费域名 flyme.cf, 结合虚拟主机与 DNSPod 先后建立了 WordPress 与 Typecho 博客。",
		type: "work",
		startDate: "2022-03-19",
		skills: ["PHP", "MySQL"],
		achievements: [
			"了解使用虚拟主机建站的简单流程",
			"学习了 MySQL 数据库的基本操作",
			"确定了未来低成本建站的主要方向",
		],
		icon: "mingcute:server-line",
		color: "#ddaacc",
	},
];
