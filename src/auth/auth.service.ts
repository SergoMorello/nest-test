import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { TokenAuthDto } from './dto/token-auth.dto';

@Injectable()
export class AuthService {
	private user: UserDto;
	private token?: TokenAuthDto;

	constructor(private readonly db: DbService, private userService: UserService) {}

	public async validate(tokenRaw: string) {
		const [id, token] = tokenRaw.split('|');
		if (id && token) {
			const user = await this.userService.get({id: Number(id), withTokens: true});
			if (user?.access_tokens) {
				for await(const accessToken of user.access_tokens) {
					if (await bcrypt.compare(token, accessToken.token)) {
						this.setUser(user);
						this.setToken(accessToken);
						return true;
					}
				}
			}
		}
		return false;
	}

	public setUser({...user}: UserDto) {
		this.user = user;
	}

	public setToken(token: TokenAuthDto) {
		this.token = token;
	}
	
	public async login({email, password}: LoginAuthDto) {
		const user = await this.userService.get({email});
		if (user && await bcrypt.compare(password, user.password)) {
			const token = await this.userService.createToken(user.id);
			return {
				user: plainToClass(UserDto, user),
				token
			};
		}
		throw new ForbiddenException('Auth fail');
	}

	public async logout() {
		if (!this.token) return;
		await this.db.accessTokens.delete({
			where: {
				id: this.token.id
			}
		});
	}

	public async register({password, ...registerAuthDto}: RegisterAuthDto) {
		const salt = await bcrypt.genSalt();
    	const hashedPassword = await bcrypt.hash(password, salt);
		const user = this.db.users.create({
			data: {
				...registerAuthDto,
				password: hashedPassword
			}
		});
		return plainToClass(UserDto, user);
	}
}
