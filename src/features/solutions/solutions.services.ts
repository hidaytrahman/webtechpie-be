import { Injectable } from '@nestjs/common';
import { PagesServices } from '../pages/pages.services';

@Injectable()
export class SolutionsServices {
	constructor(private readonly pagesServices: PagesServices) {}

	async getSolutions(): Promise<any> {
		return this.pagesServices.fetchByName('solutions');
	}
}
