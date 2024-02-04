import { Injectable } from "@nestjs/common";
import { portfolioList, solutionHighlights } from "./data";

@Injectable()
export class PagesServices {
	getLanding() {
		return "This is landing";
	}

	getSolutions() {
		return {
			title: "Our Solutions",
			pageId: "solutions",
			descriptions:
				"Coding is a form of creative expression. You can turn your ideas into reality by building software and applications that solve real-world problems.",
			highlights: solutionHighlights,
		};
	}

	getPortfolio() {
		return {
			title: "Portfolio",
			pageId: "portfolio",
			descriptions: "Our developer community",

			list: portfolioList,
		};
	}
}
