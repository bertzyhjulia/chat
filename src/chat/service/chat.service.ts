import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from '../model/chat.entity';
import { CreateChatDto, UpdateChatDto } from '../model/dto/createChat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    readonly chatRepository: Repository<ChatEntity>,
  ) {}

  async create(dto: CreateChatDto, idUser: number) {
    if (dto.is_individual == true) {
      dto.logo = '';
      dto.title = '';
      dto.admin_id = 0;
    } else if (
      dto.is_individual == false &&
      (dto.title == null ||
        dto.title == undefined ||
        dto.logo == null ||
        dto.logo == undefined)
    ) {
      dto.logo = 'group';
      dto.title = '';
      dto.admin_id = idUser;
    }
    return this.chatRepository.save(await this.chatRepository.create(dto));
  }

  async update(id: number, dto: UpdateChatDto) {
    const chat = await this.findOne(id);
    chat.admin_id = dto.admin_id;
    chat.title = dto.title;
    chat.logo = dto.logo;
    if (chat.is_individual == true)
      throw new HttpException(
        'Direct can not update',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    return this.chatRepository.save(chat);
  }
  async getAllWhereUserId(id: number) {
    const query = this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.chatU', 'chat_user')
      .where('chat_user.chat_id = :id', { id });
    const chatUsers = query.getMany();
    return chatUsers;
  }

  async getAll() {
    return this.chatRepository.find();
  }

  async findOne(id: number) {
    return this.chatRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return this.chatRepository.delete(id);
  }
}
