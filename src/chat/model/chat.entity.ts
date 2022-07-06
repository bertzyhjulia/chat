import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatUserEntity } from './chat_user.entity';

@Entity()
export class ChatEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  is_individual: boolean;

  @ApiProperty()
  @Column()
  logo: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @OneToMany(() => ChatUserEntity, (chatU) => chatU.chat_id)
  @JoinColumn()
  chatU: ChatUserEntity[];

  @ApiProperty()
  @Column()
  admin_id: number;
}
