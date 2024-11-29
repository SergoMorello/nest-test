import { Exclude } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { TokenAuthDto } from "src/auth/dto/token-auth.dto";

export class UserDto {
	id: number;
	@IsEmail()
	email: string;
	@IsString()
	name: string | null;
	@IsNumber()
	@IsOptional()
	age: number | null;
	@IsString()
	@IsOptional()
	phone: string | null;
	birthday_at: Date | null;
	@Exclude()
	access_tokens?: TokenAuthDto[];
	@Exclude()
	password: string;
	@Exclude()
	created_at: Date;
	@Exclude()
	updated_at: Date;
}
