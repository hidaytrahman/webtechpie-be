import { Module } from "@nestjs/common";
import { CoreController } from "./core.controller";
import { CoresServices } from "./core.services";

@Module({
	controllers: [CoreController],
	providers: [CoresServices],
})
export class CoreModule {}
