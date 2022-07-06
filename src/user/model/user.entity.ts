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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  nickName: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiPropertyOptional()
  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  tel: number;

  @ApiProperty()
  @Column()
  avatar: string;

  @ApiProperty()
  @Column()
  avatar_original_name: string;

  @ApiProperty()
  @CreateDateColumn()
  registerDate: Date;

  @ApiProperty()
  @OneToMany(() => Message, (message) => message.user_id)
  message: Message[];

  @ApiProperty()
  @OneToMany(() => ChatUserEntity, (chatU) => chatU.user_id)
  chatU: ChatUserEntity[];
}
