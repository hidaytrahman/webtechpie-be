import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true, minlength: 2, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: false })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  company?: string;

  @Prop({ required: false })
  designation?: string;

  @Prop({ required: false })
  location?: string;

  @Prop({ required: true, enum: ['General Inquiry', 'Technical Support', 'Education', 'Other'] })
  subject: string;

  @Prop({ required: true, minlength: 10, maxlength: 1000 })
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);