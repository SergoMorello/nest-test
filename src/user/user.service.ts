import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { GetUserDto } from './dto/get-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(private readonly db: DbService) {}

	create(createUserDto: CreateUserDto) {
		
	}

	findAll() {
		return `This action returns all user`;
	}

	async get({withTokens, ...getUserDto}: GetUserDto) {
		return this.db.users.findFirst({
			where: getUserDto,
			include: {
				access_tokens: withTokens
			}
		});
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}

	async createToken(userId: number) {
		const salt = await bcrypt.genSalt();
		const secretToken = await bcrypt.genSalt();
    	const token = await bcrypt.hash(secretToken, salt);
		await this.db.accessTokens.create({
			data: {
				userId,
				token
			}
		});
		return userId + '|' + secretToken;
	}

	async userExists({email}: Partial<UserDto>) {
		const user = await this.db.users.findFirst({
			where: {
				email
			}
		});
		return user ? true : false;
	}
}
