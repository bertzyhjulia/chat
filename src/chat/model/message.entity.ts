import { UserEntity } from 'src/user/model/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  reciever_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;

  @Column()
  text: string;
}
