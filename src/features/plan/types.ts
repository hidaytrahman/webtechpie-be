export type TPlanName = "basic" | "pro";
export type TPlanTypes = "limited" | "always";

export interface IPlan {
	id: string | number;
	title: string;
	name: TPlanName;
	descriptions: string;
	isPremium: boolean;
	type: TPlanTypes;
	price: number;
}
