import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateChatDto, UpdateChatDto } from '../model/dto/createChat.dto';
import { ChatService } from '../service/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRoom(@Body() dto: CreateChatDto, @Request() req) {
    if (dto.is_individual == true) {
      dto.logo = '';
      dto.title = '';
      dto.admin_id = 0;
    } else if (
      dto.is_individual == false &&
      (dto.title == null ||
        dto.title == undefined ||
        dto.logo == null ||
        dto.logo == undefined)
    ) {
      dto.logo = 'group';
      dto.title = '';
      dto.admin_id = req.user.id;
    }
    return this.chatService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateChatDto) {
    return this.chatService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getWhereUserId(@Param('id') id: number) {
    return this.chatService.getAllWhereUserId(id);
  }

  @Get('')
  get() {
    return this.chatService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.chatService.delete(id);
  }
}
