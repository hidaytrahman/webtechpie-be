import { Injectable } from "@nestjs/common";
import { navigationsResponse } from "./utils/navigation.utils";
import { INavigationResponse } from "./utils/types";

@Injectable()
export class CoresServices {
	getNavigations(): INavigationResponse {
		return navigationsResponse;
	}
}
