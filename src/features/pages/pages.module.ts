import { Module } from "@nestjs/common";

import { PagesServices } from "./pages.services";
import { PagesController } from "./pages.controller";

@Module({
	controllers: [PagesController],
	providers: [PagesServices],
})
export class PagesModule {}
