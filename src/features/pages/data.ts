import { IPortfolio, PortfolioTypes } from "./types";

export const solutionHighlights = [
	"Get trained by subject matter expert's",
	"Live projects from scratch",
	"Open discussions",
	"Collborative teams",
	"Mock Interviews",
	"On demand training (Tech only)",
];

export const portfolioList: IPortfolio[] = [
	{
		id: 1,
		title: "codeeng",
		name: "codeeng",
		description: `Basic configuration of the code environment needed for your project or new machine.`,
		url: "https://codeeng.vercel.app/",
		avatar: "",
		technologies: [],
		type: PortfolioTypes.DEV_COMMUNITY,
	},
	{
		id: 2,
		title: "react-carbonui",
		name: "react-carbonui",
		description: `A carbon copy UI to show the web page based on the traditional view`,
		url: "https://hidaytrahman.github.io/react-carbonui/",
		avatar: "",
		github: "https://github.com/hidaytrahman/react-carbonui",
		technologies: [],
		type: PortfolioTypes.DEV_COMMUNITY,
	},
	{
		id: 3,
		title: "preapi",
		name: "preapi",
		description: `A very simple API prototype file based database`,
		url: "https://preapi.vercel.app/",
		avatar: "",
		github: "https://github.com/hidaytrahman/preapi",
		technologies: [],
		type: PortfolioTypes.DEV_COMMUNITY,
	},
	{
		id: 4,
		title: "chepo",
		name: "chepo",
		description: `Easiest way to get mock data`,
		url: "https://hidaytrahman.github.io/chepo/",
		avatar: "",
		github: "https://github.com/hidaytrahman/chepo",
		technologies: [],
		type: PortfolioTypes.DEV_COMMUNITY,
	},
	{
		id: 5,
		title: "Expensy Spy",
		name: "expenseSpy",
		description: `Keeping track of your expenses is an important part of managing your overall finances.`,
		url: "https://hidaytrahman.github.io/expenseSpy/",
		avatar: "",
		github: "https://github.com/hidaytrahman/expenseSpy",
		technologies: ["react", "StyledComponents"],
		type: PortfolioTypes.EXPERIMENTS,
	},
];

export const solutions = [
	"Get trained by subject matter expert's",
	"Live projects from scratch",
	"Open discussions",
	"Collborative teams",
	"Mock Interviews",
	"On demand training (Tech only)",
];
