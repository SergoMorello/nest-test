import { Exclude, Expose, plainToInstance } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { IsEmailUserAlreadyExist } from "src/user/user.validator";

export class CheckAuthDto {
	@IsEmail()
	@IsEmailUserAlreadyExist({
		message: 'Пользователь с таким email уже существует',
	})
	email: string;
}
