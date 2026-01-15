import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagesServices } from './pages.services';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './schema/portfolio.schema';
// import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@ApiTags('pages')
@Controller('/pages')
export class PagesController {
	constructor(private pagesServices: PagesServices) {}

	@Get('/landing')
	@ApiOperation({ summary: 'Get landing page content' })
	@ApiOkResponse({ description: 'Returns landing page content', type: Page })
	async getLanding() {
		return await this.pagesServices.fetchLanding();
	}

	// pages/config

	// pages/services
	@Get('/solutions')
	@ApiOperation({ summary: 'Get solutions page content' })
	@ApiOkResponse({ description: 'Returns solutions page content', type: Page })
	getSolutions() {
		return this.pagesServices.fetchSolutions();
	}

	// pages/portfolio
	@Get('/portfolio')
	@ApiOperation({ summary: 'Get portfolio page metadata' })
	@ApiOkResponse({ description: 'Returns portfolio page metadata' })
	getPortfolio(): any {
		return this.pagesServices.getPortfolio();
	}

	// core/portfolio
	@Post()
	@ApiOperation({ summary: 'Create a new page' })
	@ApiBody({ type: CreatePageDto })
	@ApiOkResponse({ description: 'Returns created page or conflict message', type: Page })
	async createPortfolio(@Body() createPortfolioDto: CreatePageDto) {
		return this.pagesServices.createPage(createPortfolioDto);
	}

	// pages/community
	@Get('/community')
	@ApiOperation({ summary: 'Get community page content' })
	@ApiOkResponse({ description: 'Returns community page content' })
	getCommunity(): any {
		return this.pagesServices.getPortfolio();
	}

	// pages/members
}
