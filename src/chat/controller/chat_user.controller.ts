import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Action } from 'src/casl/model/action.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ChatUserEntity } from '../model/chat_user.entity';
import {
  CreateChatUserDto,
  UpdateChatUserDto,
} from '../model/dto/createChatUser.dto';
import { ChatService } from '../service/chat.service';
import { ChatUserService } from '../service/chat_user.service';
import { Patch } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('chat_user')
@ApiBearerAuth('access-token')
export class ChatUserController {
  constructor(
    private readonly chatUserService: ChatUserService,
    private readonly chatService: ChatService,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getFriends(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateChatUserDto, @Request() req) {
    dto.user_id = req.user.id;
    return this.chatUserService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:idChat/:idUser')
  async update(
    @Body() dto: UpdateChatUserDto,
    @Request() req,
    @Param('idChat') idChat: number,
    @Param('idUser') idUser: number,
  ) {
    dto.user_id = req.user.id;
    return this.chatUserService.update(dto, idChat, idUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:idChat')
  async deleteYouselfFromChat(@Param('idChat') idChat: number, @Request() req) {
    return this.chatUserService.delete(idChat, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:idChat/:idUser')
  async deleteUser(
    @Param('idChat') idChat: number,
    @Param('idUser') idUser: number,
  ) {
    const chat_user = await this.chatUserService.findOne(
      Number(idChat),
      idUser,
    );
    const ability = await this.abilityFactory.defineAbility(chat_user);
    const isAllowed = ability.can(Action.Delete, ChatUserEntity);
    if (!isAllowed) {
      throw new ForbiddenException('only admin');
    }
    return this.chatUserService.delete(idChat, idUser);
  }
}
