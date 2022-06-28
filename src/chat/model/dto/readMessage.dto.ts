import { Message } from '../message.entity';

export class CreateReadMessageDto {
  date: Date;
  user_id: number;
  message_id: Message;
}
