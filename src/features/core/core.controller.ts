import { Controller, Get } from "@nestjs/common";

import { CoresServices } from "./core.services";
import { INavigationResponse } from "./utils/types";

@Controller("/core") // {baseURL}/core
export class CoreController {
	constructor(private coreServices: CoresServices) {}

	// core/navigations
	@Get("/navigations")
	getNavigations(): INavigationResponse {
		return this.coreServices.getNavigations();
	}
}
