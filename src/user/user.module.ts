import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { UserEntity } from './model/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, LocalStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
