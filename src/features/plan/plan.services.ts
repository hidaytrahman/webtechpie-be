import { Injectable } from "@nestjs/common";
import { planList } from "./data";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Cat } from "src/schemas/cat.schema";
import { CreateCatDto } from "./create-cat.dto";

@Injectable()
export class PlanServices {
	constructor(
		@InjectModel(Cat.name) private catModel: Model<Cat>,
		@InjectConnection() private connection: Connection
	) {}

	getPlans() {
		return planList;
	}

	async create(createCatDto: CreateCatDto): Promise<Cat> {
		console.log(' createCatDto ', createCatDto);

		const createdCat = new this.catModel(createCatDto);
		return createdCat.save();
	}

	async findAll(): Promise<Cat[]> {
		return this.catModel.find().exec();
	}
}
