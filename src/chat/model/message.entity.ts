import { UserEntity } from 'src/user/model/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';
import { ReactionsEntity } from './reactions/reaction.entity';
import { ReadMessageEntity } from './read_message.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.id)
  @JoinColumn()
  chat_id: ChatEntity;

  @OneToMany(() => ReactionsEntity, (reactions) => reactions.message_id)
  @JoinColumn()
  reactions: ReactionsEntity[];

  @OneToMany(() => ReadMessageEntity, (read) => read.message_id)
  @JoinColumn()
  read_id: ReadMessageEntity[];

  @Column()
  text: string;

  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn()
  parent_id: Message;
}
