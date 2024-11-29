import { Exclude } from "class-transformer";
import { LoginAuthDto } from "./login-auth.dto";
import { IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { IsEmailUserAlreadyExist } from "src/user/user.validator";
import { PrismaClient } from "@prisma/client";


export class RegisterAuthDto extends LoginAuthDto {
	id: number;
	@IsEmailUserAlreadyExist({
		message: 'Пользователь с таким email уже существует',
	})
	email: string;
	@IsString()
	name: string;
	@IsNumber()
	@IsOptional()
	age: number;
	@IsString()
	@IsOptional()
	phone: string;
	weight: number;
	height: number;
	// @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {message: 'Пароль должен содержать A-Z'})
	password: string;
	@Exclude()
	created_at: Date;
	@Exclude()
	updated_at: Date;
}
