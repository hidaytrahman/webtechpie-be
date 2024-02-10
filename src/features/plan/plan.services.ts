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

	async create(payload: CreatePlanDto): Promise<any> {
		// check if page is already exists
		const plan = await this.planModel.findOne({
			name: payload.name,
		});

		if (plan) {
			return {
				message: `Plan '${payload.name}' is already exists!`,
			};
		} else {
			const data = new this.planModel(payload);
			const result = await data.save();

			return {
				data: result,
				message: `Plan '${result.name}' has been successfully created!`,
			};
		}
	}

	async fetchPlans(): Promise<Plan[]> {
		return this.planModel.find().exec();
	}
}
