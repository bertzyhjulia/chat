import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Message } from '../model/message.entity';
import { ChatService } from '../service/chat.service';

@Controller('')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

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

  @Post('create/chat')
  async create(@Body() message: Message) {
    return this.chatService.createMessage(message);
  }
}
