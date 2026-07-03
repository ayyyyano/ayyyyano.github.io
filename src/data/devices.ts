// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	Phone: [
		{
			name: "Xiaomi 13",
			image: "/images/device/xiaomi13.webp",
			specs: "远山蓝 / 12G + 512GB",
			description:
				"6.36 寸、三星 E6 屏幕、50 W 无线充电",
			link: "https://www.mi.com/xiaomi-13",
		},
		{
			name: "OnePlus 13T",
			image: "/images/device/oneplus13t.webp",
			specs: "砰然粉 / 16G + 512GB",
			description:
				"6.32 寸 1.5K 屏幕、6260 mAh 电池、80 W 闪充",
			link: "https://www.oneplus.com/cn/13t",
		},
	],
	Pad: [
		{
			name: "Xiaomi Pad 5",
			image: "/images/device/mipad5.webp",
			specs: "炫白色 / 6G + 256GB",
			description:
				"拥有良好的 Windows on Arm 适配",
			link: "https://www.mi.com/xiaomipad5",
		},
	],
	Laptop: [
		{
			name: "Redmi Book Pro 15 2023",
			image: "/images/device/redmibook.webp",
			specs: "星空灰 / 16G + 512GB",
			description:
				"R7-7840HS + 3.2K 120Hz 屏幕",
			link: "https://consumer.huawei.com/cn/routers/ax3/",
		},
	],
	Router: [
		{
			name: "HUAWEI AX3",
			image: "/images/device/ax3.webp",
			specs: "1000Mbps / 1G",
			description:
				"入门级的 WiFi 6 路由器",
			link: "https://consumer.huawei.com/cn/routers/ax3/",
		},
		{
			name: "Phicomm N1",
			image: "/images/device/n1.webp",
			specs: "-",
			description:
				"可玩性强 拥有 iStoreOS 支持",
			link: "https://fw.koolcenter.com/iStoreOS/alpha/n1/",
		},
	],
};
