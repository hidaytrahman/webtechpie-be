import { Controller, Get, Post, RawBodyRequest, Req } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TeamsServices } from "./teams.services";
import { ITeamMember } from "./types";
import { Request } from "express";

@ApiTags("teams")
@Controller("/teams")
export class TeamsController {
	constructor(private teamsServices: TeamsServices) {}
	@Get()
	@ApiOperation({ summary: "Get teams summary" })
	@ApiOkResponse({ description: "Returns teams summary text" })
	getTeams(): string {
		return this.teamsServices.getTeams();
	}

	@Get("/members")
	@ApiOperation({ summary: "Get team members" })
	@ApiOkResponse({ description: "Returns list of team members" })
	getTeamsMembers(): ITeamMember[] {
		return this.teamsServices.getTeamMemberList();
	}

	@Post("/member")
	@ApiOperation({ summary: "Add a new team member" })
	@ApiBody({ description: "Arbitrary payload for creating a team member" })
	@ApiOkResponse({ description: "Returns created team member or status" })
	addMember(@Req() req: RawBodyRequest<Request>): any {
		console.log(req.body);
		const payload = req.body;

		return this.teamsServices.addMember(payload);
	}
}
