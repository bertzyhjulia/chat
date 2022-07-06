import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AbilityService } from 'src/casl/service/ability.service';
import { Repository } from 'typeorm';
import {
  CreateMessageDto,
  UpdateMessageDto,
} from '../model/dto/createMessage.dto';
import { Message } from '../model/message.entity';
import { ChatUserService } from './chat_user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private chatUserService: ChatUserService,
    private abilityService: AbilityService,
    private abilityFactory: CaslAbilityFactory,
  ) {}
  async createMessage(dto: CreateMessageDto): Promise<Message> {
    return await this.messageRepository.save(
      await this.messageRepository.create(dto),
    );
  }

  async updateMessage(id: number, dto: UpdateMessageDto): Promise<Message> {
    const message = await this.findOne(id);
    message.text = dto.text;
    return await this.messageRepository.save(message);
  }

  findOne(id: number) {
    return this.messageRepository.findOneBy({ id });
  }

  getMessages(id: number): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.parent_id', 'pa')
      .leftJoinAndSelect('u.reactions', 'reactions')
      .leftJoinAndSelect('u.read_id', 'read')
      .leftJoinAndSelect('u.chat_id', 'chat1s')
      .where('u.chat_id.id = :id', { id })
      .orderBy('u.createdAt', 'DESC')
      .getMany();
  }

  async delete(id: number) {
    return this.messageRepository.delete(id);
  }
}
