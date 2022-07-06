import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserEntity } from 'src/chat/model/chat_user.entity';
import { UpdateChatDto } from 'src/chat/model/dto/createChat.dto';
import {
  CreateMessageDto,
  UpdateMessageDto,
} from 'src/chat/model/dto/createMessage.dto';
import { ChatService } from 'src/chat/service/chat.service';
import { ChatUserService } from 'src/chat/service/chat_user.service';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { ActionEntity } from '../model/action.entity';
import { Action } from '../model/action.enum';

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(ActionEntity)
    private actionRepository: Repository<ActionEntity>,
    private readonly chatUserService: ChatUserService,
    private readonly chatService: ChatService,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {}

  async createAllows(body: ActionEntity, user_id: number) {
    const chat_user = await this.chatUserService.findOne(body.chat_id, user_id);
    let isAllowed = false;
    if (chat_user.role == 'admin') {
      isAllowed = true;
    }
    if (!isAllowed) {
      throw new ForbiddenException('only admin');
    }
    const allow = await this.findOneAllow(body.chat_id);
    if (allow != undefined || allow != null) {
      allow.CREATE_MESSAGE = body.CREATE_MESSAGE;
      return this.actionRepository.save(allow);
    }
    return this.actionRepository.save(await this.actionRepository.create(body));
  }

  async getAllows(chatuser_id: ChatUserEntity, idChat: any) {
    const chat_id = await this.chatService.findOne(idChat);
    if (chatuser_id.role == 'user') {
      const allow = await this.findOneAllow(chat_id.id);
      if (
        allow.CREATE_MESSAGE == false ||
        allow == null ||
        allow == undefined
      ) {
        throw new ForbiddenException('no access');
      }
      return true;
    }
  }

  async findOne(chat_id: number) {
    const bool = await this.actionRepository.findOneBy({ chat_id });
    if (bool != null || bool != null) {
      return true;
    }
    return false;
  }

  async findOneAllow(chat_id: number) {
    return await this.actionRepository.findOneBy({ chat_id });
  }

  async getAllowsForUpdate(id: number, dto: UpdateChatDto, idUser: number) {
    const chat_user = await this.chatUserService.findOne(
      Number(id),
      Number(idUser),
    );
    await this.getAllows(chat_user, id);
    const ability = await this.abilityFactory.defineAbility(chat_user);
    ability.can(Action.UPDATE_GROUP_DATA, ChatUserEntity);
    return true;
  }

  async getAllowsForCreate(dto: CreateMessageDto, idUser: number) {
    const idChat = dto.chat_id;
    const chat_user = await this.chatUserService.findOne(
      Number(idChat),
      Number(idUser),
    );
    await this.getAllows(chat_user, idChat);
    const ability = await this.abilityFactory.defineAbility(chat_user);
    ability.can(Action.Create, ChatUserEntity);
    return true;
  }

  async getAllowsForUpdateMessage(dto: UpdateMessageDto, idUser: number) {
    const idChat = dto.chat_id;
    const chat_user = await this.chatUserService.findOne(
      Number(idChat),
      Number(idUser),
    );
    await this.getAllows(chat_user, idChat);
    const ability = await this.abilityFactory.defineAbility(chat_user);
    ability.can(Action.Update, ChatUserEntity);
    return true;
  }

  async getAllowsForDelete(idChat: number, idUser: number) {
    const chat_user = await this.chatUserService.findOne(
      Number(idChat),
      Number(idUser),
    );
    await this.getAllows(chat_user, idChat);
    const ability = await this.abilityFactory.defineAbility(chat_user);
    ability.can(Action.Delete, ChatUserEntity);
    return true;
  }
}
