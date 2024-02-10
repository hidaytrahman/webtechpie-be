import { Body, Controller, Get, Post } from "@nestjs/common";
import { PagesServices } from "./pages.services";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@Controller("/pages")
export class PagesController {
	constructor(private pagesServices: PagesServices) {}
	@Get("/landing")
	getLanding(): any {
		return this.pagesServices.getLanding();
	}

	// pages/config

	// pages/services
	@Get("/solutions")
	getSolutions(): any {
		return this.pagesServices.getSolutions();
	}

	// pages/portfolio
	@Get("/portfolio")
	getPortfolio(): any {
		return this.pagesServices.getPortfolio();
	}

	@Post("/portfolio")
	async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
		return this.pagesServices.createPortfolio(createPortfolioDto);
	}

	// pages/about

	// pages/members
}
