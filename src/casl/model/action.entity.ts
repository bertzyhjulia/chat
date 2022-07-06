import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActionEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: true })
  CREATE_MESSAGE: boolean;

  @ApiProperty()
  @Column({ default: true })
  UPDATE_GROUP_DATA: boolean;

  @ApiProperty()
  @Column({ unique: true })
  chat_id: number;
}
