import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/user/model/user.entity';
import { ChatEntity } from '../chat.entity';

export class CreateChatUserDto {
  @ApiProperty()
  user_id: UserEntity;
  @ApiProperty()
  chat_id: ChatEntity;
  @ApiProperty()
  role: string;
  @ApiPropertyOptional()
  ban?: boolean;
}
export class CreateChatUserFirstDto {
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  chat_id: number;
  @ApiPropertyOptional()
  role?: string;
  @ApiPropertyOptional()
  ban?: boolean;
}
export class UpdateChatUserDto {
  @ApiPropertyOptional()
  user_id?: number;
  @ApiPropertyOptional()
  role?: string;
  @ApiPropertyOptional()
  ban?: boolean;
}
