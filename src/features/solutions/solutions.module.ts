import { Module } from "@nestjs/common";
import { SolutionsController } from "./solutions.controller";
import { SolutionsServices } from "./solutions.services";
import { PagesModule } from "../pages/pages.module";

@Module({
	imports: [PagesModule],
	controllers: [SolutionsController],
	providers: [SolutionsServices],
})
export class SolutionsModule {}
