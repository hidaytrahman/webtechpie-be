import {
	Controller,
	Get,
	Post,
	RawBodyRequest,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamsServices } from './teams.services';
import { ITeamMember } from './types';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('teams')
@Controller('/teams')
export class TeamsController {
	constructor(private teamsServices: TeamsServices) {}
	@Get()
	@ApiOperation({ summary: 'Get teams summary' })
	@ApiOkResponse({ description: 'Returns teams summary text' })
	getTeams(): string {
		return this.teamsServices.getTeams();
	}

	@Get('/members')
	@ApiOperation({ summary: 'Get team members' })
	@ApiOkResponse({ description: 'Returns list of team members' })
	async getTeamsMembers(): Promise<ITeamMember[]> {
		return this.teamsServices.getTeamMemberList();
	}

	@Post('/member')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Add a new team member' })
	@ApiBody({ description: 'Arbitrary payload for creating a team member' })
	@ApiOkResponse({ description: 'Returns created team member or status' })
	async addMember(@Req() req: RawBodyRequest<Request>): Promise<any> {
		console.log(req.body);
		const payload = req.body;

		return this.teamsServices.addMember(payload);
	}
}
