import { Injectable } from "@nestjs/common";

@Injectable()
export class SolutionsServices {
	getSolutions() {
		return "This is the solution to your problem from services";
	}
}
