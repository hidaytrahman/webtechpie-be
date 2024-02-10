import { Injectable } from "@nestjs/common";
import { portfolioList, solutionHighlights } from "./data";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Portoflio } from "./schema/portfolio.schema";

@Injectable()
export class PagesServices {
	constructor(
		@InjectModel(Portoflio.name) private portfolioModel: Model<Portoflio>
	) {}

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


	async createPortfolio(payload: CreatePortfolioDto): Promise<any> {
		const data = new this.portfolioModel(payload);
		const result = await data.save();

		return {
			data: result,
			message: `Portfolio '${result.name}' has been successfully created!`,
		};
	}
	// createPortfolio() {
	// 	return {
	// 		title: "Portfolio",
	// 		pageId: "portfolio",
	// 		descriptions: "Our developer community",

	// 		list: portfolioList,
	// 	};
	// }
}
