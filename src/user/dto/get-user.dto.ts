import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto extends PartialType(CreateUserDto) {
	id?: number;
	email?: string;
	withTokens?: boolean
}
