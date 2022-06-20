import { IsOptional } from 'class-validator';
import { Message } from 'src/chat/model/message.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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
  avatar: string;

  @Column()
  avatar_original_name: string;

  // @JoinColumn({ name: 'avatarId' })
  // @OneToOne(() => DatabaseFile, {
  //   nullable: true,
  // })
  // public avatar?: DatabaseFile;

  // @Column({ nullable: true })
  // public avatarId?: number;

  @CreateDateColumn()
  registerDate: Date;

  @OneToMany(() => Message, (message) => message.id)
  message: Message[];
}
