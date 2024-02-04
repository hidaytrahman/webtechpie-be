import { Injectable } from "@nestjs/common"
import { planList } from "./data"

@Injectable()
export class PlanServices {
	getPlans() {
		return planList
	}
}
