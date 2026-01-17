import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoresServices } from './core.services';
import { INavigationResponse } from './utils/types';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Portoflio } from './schema/portfolio.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('core')
@Controller('/core')
export class CoreController {
	constructor(private coreServices: CoresServices) {}

	@Get('/navigations')
	@ApiOperation({ summary: 'Get navigation configuration' })
	@ApiOkResponse({
		description: 'Returns navigation configuration used by the UI',
	})
	getNavigations(): INavigationResponse {
		return this.coreServices.getNavigations();
	}

	@Post('/portfolio')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Create a new portfolio entry' })
	@ApiBody({ type: CreatePortfolioDto })
	@ApiOkResponse({
		description: 'Returns created portfolio entry or conflict message',
	})
	async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
		return this.coreServices.createPortfolio(createPortfolioDto);
	}

	@Get('/portfolio')
	@ApiOperation({ summary: 'Get all portfolio entries' })
	@ApiOkResponse({
		description: 'Returns list of portfolio entries',
		type: [Portoflio],
	})
	async getPortfolio() {
		return this.coreServices.fetchPortfolio();
	}
}
