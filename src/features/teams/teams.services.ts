import { Injectable } from "@nestjs/common";
import { teamMemberList } from "./data";

@Injectable()
export class TeamsServices {
	getTeams() {
		return "There are no any teams";
	}

	getTeamMemberList() {
		return teamMemberList;
	}

	addMember(payload: any) {
		if (payload) {
			teamMemberList.push(payload);
		} else {
			return {
				message: "Please provide requires payload",
			};
		}

		return {
			message: "Member has been added to the team",
		};
	}
}
