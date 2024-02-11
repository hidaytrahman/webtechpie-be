import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePageDto } from "./dto/create-page.dto";
import { Page } from "./schema/portfolio.schema";

@Injectable()
export class PagesServices {
	constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

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

	// fetch portfolio page
	async fetchPortfolio(): Promise<any> {
		const name = "portfolio";
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

	// fetch community page
	async fetchCommunity(): Promise<any> {
		const name = "community";
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

	async createPage(payload: CreatePageDto): Promise<any> {
		// check if page is already exists
		const page = await this.pageModel.findOne({
			name: payload.name,
		});

		if (page) {
			return {
				message: `Page '${payload.name}' is already exists!`,
			};
		} else {
			const data = new this.pageModel(payload);
			const result = await data.save();
			return {
				data: result,
				message: `Page '${result.name}' has been successfully created!`,
			};
		}
	}
}
