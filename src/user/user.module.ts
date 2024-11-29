import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbService } from 'src/db/db.service';
import { IsEmailUserAlreadyExistConstraint } from './user.validator';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [UserController],
  imports: [DbModule],
  providers: [UserService, IsEmailUserAlreadyExistConstraint],
  exports: [UserService, IsEmailUserAlreadyExistConstraint]
})
export class UserModule {}
