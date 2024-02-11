import { Injectable } from "@nestjs/common";
import { navigationsResponse } from "./utils/navigation.utils";
import { INavigationResponse } from "./utils/types";
import { Portfolio } from "./schema/portfolio.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@Injectable()
export class CoresServices {
	constructor(
		@InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>
	) {}

	getNavigations(): INavigationResponse {
		return navigationsResponse;
	}

	async createPortfolio(payload: CreatePortfolioDto): Promise<any> {
		// check if page is already exists
		const portfolio = await this.portfolioModel.findOne({
			name: payload.name,
		});

		if (portfolio) {
			return {
				message: `Portfolio '${payload.name}' is already exists!`,
			};
		} else {
			const data = new this.portfolioModel(payload);
			const result = await data.save();

			return {
				data: result,
				message: `Portfolio '${result.name}' has been successfully created!`,
			};
		}
	}

	async fetchPortfolio(): Promise<Portfolio[]> {
		return this.portfolioModel.find().exec();
	}
}
