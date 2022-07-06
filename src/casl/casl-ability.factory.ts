import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ChatUserEntity } from 'src/chat/model/chat_user.entity';
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
    if (chat_user.role == 'admin') {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, ChatUserEntity);
      can(Action.Create, ChatUserEntity);
      can(Action.Update, ChatUserEntity, {
        user_id: { $ne: chat_user.user_id },
      });
      can(Action.Delete, ChatUserEntity, {
        user_id: { $ne: chat_user.user_id },
      });
      can(Action.UPDATE_GROUP_DATA, ChatUserEntity);
      cannot(Action.BAN, ChatUserEntity).because('only admin');
      if (chat_user.ban == true) {
        cannot(Action.Read, ChatUserEntity).because('ban');
        cannot(Action.Create, ChatUserEntity).because('ban');
        cannot(Action.Update, ChatUserEntity).because('ban');
        cannot(Action.Delete, ChatUserEntity).because('ban');
        cannot(Action.UPDATE_GROUP_DATA, ChatUserEntity).because('ban');
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
