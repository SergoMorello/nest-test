
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private authService: AuthService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const [_, token] = req.header('Authorization')?.split(' ') ?? [];
		if (!token || !await this.authService.validate(token)) {
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}
		next();
	}
}
