import { Injectable } from "@nestjs/common";
import { planList } from "./data";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Plan } from "./plan.schema";
import { CreatePlanDto } from "./create-plan.dto";

@Injectable()
export class PlanServices {
	constructor(
		@InjectModel(Plan.name) private planModel: Model<Plan>,
		@InjectConnection() private connection: Connection
	) {}

	getPlans() {
		return planList;
	}

	async create(createPlanDto: CreatePlanDto): Promise<any> {
		console.log(' createPlanDto ', createPlanDto);

		const createdPlan = new this.planModel(createPlanDto);

		console.log({createdPlan});

		const result = await createdPlan.save();
		console.log("mnyss result", result)

		return {
			data: result,
			message: `Plan '${createPlanDto.name}' has been successfully created!`,
		};
	}

	async findAll(): Promise<Plan[]> {
		return this.planModel.find().exec();
	}
}
