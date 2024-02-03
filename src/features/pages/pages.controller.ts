import { Controller, Get } from '@nestjs/common';
import { PagesServices } from './pages.services';

@Controller('/pages')
export class PagesController {

    constructor(private pagesServices: PagesServices) { }
    @Get("/landing")
    getLanding(): any {
        return this.pagesServices.getLanding();
    }

    // pages/config


    // pages/services
    @Get("/solutions")
    getSolutions(): any {
        return this.pagesServices.getSolutions();
    }

    // pages/portfolio
    @Get("/portfolio")
    getPortfolio(): any {
        return this.pagesServices.getPortfolio();
    }

    // pages/about

    // pages/navigations
    @Get("/navigations")
    getNavigations(): any {
        return this.pagesServices.getNavigations();
    }

    // pages/members
}
