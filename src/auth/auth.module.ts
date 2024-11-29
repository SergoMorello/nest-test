import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from 'src/db/db.service';
import { AuthMiddleware } from './auth.middleware';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { IsEmailUserAlreadyExistConstraint } from 'src/user/user.validator';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DbService, UserService, IsEmailUserAlreadyExistConstraint],
  imports: [UserModule]
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('/notes');
		consumer.apply(AuthMiddleware).forRoutes('/user');
		consumer.apply(AuthMiddleware).forRoutes('/auth/logout');
	}
}
