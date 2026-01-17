import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateProfileDto {
	@IsString()
	@IsOptional()
	firstName?: string;

	@IsString()
	@IsOptional()
	lastName?: string;

	@IsString()
	@IsUrl()
	@IsOptional()
	picture?: string;
}

