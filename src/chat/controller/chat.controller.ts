import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Render,
  Request,
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
  @Post('create/chat')
  async create(@Body() message: Message, @Request() req) {
    message.user_id = req.user;
    console.log('chat.reciever_id   ' + message.reciever_id);
    console.log('chat.user_id.id   ' + message.user_id.id);
    const friendIsExist = this.userService.findOneFiend(message.reciever_id);
    friendIsExist.then((reciever) => {
      console.log('res   ' + reciever.id);
      if (!reciever) {
        console.log('exeption');
        throw new HttpException(
          'Reciever doesnt exist: change reciever',
          HttpStatus.BAD_REQUEST,
        );
      } else if (message.user_id.id == reciever.id) {
        console.log('exeption');
        throw new HttpException(
          'Send message yourself: change reciever',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    return this.chatService.createMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/chat/:reciever_id')
  async getMessages(@Request() req, @Param('reciever_id') reciever_id: number) {
    console.log('req   ' + req.user.id);
    const friendIsExist = this.userService.findOne(reciever_id);
    if (!friendIsExist) {
      console.log('exeption');
      throw new HttpException(
        'Reciever doesnt exist: change reciever',
        HttpStatus.BAD_REQUEST,
      );
    }
    const current_user = req.user.id;
    return this.chatService.getMessages(current_user, reciever_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/chat')
  async getFriends(@Request() req) {
    return this.userService.findAll(req.user.id);
  }
}
