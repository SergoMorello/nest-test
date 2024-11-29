import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CheckAuthDto } from './dto/check-auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('check/:email')
	check(@Param() {email}: CheckAuthDto) {}

	@Post('login')
	@HttpCode(200)
	login(@Body() loginAuthDto: LoginAuthDto) {
		return this.authService.login(loginAuthDto);
	}

	@Post('logout')
	@HttpCode(200)
	logout() {
		return this.authService.logout();
	}

	@Post('register')
	register(@Body() registerAuthDto: RegisterAuthDto) {
		return this.authService.register(registerAuthDto);
	}
	
}
