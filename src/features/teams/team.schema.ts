import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	role: string;

	@Prop()
	avatar: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

