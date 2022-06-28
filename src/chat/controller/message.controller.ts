import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/model/action.enum';
import { UserService } from 'src/user/user.service';
import { ChatUserEntity } from '../model/chat_user.entity';
import {
  CreateMessageDto,
  UpdateMessageDto,
} from '../model/dto/createMessage.dto';
import { ChatUserService } from '../service/chat_user.service';
import { MessageService } from '../service/message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly chatUserService: ChatUserService,
    private readonly abilityFactory: CaslAbilityFactory,
  ) {}

  @Get('')
  @Render('index')
  Home() {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateMessageDto, @Request() req) {
    const idChat = dto.chat_id;
    console.log('idChat   ' + Number(idChat));
    const chat_user = await this.chatUserService.findOne(
      Number(idChat),
      req.user.id,
    );
    const ability = await this.abilityFactory.defineAbility(chat_user);
    const isAllowed = ability.can(Action.Read, ChatUserEntity);
    if (!isAllowed) {
      throw new ForbiddenException('only admin');
    }
    return this.messageService.createMessage(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateMessageDto) {
    return this.messageService.updateMessage(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:idChat')
  async getMessages(@Param('idChat') idChat: number, @Request() req) {
    const chat_user = await this.chatUserService.findOne(idChat, req.user.id);
    const ability = await this.abilityFactory.defineAbility(chat_user);
    const isAllowed = ability.can(Action.Read, ChatUserEntity);
    if (!isAllowed) {
      throw new ForbiddenException('only admin');
    }
    return this.messageService.getMessages(idChat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getFriends')
  async getFriends(@Request() req) {
    return this.userService.findAll(req.user.id);
  }
}
