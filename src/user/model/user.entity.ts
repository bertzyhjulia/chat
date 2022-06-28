import { Message } from 'src/chat/model/message.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatUserEntity } from 'src/chat/model/chat_user.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column()
  nickName: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @Column()
  lastName: string;

  @Column()
  tel: number;

  @Column()
  avatar: string;

  @Column()
  avatar_original_name: string;

  @CreateDateColumn()
  registerDate: Date;

  @OneToMany(() => Message, (message) => message.user_id)
  message: Message[];

  @OneToMany(() => ChatUserEntity, (chatU) => chatU.user_id)
  chatU: ChatUserEntity[];
}
