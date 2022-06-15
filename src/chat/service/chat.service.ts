import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../model/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private chatRepository: Repository<Message>,
  ) {}
  async createMessage(chat: Message): Promise<Message> {
    return await this.chatRepository.save(chat);
  }

  getMessages(current_user: number, reciever_id: number): Promise<Message[]> {
    console.log(current_user);
    console.log(reciever_id);
    //current_user = current_user.id
    return this.chatRepository
      .createQueryBuilder('u')
      .where(
        ' u.user_id = :current_user And u.reciever_id = :reciever_id Or u.user_id = :reciever_id And u.reciever_id = :current_user',
        {
          current_user: current_user,
          reciever_id: reciever_id,
        },
      )
      .orderBy('u.createdAt', 'DESC')
      .getMany();
  }
}
