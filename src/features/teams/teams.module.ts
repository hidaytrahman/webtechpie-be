import { Module } from "@nestjs/common";

import { TeamsServices } from "./teams.services";
import { TeamsController } from "./teams.controller";

@Module({
	controllers: [TeamsController],
	providers: [TeamsServices],
})
export class TeamsModule {}
