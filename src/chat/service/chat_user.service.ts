import { ForbiddenException } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatUserEntity } from '../model/chat_user.entity';
import {
  CreateChatUserDto,
  UpdateChatUserDto,
} from '../model/dto/createChatUser.dto';
import { ChatService } from './chat.service';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(ChatUserEntity)
    readonly chatUserRepositiry: Repository<ChatUserEntity>,
    readonly chatService: ChatService,
  ) {}

  async create(dto: CreateChatUserDto) {
    const chatIsExist = this.chatService.findOne(Number(dto.chat_id));
    if (chatIsExist == null || chatIsExist == undefined) {
      throw new HttpException('chat is not exist', HttpStatus.NOT_FOUND);
    }
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

  async update(dto: UpdateChatUserDto, id: number, idUser: number) {
    const user = dto.user_id;
    const isAdmin = await this.chatUserRepositiry
      .createQueryBuilder('cu')
      .where('cu.chat_id = :id And cu.user_id = :user', {
        id,
        user,
      })
      .getOne();
    if (isAdmin.role != 'admin') {
      throw new ForbiddenException('only admin');
    }
    const res = await this.chatUserRepositiry
      .createQueryBuilder('cu')
      .where('cu.chat_id = :id And cu.user_id = :idUser', {
        id,
        idUser,
      })
      .getOne();
    if (res == undefined || res == null) {
      throw new HttpException('not exist', HttpStatus.NOT_FOUND);
    }
    res.ban = dto.ban;
    res.role = dto.role;
    return this.chatUserRepositiry.save(res);
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
      throw new HttpException(
        'not found user in this chat',
        HttpStatus.NOT_FOUND,
      );
    }
    return res;
  }

  async delete(idChat, idUser) {
    const user = await this.findOne(idChat, idUser);
    return this.chatUserRepositiry.delete(user.id);
  }
}
