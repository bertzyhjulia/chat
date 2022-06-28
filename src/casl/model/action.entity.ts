import { ChatEntity } from 'src/chat/model/chat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  CREATE_MESSAGE: boolean;

  @Column({ unique: true })
  chat_id: number;
}
