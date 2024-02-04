import { Module } from "@nestjs/common";

import { PlanController } from "./plan.controller";
import { PlanServices } from "./plan.services";
import { Cat, CatSchema } from "src/schemas/cat.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
	],
	controllers: [PlanController],
	providers: [PlanServices],
})
export class PlanModule {}
