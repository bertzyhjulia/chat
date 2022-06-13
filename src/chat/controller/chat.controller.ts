import {
  Body,
  Controller,
  Get,
  Param,
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

  @UseGuards(JwtAuthGuard)
  @Post('create/chat/:id')
  async create(
    @Body() message: Message,
    @Request() req,
    @Param('id') id: number,
  ) {
    message.user_id = req.user.id;
    message.reciever_id = id;
    return this.chatService.createMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/chat/:reciever_id')
  async getMessages(@Request() req, @Param('reciever_id') reciever_id: number) {
    console.log('req   ' + req.user);
    return this.chatService.getMessages(req.user, reciever_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/chat')
  async getFriends(@Request() req) {
    return this.userService.findAll(req.user.id);
  }
}
