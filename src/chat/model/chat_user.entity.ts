import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  role: string;

  @ApiProperty()
  @Column({ default: false })
  ban: boolean;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;

  @ApiProperty()
  @ManyToOne(() => ChatEntity, (chat) => chat.id)
  @JoinColumn()
  chat_id: ChatEntity;
}
