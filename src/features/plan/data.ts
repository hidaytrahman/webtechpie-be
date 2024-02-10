import { IPlan } from "./types";

export const planList: IPlan[] = [
	{
		id: 1,
		title: "WhatsApp",
		name: "basic",
		descriptions:
			"We do regular sessions on MERN stacks and Live projects / Ideas",
		isPremium: false,
		type: "limited",
		price: 0,
	},
	{
		id: 2,
		title: "Youtube",
		name: "basic",
		descriptions: "Get connected with our all Live Sessions",
		isPremium: false,
		type: "always",
		price: 0,
	},
	{
		id: 3,
		title: "Pro",
		name: "basic",
		descriptions:
			"Currently, We are working on it, You will get update in the WhatsApp group :)",
		isPremium: true,
		type: "always",
		price: 0,
	},
];
