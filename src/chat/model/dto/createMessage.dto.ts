import { UserEntity } from 'src/user/model/user.entity';
import { ChatEntity } from '../chat.entity';
import { Message } from '../message.entity';

export class CreateMessageDto {
  chat_id: ChatEntity;
  text: string;
  parent_id?: Message;
}

export class UpdateMessageDto {
  user_id?: UserEntity;
  chat_id: ChatEntity;
  text?: string;
}
