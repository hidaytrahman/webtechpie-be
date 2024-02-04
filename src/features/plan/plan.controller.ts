import { Controller, Get } from "@nestjs/common"
import { PlanServices } from "./plan.services"

@Controller("plan") // {baseURL}/plan
export class PlanController {
	constructor(private planServices: PlanServices) {}

	@Get()
	getPlan() {
		return this.planServices.getPlans()
	}
}
