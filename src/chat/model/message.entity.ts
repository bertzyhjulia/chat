import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  //@ApiPropertyOptional()?????????
  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;

  @ApiProperty()
  @ManyToOne(() => ChatEntity, (chat) => chat.id)
  @JoinColumn()
  chat_id: ChatEntity;

  @ApiProperty()
  @OneToMany(() => ReactionsEntity, (reactions) => reactions.message_id)
  @JoinColumn()
  reactions: ReactionsEntity[];

  @ApiProperty()
  @OneToMany(() => ReadMessageEntity, (read) => read.message_id)
  @JoinColumn()
  read_id: ReadMessageEntity[];

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn()
  parent_id: Message;
}
