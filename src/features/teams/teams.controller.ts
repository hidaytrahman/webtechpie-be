import { Controller, Get, Post, RawBodyRequest, Req } from "@nestjs/common"
import { TeamsServices } from "./teams.services"
import { ITeamMember } from "./types"
import { Request } from "express"

@Controller("/teams")
export class TeamsController {
	constructor(private teamsServices: TeamsServices) {}
	@Get()
	getTeams(): string {
		return this.teamsServices.getTeams()
	}

	@Get("/members")
	getTeamsMembers(): ITeamMember[] {
		return this.teamsServices.getTeamMemberList()
	}

	@Post("/member")
	addMember(@Req() req: RawBodyRequest<Request>): any {
		console.log(req.body)
		const payload = req.body

		return this.teamsServices.addMember(payload)
	}
}
