import { Module } from "@nestjs/common";

import { PlanController } from "./plan.controller";
import { PlanServices } from "./plan.services";

@Module({
	controllers: [PlanController],
	providers: [PlanServices],
})
export class PlanModule {}
