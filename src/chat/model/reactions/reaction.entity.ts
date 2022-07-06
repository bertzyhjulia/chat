import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  reaction: string;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @CreateDateColumn()
  date: Date;

  @ApiProperty()
  @ManyToOne(() => Message, (message) => message.id)
  message_id: Message;
}
