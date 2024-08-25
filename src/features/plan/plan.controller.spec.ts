import { Test, TestingModule } from "@nestjs/testing";
import { PlanController } from "./plan.controller";
import { PlanServices } from "./plan.services";
import { planList } from "./data";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, Model, connect } from "mongoose";
import { Plan, PlanSchema } from "./plan.schema";
import { getModelToken } from "@nestjs/mongoose";
import { IPlan } from "./types";

export const PlanDTOStub = (): IPlan => {
	return {
		id: "55454",
		title: "This is the title of the article",
		descriptions: "Vinicius Santos de Pontes",
		name: "basic",
		type: "always",
		price: 2000,
		isPremium: false
	};
};

describe("auth", () => {
	let planController: PlanController;
	// let planServices: PlanServices;

	let mongod: MongoMemoryServer;
	let mongoConnection: Connection;
	let planModel: Model<Plan>;

	// const mockRepository = {
	// 	find() {
	// 		return {};
	// 	}
	// };
	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		mongoConnection = (await connect(uri)).connection;
		planModel = mongoConnection.model(Plan.name, PlanSchema);
		const app: TestingModule = await Test.createTestingModule({
			controllers: [PlanController],
			providers: [
				PlanServices,
				{ provide: getModelToken(Plan.name), useValue: planModel },
			],
		}).compile();
		planController = app.get<PlanController>(PlanController);
	});

	// beforeAll(async () => {
	// 	const module = await Test.createTestingModule({
	// 		imports: [PlanModule]
	// 	})
	// 		// .overrideProvider(getModelToken('Auth'))
	// 		// .useValue(mockRepository)
	// 		.compile();
	// 	planServices = module.get<PlanServices>(PlanServices);
	// });

	afterAll(async () => {
		await mongoConnection.dropDatabase();
		await mongoConnection.close();
		await mongod.stop();
	});

	afterEach(async () => {
		const collections = mongoConnection.collections;
		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany({});
		}
	});

	// beforeEach(async () => {
	// 	const app: TestingModule = await Test.createTestingModule({
	// 		controllers: [PlanController],
	// 		providers: [PlanServices],
	// 	}).compile();

	// 	planController = app.get<PlanController>(PlanController);
	// });

	describe("root", () => {
		it('should return "plan results"', () => {
			expect(planController.getPlan()).toBe(planList);
		});

		it("should return the saved object", async () => {
			const createdArticle =
				await planController.createPlan(PlanDTOStub());
			expect(createdArticle.title).toBe(PlanDTOStub().title);
		});
	});

});
