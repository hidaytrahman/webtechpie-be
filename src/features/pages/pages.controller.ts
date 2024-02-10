import { Body, Controller, Get, Post } from "@nestjs/common";
import { PagesServices } from "./pages.services";
import { CreatePageDto } from "./dto/create-page.dto";
// import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

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

	// core/portfolio
	@Post()
	async createPortfolio(@Body() createPortfolioDto: CreatePageDto) {
		return this.pagesServices.createPage(createPortfolioDto);
	}

	// pages/about

	// pages/members
}
