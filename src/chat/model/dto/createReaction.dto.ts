import { ApiProperty } from '@nestjs/swagger';
import { Message } from '../message.entity';

export class CreateReactionDto {
  @ApiProperty()
  reaction: string;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  message_id: Message;
}
