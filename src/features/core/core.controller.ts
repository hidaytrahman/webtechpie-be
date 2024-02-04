import { Controller, Get } from "@nestjs/common"

import { CoresServices } from "./core.services"

@Controller("/solutions")
export class CoreController {
	constructor(private coreServices: CoresServices) {}
	@Get()
	getSolution(): string {
		return this.coreServices.getSolutions()
	}
}
