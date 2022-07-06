import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AbilityController } from './controller/ability.controller';
import { ActionEntity } from './model/action.entity';
import { AbilityService } from './service/ability.service';

@Module({
  imports: [
    forwardRef(() => ChatModule),
    TypeOrmModule.forFeature([ActionEntity]),
  ],
  providers: [CaslAbilityFactory, AbilityService],
  exports: [CaslAbilityFactory, AbilityService],
  controllers: [AbilityController],
})
export class CaslModule {}
