import { Module } from '@nestjs/common';
import { SolutionsController } from './solutions.controller';
import { SolutionsServices } from './solutions.services';

@Module({
    controllers: [SolutionsController],
    providers: [SolutionsServices]
})
export class SolutionsModule { }
