import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @ApiProperty({ description: 'The name of the contact', example: 'John'})
  @Prop({ required: true, minlength: 2, maxlength: 100 })
  name: string;

  @ApiProperty({ description: 'The email of the contact', example: 'john@example.com'})
  @Prop({ required: true, unique: false })
  email: string;

  @ApiProperty({ description: 'The phone number of the contact', example: '+919876543210'})
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ description: 'The company of the contact', example: 'Freelancer'})
  @Prop({ required: false })
  company?: string;

  @ApiProperty({ description: 'The designation of the contact', example: 'Software Engineer'})
  @Prop({ required: false })
  designation?: string;

  @ApiProperty({ description: 'The location of the contact', example: 'Noida, India'})
  @Prop({ required: false })
  location?: string;

  @ApiProperty({ description: 'The subject of the contact inquiry', example: 'General Inquiry', enum: ['General Inquiry', 'Technical Support', 'Education', 'Other']})
  @Prop({ required: true, enum: ['General Inquiry', 'Technical Support', 'Education', 'Other'] })
  subject: string;

  @ApiProperty({ description: 'The message of the contact', example: 'I am interested in your services', minLength: 10, maxLength: 1000})
  @Prop({ required: true, minlength: 10, maxlength: 1000 })
  message: string;

  @ApiProperty({ 
    description: 'The date when the contact was created',
    example: '2023-04-01T12:00:00.000Z'
  })
  createdAt?: Date;

  @ApiProperty({ 
    description: 'The date when the contact was last updated',
    example: '2023-04-01T12:00:00.000Z'
  })
  updatedAt?: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);