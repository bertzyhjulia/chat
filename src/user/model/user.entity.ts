import { IsOptional } from 'class-validator';
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
  @IsOptional()
  avatar: string;

  @CreateDateColumn()
  registerDate: Date;

  @OneToMany(() => Message, (message) => message.id)
  message: Message[];
}
