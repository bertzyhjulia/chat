import { Message } from '../message.entity';

export class CreateReactionDto {
  reaction: string;
  user_id: number;
  message_id: Message;
}
