import { Test, TestingModule } from "@nestjs/testing";
import { SolutionsController } from "./solutions.controller";
import { SolutionsServices } from "./solutions.services";

describe("SolutionsController", () => {
	let solutionsController: SolutionsController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [SolutionsController],
			providers: [SolutionsServices],
		}).compile();

		solutionsController = app.get<SolutionsController>(SolutionsController);
	});

	describe("root", () => {
		it('should return "solutions results"', () => {
			expect(solutionsController.getSolution()).toBe(
				"This is the solution to your problem from services"
			);
		});
	});
});
