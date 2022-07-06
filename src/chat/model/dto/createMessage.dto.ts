import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/user/model/user.entity';
import { ChatEntity } from '../chat.entity';
import { Message } from '../message.entity';

export class CreateMessageDto {
  @ApiProperty()
  chat_id: ChatEntity;
  @ApiProperty()
  text: string;
  @ApiPropertyOptional()
  parent_id?: Message;
}

export class UpdateMessageDto {
  @ApiPropertyOptional()
  user_id?: UserEntity;
  @ApiProperty()
  chat_id: ChatEntity;
  @ApiPropertyOptional()
  text?: string;
}
