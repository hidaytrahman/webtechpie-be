import { Test, TestingModule } from "@nestjs/testing";
import { PagesController } from "./pages.controller";
import { PagesServices } from "./pages.services";

import pageLandingMock from "./_mock_/landing.page.json";
import pageSolutionsMock from "./_mock_/solutions.page.json";
// import pagePortfolioMock from "./_mock_/portfolio.page.json";

describe("PagesController", () => {
	let controller: PagesController;
	let pagesServices: PagesServices;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [PagesController],
			providers: [
				{
					provide: PagesServices,
					useClass: jest.fn().mockImplementation(() => ({
						getLanding: jest.fn(),
						fetchLanding: jest.fn(),
						fetchSolutions: jest.fn(),
						getSolutions: jest.fn(),
						getPortfolio: jest.fn(),
						createPage: jest.fn(),
					})),
				},
			],
		}).compile();

		controller = app.get<PagesController>(PagesController);
		pagesServices = app.get<PagesServices>(PagesServices);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	describe("root", () => {
		it('should return "getSolutions() results"', async () => {
			jest.spyOn(pagesServices, "fetchSolutions").mockResolvedValue(
				pageSolutionsMock
			);

			const response = await controller.getSolutions();
			expect(response).toEqual(pageSolutionsMock);
		});

		it('should return "fetchLanding() results"', async () => {
			jest.spyOn(pagesServices, "fetchLanding").mockResolvedValue(
				pageLandingMock
			);

			const response = await controller.getLanding();
			expect(response).toEqual(pageLandingMock);
		});

		// it('should return "createPage() results"', async () => {
		// 	jest.spyOn(pagesServices, "getPortfolio").mockResolvedValue(
		// 		pagePortfolioMock
		// 	);

		// 	const response = await controller.getPortfolio();
		// 	expect(response).toEqual(pagePortfolioMock);
		// });
	});
});
