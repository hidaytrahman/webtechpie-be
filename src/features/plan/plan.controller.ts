import { Body, Controller, Get, Post } from "@nestjs/common";
import { PlanServices } from "./plan.services";

@Controller("plan") // {baseURL}/plan
export class PlanController {
	constructor(private planServices: PlanServices) {}

	@Get()
	getPlan() {
		return this.planServices.getPlans();
	}

	@Post("/create")
	async createPlan(@Body() body) {
		console.log({body})
		this.planServices.create(body);
		// if (result.affected == 0) {
		// 	throw new NotFoundException("No se ha podido crear el plan");
		// } else {
		// 	return "Se ha creado correctamente el plan";
		// }
	}

	// getPlan() {
	// 	return this.planServices.getPlans();
	// }
}
