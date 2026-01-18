import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeamsServices } from "./teams.services";
import { TeamsController } from "./teams.controller";
import { Team, TeamSchema } from "./team.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
	],
	controllers: [TeamsController],
	providers: [TeamsServices],
})
export class TeamsModule {}
