import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePageDto } from "./dto/create-page.dto";
import { Page } from "./schema/portfolio.schema";
import { PAGE, PAGE_SELECTED_FIELDS } from "./utils";

@Injectable()
export class PagesServices {
	constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

	// fetch landing page
	async fetchLanding(): Promise<any> {
		const name = PAGE.LANDING;
		const result = await this.pageModel.findOne({
			name,
		});

		if (result) {
			return result;
		} else {
			return {
				message: `No result found for '${name}'`,
			};
		}
	}

	// fetch all pages
	async fetchPages(): Promise<any> {
		// get  data from db and select only needed fields
		const result = await this.pageModel
			.find({}, PAGE_SELECTED_FIELDS)
			.exec();

		if (result) {
			return result;
		} else {
			return {
				message: `No results found :(`,
			};
		}
	}

	// fetch solutions page
	async fetchSolutions(): Promise<any> {
		const name = PAGE.SOLUTIONS;
		const result = await this.pageModel.findOne({
			name,
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
		const name = PAGE.PORTFOLIO;
		const result = await this.pageModel.findOne({
			name,
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
		const name = PAGE.COMMUNITY;
		const result = await this.pageModel.findOne({
			name,
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
