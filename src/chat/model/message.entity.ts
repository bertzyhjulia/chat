import { UserEntity } from 'src/user/model/user.entity';
import { UserI } from 'src/user/model/user.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  // @Column()
  // friend: UserI;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
