import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
	@Prop({ required: true }) title: string;
	@Prop({ required: true }) name: string;
	@Prop({ required: true }) descriptions: string;
	@Prop({ required: true }) type: string;
	@Prop({ required: true }) price: number;
	@Prop({ required: true }) isPremium: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
