import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserService } from 'src/chat/service/chat_user.service';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from '../casl-ability.factory';
import { ActionEntity } from '../model/action.entity';

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
    private readonly chatUserService: ChatUserService,
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
    const allow = await this.findOne(body.chat_id);
    if (allow != undefined || allow != null) {
      allow.CREATE_MESSAGE = body.CREATE_MESSAGE;
      return this.actionRepository.save(allow);
    }
    return this.actionRepository.save(await this.actionRepository.create(body));
  }

  async findOne(chat_id: number) {
    return await this.actionRepository.findOneBy({ chat_id });
  }
}
