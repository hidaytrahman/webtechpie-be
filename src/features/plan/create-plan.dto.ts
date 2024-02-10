import {
	IsBoolean,
	IsDefined,
	IsIn,
	IsNumber,
	IsString,
} from "class-validator";

export class CreatePlanDto {
	@IsDefined() @IsString() title: string;
	@IsDefined() @IsString() name: string;
	@IsDefined() @IsString() descriptions: string;

	@IsDefined()
	@IsString({
		each: true,
	})
	@IsIn(["limited", "always"]) type: string;

	@IsDefined() @IsNumber() price: number;
	@IsDefined() @IsBoolean() isPremium: boolean;
}
