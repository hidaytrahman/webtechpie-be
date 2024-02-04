import { INavigation, ISocialMedia } from "./types";

// main navigation
const primaryNavs: INavigation[] = [
	{
		id: "b122449c-988a-4e5b-b47c-5188dbfa786d",
		title: "Home",
		name: "home",
		link: "/",
		meta: {
			title: "Webtechpie | Unite. Code. Inspire.",
			descriptions:
				"Welcome to our vibrant and inclusive open source community dedicated to pushing the boundaries of web development. We are a passionate group of developers, designers, and innovators who believe in the power of open collaboration",
			keywords:
				"Open Source Community, Collaborative Coding, Web Solutions, Community-driven Development, webtechpie",
		},
	},
	{
		id: "c6cfaa67-f485-4bd7-8de5-82f80def118e",
		title: "Community",
		name: "community",
		link: "/community",
		meta: {
			title: "Community | Webtechpie",
			keywords:
				"Open Source Community, Collaborative Coding, Community-driven Development, webtechpie",
		},
	},
	{
		id: "f0c04d00-d2f2-4877-bb26-28cda3647cf7",
		title: "Solutions",
		name: "solutions",
		link: "/solutions",
		creative: {
			navTitles: ["Assistance", "Facility", "Helping Hands"],
		},
		meta: {
			title: "Solutions | Webtechpie",
			descriptions: "Get trained by subject matter expert's",
			keywords:
				"online training, online session on javascript, mernstack",
		},
	},
	{
		id: "d11cc232-69e8-4a1a-a134-ed14b508c804",
		title: "Portfolio",
		name: "portfolio",
		link: "/portfolio",
		creative: {
			navTitles: ["Showcase", "Work"],
		},
		meta: {
			title: "Portfolio | Webtechpie",
		},
	},
];

const footerNavs: INavigation[] = [
	{
		id: "41efdef6-fadc-4ed5-a954-ab89e36083de",
		title: "Our Team",
		name: "team",
		link: "/team",
	},
];

const socialMediaList: ISocialMedia[] = [
	{
		id: "e766990c-7d60-4507-8588-d19e1c6e6031",
		icon: "fa-facebook-square",
		link: "#",
	},
	{
		id: "9c10ed16-43e2-45ba-a5a5-d4a46f5d60fa",
		icon: "fa-github",
		link: "https://github.com/webtechpie",
	},
	{
		id: "7dc97052-3169-4ebf-9ccc-1ea31789724c",
		icon: "fa-youtube-play",
		link: "https://www.youtube.com/@webtechpie",
	},
];

// prepared response for getNavigations api
export const navigationsResponse = {
	navigations: {
		primary: primaryNavs,
		footer: footerNavs,
		social: socialMediaList,
	},
};
