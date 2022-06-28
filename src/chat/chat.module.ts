import { Module } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { MessageController } from './controller/message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './model/message.entity';
import { UserEntity } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';
import { ChatEntity } from './model/chat.entity';
import { ChatUserEntity } from './model/chat_user.entity';
import { ChatService } from './service/chat.service';
import { ChatUserService } from './service/chat_user.service';
import { ChatUserController } from './controller/chat_user.controller';
import { ChatController } from './controller/chat.controller';
import { ReactionsEntity } from './model/reactions/reaction.entity';
import { ReactionService } from './service/reaction.service';
import { ReactionController } from './controller/reaction.controller';
import { ReadMessageController } from './controller/readMessage.controller';
import { ReadMessageService } from './service/read_message.service';
import { ReadMessageEntity } from './model/read_message.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      UserEntity,
      ChatEntity,
      ChatUserEntity,
      ReactionsEntity,
      ReadMessageEntity,
    ]),
    UserModule,
  ],
  providers: [
    MessageService,
    ChatService,
    ChatUserService,
    ReactionService,
    ReadMessageService,
    CaslAbilityFactory,
  ],
  controllers: [
    MessageController,
    ChatController,
    ChatUserController,
    ReactionController,
    ReadMessageController,
  ],
  exports: [ChatUserService],
})
export class ChatModule {}
