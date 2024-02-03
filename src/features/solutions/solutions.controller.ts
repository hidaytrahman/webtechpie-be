import { Controller, Get } from '@nestjs/common';
import { SolutionsServices } from './solutions.services';

@Controller('/solutions')
export class SolutionsController {

    constructor(private solutionsServices: SolutionsServices) { }
    @Get()
    getSolution(): string {
        return this.solutionsServices.getSolutions();
    }
}
