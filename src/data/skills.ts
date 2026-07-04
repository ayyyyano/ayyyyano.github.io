// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// Frontend Skills
	{
		id: "javascript",
		name: "JavaScript",
		description:
			"Modern JavaScript development, including ES6+ syntax, asynchronous programming, and modular development.",
		icon: "logos:javascript",
		category: "frontend",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: [
			"mizuki-blog",
			"portfolio-website",
			"data-visualization-tool",
		],
		color: "#F7DF1E",
	},
	{
		id: "typescript",
		name: "TypeScript",
		description:
			"A type-safe superset of JavaScript that enhances code quality and development efficiency.",
		icon: "logos:typescript-icon",
		category: "frontend",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["mizuki-blog", "portfolio-website", "task-manager-app"],
		color: "#3178C6",
	},
	{
		id: "nextjs",
		name: "Next.js",
		description:
			"A production-level React framework supporting SSR, SSG, and full-stack development.",
		icon: "logos:nextjs-icon",
		category: "frontend",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["e-commerce-frontend", "blog-platform"],
		color: "#616161", // 更改为深灰色，避免纯黑色
	},
	{
		id: "astro",
		name: "Astro",
		description:
			"A modern static site generator supporting multi-framework integration and excellent performance.",
		icon: "logos:astro-icon",
		category: "frontend",
		level: "beginner",
		experience: { years: 0, months: 2 },
		projects: ["mizuki-blog"],
		color: "#FF5D01",
	},

	// Backend Skills
	{
		id: "nodejs",
		name: "Node.js",
		description:
			"A JavaScript runtime based on Chrome V8 engine, used for server-side development.",
		icon: "logos:nodejs-icon",
		category: "backend",
		level: "beginner",
		experience: { years: 0, months: 2 },
		projects: ["data-visualization-tool", "e-commerce-platform"],
		color: "#339933",
	},
	{
		id: "python",
		name: "Python",
		description:
			"A general-purpose programming language suitable for web development, data analysis, machine learning, and more.",
		icon: "logos:python",
		category: "backend",
		level: "beginner",
		experience: { years: 1, months: 10 },
		color: "#3776AB",
	},
	{
		id: "php",
		name: "PHP",
		description:
			"A widely-used server-side scripting language, particularly suitable for web development.",
		icon: "logos:php",
		category: "backend",
		level: "beginner",
		experience: { years: 0, months: 3 },
		projects: ["cms-system", "e-commerce-backend"],
		color: "#777BB4",
	},

	// Database Skills
	{
		id: "mysql",
		name: "MySQL",
		description:
			"The world's most popular open-source relational database management system, widely used in web applications.",
		icon: "logos:mysql-icon",
		category: "database",
		level: "beginner",
		experience: { years: 0, months: 3 },
		projects: ["e-commerce-platform", "blog-system"],
		color: "#4479A1",
	},

	// Tools
	{
		id: "git",
		name: "Git",
		description:
			"A distributed version control system, an essential tool for code management and team collaboration.",
		icon: "logos:git-icon",
		category: "tools",
		level: "intermediate",
		experience: { years: 1, months: 10 },
		color: "#F05032",
	},
	{
		id: "vscode",
		name: "VS Code",
		description:
			"A lightweight but powerful code editor with a rich plugin ecosystem.",
		icon: "logos:visual-studio-code",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#007ACC",
	},
	{
		id: "docker",
		name: "Docker",
		description:
			"A containerization platform that simplifies application deployment and environment management.",
		icon: "logos:docker-icon",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 2 },
		color: "#2496ED",
	},
	{
		id: "nginx",
		name: "Nginx",
		description: "A high-performance web server and reverse proxy server.",
		icon: "logos:nginx",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["web-server-config", "load-balancer"],
		color: "#009639",
	},
	{
		id: "apache",
		name: "Apache HTTP Server",
		description:
			"The world's most popular web server software, a stable and reliable HTTP server.",
		icon: "logos:apache",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["traditional-web-server", "php-hosting"],
		color: "#D22128",
	},
	{
		id: "aws",
		name: "AWS",
		description:
			"Amazon's cloud platform providing comprehensive cloud computing solutions.",
		icon: "logos:aws",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["cloud-deployment", "serverless-app"],
		color: "#FF9900",
	},
	{
		id: "linux",
		name: "Linux",
		description:
			"An open-source operating system, the preferred choice for server deployment and development environments.",
		icon: "logos:linux-tux",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		projects: ["server-management", "shell-scripting"],
		color: "#FCC624",
	},

	// Other Skills
	{
		id: "mdui",
		name: "MDUI",
		description:
			"Material Design 3 (Material You) UI components, build with Web Components.",
		icon: "material-symbols:all-inbox",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		projects: ["web-components"],
		color: "#E10098",
	},
	{
		id: "algolia",
		name: "Algolia",
		description:
			"A distributed search and analytics engine used for full-text search and data analysis.",
		icon: "material-symbols:search",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 4 },
		projects: ["search-system"],
		color: "#005571",
	},
];
