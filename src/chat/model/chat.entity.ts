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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  is_individual: boolean;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ChatUserEntity, (chatU) => chatU.chat_id)
  @JoinColumn()
  chatU: ChatUserEntity[];

  @Column()
  admin_id: number;
}
