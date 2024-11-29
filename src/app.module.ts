import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NotesModule, UserModule, AuthModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
