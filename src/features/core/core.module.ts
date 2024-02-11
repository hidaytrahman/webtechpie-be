import { Module } from "@nestjs/common";
import { CoreController } from "./core.controller";
import { CoresServices } from "./core.services";
import { MongooseModule } from "@nestjs/mongoose";
import { Portfolio, PortfolioSchema } from "./schema/portfolio.schema";

@Module({
	controllers: [CoreController],
	providers: [CoresServices],
	imports: [
		MongooseModule.forFeature([
			{ name: Portfolio.name, schema: PortfolioSchema },
		]),
	],
})
export class CoreModule {}
