import { Injectable } from "@nestjs/common";
import { solutionHighlights } from "./data";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePageDto } from "./dto/create-page.dto";
import { Page } from "./schema/portfolio.schema";

@Injectable()
export class PagesServices {
	constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

	getLanding() {
		return "This is landing";
	}

	// fetch landing page
	async fetchLanding(): Promise<any> {
		const name = "landing";
		const result = await this.pageModel.findOne({
			name: name,
		});

		if (result) {
			return result;
		} else {
			return {
				message: `No result found for '${name}'`,
			};
		}
	}

	// fetch landing page
	async fetchSolutions(): Promise<any> {
		const name = "solutions";
		const result = await this.pageModel.findOne({
			name: name,
		});

		if (result) {
			return result;
		} else {
			return {
				message: `No result found for '${name}'`,
			};
		}
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

			// list: portfolioList,
		};
	}

	async createPage(payload: CreatePageDto): Promise<any> {
		const data = new this.pageModel(payload);
		const result = await data.save();

		return {
			data: result,
			message: `Page '${result.name}' has been successfully created!`,
		};
	}
}
