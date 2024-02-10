import { IsArray, IsDefined, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
	@IsDefined() @IsString() title: string;
	@IsDefined() @IsString() name: string;
	@IsDefined() @IsString() descriptions: string;
	@IsOptional() @IsArray() body: [string];
	@IsOptional() @IsArray() meta: [string];
}
