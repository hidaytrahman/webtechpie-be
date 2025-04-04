import { IsEmail, IsNotEmpty, IsString, Length, IsOptional, IsEnum } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsEnum(['General Inquiry', 'Technical Support', 'Education', 'Other'], {
    message: 'Please select a valid subject',
  })
  subject: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 1000, {
    message: 'Message must be between 10 and 1000 characters',
  })
  message: string;
}