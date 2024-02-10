import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PageoDocument = HydratedDocument<Page>;

@Schema()
export class Page {
	@Prop({ required: true }) title: string;
	@Prop({ required: true }) name: string;
	@Prop({ required: true }) descriptions: string;
	@Prop() meta: [string];
	@Prop() body: [string];
}

export const PageSchema = SchemaFactory.createForClass(Page);
