import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { Message } from '../model/message.entity';
import { ChatService } from '../service/chat.service';

@Controller('')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @Get('/chat')
  @Render('index')
  Home() {
    return;
  }

  @Get('/api/chat')
  async Chat(@Res() res) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create/chat')
  async create(@Body() message: Message, @Request() req, id: number) {
    //message.friend = this.userService.findfriend(id);
    message.user = req.user.id;
    return this.chatService.createMessage(message);
  }
}
