import { UserEntity } from 'src/user/model/user.entity';
import { ChatEntity } from '../chat.entity';

export class CreateChatUserDto {
  user_id: UserEntity;
  chat_id: ChatEntity;
  role: string;
  ban?: boolean;
}
export class UpdateChatUserDto {
  user_id?: number;
  role?: string;
  ban?: boolean;
}
