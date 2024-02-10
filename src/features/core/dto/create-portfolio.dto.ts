import {
	IsArray,
	IsDefined,
	IsIn,
	IsOptional,
	IsString,
} from "class-validator";

export class CreatePortfolioDto {
	@IsDefined() @IsString() title: string;
	@IsDefined() @IsString() name: string;
	@IsDefined() @IsString() descriptions: string;
	@IsDefined() @IsString() url: string;
	@IsOptional() github: string;
	@IsOptional() @IsString() avatar: string;
	@IsOptional() @IsArray() technologies: [string];

	@IsDefined()
	@IsString({
		each: true,
	})
	@IsIn(["EXPERIMENTS", "DEV_COMMUNITY", "CLIENTS"]) type: string;
}
