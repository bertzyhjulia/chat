import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class ReadMessageEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @ManyToOne(() => Message, (message) => message.id)
  message_id: Message;
}
