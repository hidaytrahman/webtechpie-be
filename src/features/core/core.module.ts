import { Module } from "@nestjs/common";
import { CoreController } from "./core.controller";
import { CoresServices } from "./core.services";
import { MongooseModule } from "@nestjs/mongoose";
import { Portoflio, PortoflioSchema } from "./schema/portfolio.schema";

@Module({
	controllers: [CoreController],
	providers: [CoresServices],
	imports: [
		MongooseModule.forFeature([
			{ name: Portoflio.name, schema: PortoflioSchema },
		]),
	],
})
export class CoreModule {}
