import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../message.entity';

@Entity()
export class ReactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reaction: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Message, (message) => message.id)
  message_id: Message;
}
