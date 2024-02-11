import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema()
export class Portfolio {
	@Prop({ required: true }) title: string;
	@Prop({ required: true }) name: string;
	@Prop({ required: true }) descriptions: string;
	@Prop({ required: true }) type: string;
	@Prop({ required: true }) url: string;
	@Prop() github: string;
	@Prop() avatar: string;
	@Prop() technologies: [string];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
