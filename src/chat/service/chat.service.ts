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

  async getMessages(): Promise<Message[]> {
    return await this.chatRepository.find();
  }
}
