import { UserEntity } from 'src/user/model/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity()
export class ChatUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ default: false })
  ban: boolean;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.id)
  @JoinColumn()
  chat_id: ChatEntity;
}
