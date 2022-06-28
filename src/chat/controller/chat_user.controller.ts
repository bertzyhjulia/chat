import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserService } from 'src/user/user.service';
import { CreateChatUserDto } from '../model/dto/createChatUser.dto';
import { ChatService } from '../service/chat.service';
import { ChatUserService } from '../service/chat_user.service';

@Controller('chat_user')
export class ChatUserController {
  constructor(
    private readonly chatUserService: ChatUserService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getFriends(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateChatUserDto) {
    return this.chatUserService.create(dto);
  }
}
