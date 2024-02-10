export enum PortfolioTypes {
	EXPERIMENTS = "EXPERIMENTS",
	DEV_COMMUNITY = "DEV_COMMUNITY",
	CLIENTS = "CLIENTS",
}

export interface IPortfolio {
	id: string | number;
	title: string;
	name: string;
	description: string;
	url: string;
	github?: string;
	avatar?: string;
	technologies?: string[];
	type: PortfolioTypes;
}
