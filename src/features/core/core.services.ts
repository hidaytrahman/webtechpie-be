import { Injectable } from "@nestjs/common";
import { navigationsResponse } from "./utils/navigation.utils";
import { INavigationResponse } from "./utils/types";
import { Portoflio } from "./schema/portfolio.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@Injectable()
export class CoresServices {
	constructor(
		@InjectModel(Portoflio.name) private portfolioModel: Model<Portoflio>
	) {}

	getNavigations(): INavigationResponse {
		return navigationsResponse;
	}

	async createPortfolio(payload: CreatePortfolioDto): Promise<any> {
		const data = new this.portfolioModel(payload);
		const result = await data.save();

		return {
			data: result,
			message: `Portfolio '${result.name}' has been successfully created!`,
		};
	}
}
