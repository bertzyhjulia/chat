import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserEntity } from 'src/chat/model/chat_user.entity';
import { ChatUserService } from 'src/chat/service/chat_user.service';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AbilityController } from './controller/ability.controller';
import { ActionEntity } from './model/action.entity';
import { AbilityService } from './service/ability.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity, ChatUserEntity])],
  providers: [CaslAbilityFactory, AbilityService, ChatUserService],
  exports: [CaslAbilityFactory],
  controllers: [AbilityController],
})
export class CaslModule {}
