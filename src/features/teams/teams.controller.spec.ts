import { Test, TestingModule } from "@nestjs/testing";
import { TeamsController } from "./teams.controller";
import { TeamsServices } from "./teams.services";
import { teamMemberList } from "./data";

describe("TeamsController", () => {
	let teamsController: TeamsController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [TeamsController],
			providers: [TeamsServices],
		}).compile();

		teamsController = app.get<TeamsController>(TeamsController);
	});

	describe("root", () => {
		it('should return "There are no any teams"', () => {
			expect(teamsController.getTeams()).toBe("There are no any teams");
		});

		it('should return "Team members"', () => {
			expect(teamsController.getTeamsMembers()).toBe(teamMemberList);
		});
	});
});
