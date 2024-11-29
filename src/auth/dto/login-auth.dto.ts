import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginAuthDto {
	@IsEmail()
	email: string;
	@IsNotEmpty()
	@IsString()
	password: string;
}
