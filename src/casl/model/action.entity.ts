import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  CREATE_MESSAGE: boolean;

  @Column({ default: true })
  UPDATE_GROUP_DATA: boolean;

  @Column({ unique: true })
  chat_id: number;
}
