import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlanServices } from './plan.services';
import { CreatePlanDto } from './create-plan.dto';
import { Plan } from './plan.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('plan')
@Controller('plan')
export class PlanController {
	constructor(private planServices: PlanServices) {}

	@Get()
	@ApiOperation({ summary: 'Get all plans' })
	@ApiOkResponse({ description: 'Returns list of plans', type: [Plan] })
	async getPlan() {
		return this.planServices.getPlans();
	}

	@Post('/create')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Create a new plan' })
	@ApiBody({ type: CreatePlanDto })
	@ApiOkResponse({ description: 'Returns created plan' })
	async createPlan(@Body() createUserDto: CreatePlanDto) {
		return this.planServices.create(createUserDto);
	}
}
