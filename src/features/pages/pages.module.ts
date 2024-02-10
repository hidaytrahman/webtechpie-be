import { Module } from "@nestjs/common";

import { PagesServices } from "./pages.services";
import { PagesController } from "./pages.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Portoflio, PortoflioSchema } from "./schema/portfolio.schema";

@Module({
	controllers: [PagesController],
	providers: [PagesServices],
	imports: [
		MongooseModule.forFeature([
			{ name: Portoflio.name, schema: PortoflioSchema },
		]),
	],
})
export class PagesModule {}
