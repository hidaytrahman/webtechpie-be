import { Body, Controller, Get, Post } from "@nestjs/common";

import { CoresServices } from "./core.services";
import { INavigationResponse } from "./utils/types";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@Controller("/core") // {baseURL}/core
export class CoreController {
	constructor(private coreServices: CoresServices) {}

	// core/navigations
	@Get("/navigations")
	getNavigations(): INavigationResponse {
		return this.coreServices.getNavigations();
	}

	// core/portfolio
	@Post("/portfolio")
	async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
		return this.coreServices.createPortfolio(createPortfolioDto);
	}

	@Get("/portfolio")
	async getPortfolio() {
		return this.coreServices.fetchPortfolio();
	}
}
