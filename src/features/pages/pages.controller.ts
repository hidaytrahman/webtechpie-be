import { Body, Controller, Get, Post } from "@nestjs/common";
import { PagesServices } from "./pages.services";
import { CreatePageDto } from "./dto/create-page.dto";
import { IPage } from "./types";

@Controller("/pages")
export class PagesController {
	constructor(private pagesServices: PagesServices) {}

	// pages/
	@Get()
	async getPages(): Promise<IPage> {
		return await this.pagesServices.fetchPages();
	}

	// pages/landing
	@Get("/landing")
	async getLanding(): Promise<IPage> {
		return await this.pagesServices.fetchLanding();
	}

	// pages/services
	@Get("/solutions")
	getSolutions(): Promise<IPage> {
		return this.pagesServices.fetchSolutions();
	}

	// pages/portfolio
	@Get("/portfolio")
	getPortfolio(): Promise<IPage> {
		return this.pagesServices.fetchPortfolio();
	}

	// pages/community
	@Get("/community")
	getCommunity(): Promise<IPage> {
		return this.pagesServices.fetchCommunity();
	}

	// create a page
	@Post()
	async createPage(@Body() payload: CreatePageDto): Promise<IPage> {
		return this.pagesServices.createPage(payload);
	}
}
