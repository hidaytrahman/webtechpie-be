import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'The name of the contact', example: 'John', minLength: 2, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @ApiProperty({ description: 'The email of the contact', example: 'john@example.com', format: 'email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ description: 'The phone number of the contact', example: '+919876543210', minLength: 8, maxLength: 15 })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'The company of the contact', example: 'Freelancer', minLength: 2, maxLength: 100, required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ description: 'The designation of the contact', example: 'Software Engineer', minLength: 2, maxLength: 100, required: false })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty({ description: 'The location of the contact', example: 'Noida, India', minLength: 2, maxLength: 100, required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'The subject of the contact inquiry', example: 'General Inquiry', enum: ['General Inquiry', 'Technical Support', 'Education', 'Other'], required: true })
  @IsNotEmpty()
  @IsEnum(['General Inquiry', 'Technical Support', 'Education', 'Other'], {
    message: 'Please select a valid subject',
  })
  subject: string;

  @ApiProperty({ description: 'The message of the contact', example: 'I am interested in your services', minLength: 10, maxLength: 1000, required: false })
  @IsOptional()
  @IsString()
  @Length(10, 1000, {
    message: 'Message must be between 10 and 1000 characters',
  })
  message: string;
}