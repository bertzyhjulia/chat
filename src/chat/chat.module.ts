import { Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './model/message.entity';
import { ChatGateway } from './gateway/chat.gateway';
import { UserEntity } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message, UserEntity]), UserModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
