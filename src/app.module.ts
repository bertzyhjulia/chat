import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { CaslModule } from './casl/casl.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ChatModule,
    UserModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    CaslModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
