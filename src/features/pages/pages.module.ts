import { Module } from "@nestjs/common";

import { PagesServices } from "./pages.services";
import { PagesController } from "./pages.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Page, PageSchema } from "./schema/portfolio.schema";

@Module({
	controllers: [PagesController],
	providers: [PagesServices],
	imports: [
		MongooseModule.forFeature([
			{ name: Page.name, schema: PageSchema },
		]),
	],
})
export class PagesModule {}
