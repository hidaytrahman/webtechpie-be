import { Test, TestingModule } from "@nestjs/testing";
import { PagesController } from "./pages.controller";
import { PagesServices } from "./pages.services";

import pageLandingMock from "./_mock_/landing.page.json";

describe("PagesController", () => {
	let controller: PagesController;
	let pagesServices: PagesServices;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [PagesController],
			providers: [
				{
					provide: PagesServices,
					useValue: {
						fetchByName: jest.fn(),
						createPage: jest.fn(),
						findAll: jest.fn(),
						findOneById: jest.fn(),
						updatePage: jest.fn(),
						deletePage: jest.fn(),
					},
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
		it("should return page content by name", async () => {
			jest.spyOn(pagesServices, "fetchByName").mockResolvedValue(
				pageLandingMock
			);

			const response = await controller.getPageByName("landing");
			expect(response).toEqual(pageLandingMock);
		});

		it("should return all pages for admin", async () => {
			const pages = [pageLandingMock];
			jest.spyOn(pagesServices, "findAll").mockResolvedValue(pages as any);

			const response = await controller.getAllPages();
			expect(response).toEqual(pages);
		});
	});
});
