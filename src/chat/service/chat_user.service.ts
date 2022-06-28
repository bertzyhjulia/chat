import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatUserEntity } from '../model/chat_user.entity';
import { CreateChatUserDto } from '../model/dto/createChatUser.dto';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(ChatUserEntity)
    readonly chatUserRepositiry: Repository<ChatUserEntity>,
  ) {}

  async create(dto: CreateChatUserDto) {
    const idChat = dto.chat_id;
    const idUser = dto.user_id;
    const res = await this.chatUserRepositiry
      .createQueryBuilder('cu')
      .where('cu.chat_id.id = :idChat And cu.user_id.id = :idUser', {
        idChat,
        idUser,
      })
      .getOne();
    if (res != undefined || res != null) {
      throw new HttpException('is exist', HttpStatus.FOUND);
    }
    return this.chatUserRepositiry.save(
      await this.chatUserRepositiry.create(dto),
    );
  }

  async findOne(idChat: number, idUser: number) {
    const res = await this.chatUserRepositiry
      .createQueryBuilder('cu')
      .where('cu.chat_id.id = :idChat And cu.user_id.id = :idUser', {
        idChat,
        idUser,
      })
      .getOne();
    if (res == undefined || res == null) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }
}
