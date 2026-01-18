import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PagesServices } from './pages.services';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './schema/portfolio.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdatePageDto } from './dto/update-page.dto';
// import { CreatePortfolioDto } from "./dto/create-portfolio.dto";

@ApiTags('pages')
@Controller('/pages')
export class PagesController {
	constructor(private pagesServices: PagesServices) {}

	@Get('/:name')
	@ApiOperation({ summary: 'Get page content by name' })
	@ApiOkResponse({ description: 'Returns page content', type: Page })
	async getPageByName(@Param('name') name: string): Promise<any> {
		return this.pagesServices.fetchByName(name);
	}

	@Get()
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Get all pages (admin only)' })
	@ApiOkResponse({ description: 'Returns all pages', type: [Page] })
	async getAllPages(): Promise<Page[]> {
		return this.pagesServices.findAll();
	}

	@Get('/id/:id')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Get page by id (admin only)' })
	@ApiOkResponse({ description: 'Returns a page', type: Page })
	async getPageById(@Param('id') id: string): Promise<Page> {
		return this.pagesServices.findOneById(id);
	}

	// core/portfolio
	@Post()
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiBody({ type: CreatePageDto })
	@ApiOkResponse({
		description: 'Returns created page or conflict message',
		type: Page,
	})
	async createPortfolio(@Body() createPortfolioDto: CreatePageDto) {
		return this.pagesServices.createPage(createPortfolioDto);
	}

	@Patch('/:id')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Update a page (admin only)' })
	@ApiBody({ type: UpdatePageDto })
	@ApiOkResponse({
		description: 'Returns updated page',
		type: Page,
	})
	async updatePage(
		@Param('id') id: string,
		@Body() updatePageDto: UpdatePageDto,
	) {
		return this.pagesServices.updatePage(id, updatePageDto);
	}

	@Delete('/:id')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Delete a page (admin only)' })
	@ApiOkResponse({
		description: 'Returns delete confirmation message',
	})
	async deletePage(@Param('id') id: string) {
		return this.pagesServices.deletePage(id);
	}
}
