import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ChatUserEntity } from 'src/chat/model/chat_user.entity';
import { ActionEntity } from './model/action.entity';
import { Action } from './model/action.enum';
import { AbilityService } from './service/ability.service';

export type Subjects = InferSubjects<typeof ChatUserEntity> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  readonly abilityService: AbilityService;
  defineAbility(chat_user: ChatUserEntity) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    console.log('chat_user.chat_id   ' + chat_user.chat_id);
    //const actionMessage = this.abilityService.findOne(chat_user.chat_id);
    if (chat_user.role == 'admin') {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, ChatUserEntity).because('test');
      if ('this.action.CREATE_MESSAGE') {
        can(Action.Create, ChatUserEntity);
        can(Action.Update, ChatUserEntity, {
          user_id: { $ne: chat_user.user_id },
        });
        can(Action.Delete, ChatUserEntity, {
          user_id: { $ne: chat_user.user_id },
        });
      } else {
        cannot(Action.Create, ChatUserEntity);
        cannot(Action.Update, ChatUserEntity);
        cannot(Action.Delete, ChatUserEntity);
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
