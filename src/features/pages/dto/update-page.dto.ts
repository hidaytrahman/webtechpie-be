import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePageDto {
	@IsOptional() @IsString() title?: string;
	@IsOptional() @IsString() name?: string;
	@IsOptional() @IsString() descriptions?: string;
	@IsOptional() @IsArray() body?: [string];
	@IsOptional() @IsArray() meta?: [string];
}
