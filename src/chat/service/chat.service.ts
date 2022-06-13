import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/model/user.entity';
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

  async getMessages(
    current_user: UserEntity,
    reciever_id: number,
  ): Promise<Message[]> {
    console.log(current_user);
    return await this.chatRepository.find({
      where: {
        current_user.id,
        reciever_id,
      },
    });
  }
}
