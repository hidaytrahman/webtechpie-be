import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ITeamMember } from "./types";
import { Team } from "./team.schema";

@Injectable()
export class TeamsServices {
	constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

	getTeams() {
		return "There are no any teams";
	}

	async getTeamMemberList(): Promise<ITeamMember[]> {
		return this.teamModel.find().exec();
	}

	async addMember(payload: ITeamMember) {
		if (!payload) {
			return {
				message: "Please provide requires payload",
			};
		}

		const member = new this.teamModel(payload);
		await member.save();
		return {
			message: "Member has been added to the team",
		};
	}
}
