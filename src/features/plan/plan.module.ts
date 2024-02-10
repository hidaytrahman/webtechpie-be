import { Module } from "@nestjs/common";

import { PlanController } from "./plan.controller";
import { PlanServices } from "./plan.services";
// import { Cat, CatSchema } from "src/schemas/cat.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Plan, PlanSchema } from "./plan.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
	],
	controllers: [PlanController],
	providers: [PlanServices],
})
export class PlanModule {}
