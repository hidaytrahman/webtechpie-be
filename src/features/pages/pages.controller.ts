import { Body, Controller, Get, Post } from "@nestjs/common";
import { PagesServices } from "./pages.services";
import { CreatePageDto } from "./dto/create-page.dto";
// import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@Controller("/pages")
export class PagesController {
	constructor(private pagesServices: PagesServices) {}

	@Get("/landing")
	async getLanding() {
		return await this.pagesServices.fetchLanding();
	}

	// pages/config

	// pages/services
	@Get("/solutions")
	getSolutions(): any {
		return this.pagesServices.fetchSolutions();
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

	// pages/community
	@Get("/portfolio")
	getCommunity(): any {
		return this.pagesServices.getPortfolio();
	}

	// pages/members
}
