import { Test, TestingModule } from "@nestjs/testing";
import { SolutionsController } from "./solutions.controller";
import { SolutionsServices } from "./solutions.services";

describe("SolutionsController", () => {
	let solutionsController: SolutionsController;
	let solutionsServices: SolutionsServices;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [SolutionsController],
			providers: [
				{
					provide: SolutionsServices,
					useValue: {
						getSolutions: jest.fn(),
					},
				},
			],
		}).compile();

		solutionsController = app.get<SolutionsController>(SolutionsController);
		solutionsServices = app.get<SolutionsServices>(SolutionsServices);
	});

	describe("root", () => {
		it("should return solutions from service", async () => {
			const mockResponse = { title: "Solutions", name: "solutions" };
			jest
				.spyOn(solutionsServices, "getSolutions")
				.mockResolvedValue(mockResponse);

			const result = await solutionsController.getSolution();

			expect(result).toEqual(mockResponse);
		});
	});
});
