import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SolutionsServices } from "./solutions.services";

@ApiTags("solutions")
@Controller("/solutions")
export class SolutionsController {
	constructor(private solutionsServices: SolutionsServices) {}
	@Get()
	@ApiOperation({ summary: "Get solutions configuration" })
	@ApiOkResponse({ description: "Returns solutions information and highlights" })
	async getSolution(): Promise<any> {
		return this.solutionsServices.getSolutions();
	}
}
