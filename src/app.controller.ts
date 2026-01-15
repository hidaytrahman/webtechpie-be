import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Health check and API welcome message' })
	@ApiOkResponse({ description: 'Returns a simple welcome message' })
	getHello(): string {
		return this.appService.getHello();
	}
}
