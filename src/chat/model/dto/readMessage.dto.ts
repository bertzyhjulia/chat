import { ApiProperty } from '@nestjs/swagger';
import { Message } from '../message.entity';

export class CreateReadMessageDto {
  @ApiProperty()
  date: Date;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  message_id: Message;
}
