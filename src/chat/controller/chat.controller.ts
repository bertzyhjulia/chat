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
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AbilityService } from 'src/casl/service/ability.service';
import { CreateChatDto, UpdateChatDto } from '../model/dto/createChat.dto';
import { CreateChatUserFirstDto } from '../model/dto/createChatUser.dto';
import { ChatService } from '../service/chat.service';
import { ChatUserService } from '../service/chat_user.service';

@Controller('chat')
@ApiBearerAuth('access-token')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatUserService: ChatUserService,
    private readonly adilityService: AbilityService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRoom(@Body() dto: CreateChatDto, @Request() req) {
    const chat = await this.chatService.create(dto, req.user.id);
    let newDto: CreateChatUserFirstDto;
    newDto.chat_id = chat.id;
    newDto.user_id = req.user.id;
    await this.chatUserService.createFirst(newDto, dto.is_individual);
    return chat;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateChatDto,
    @Request() req,
  ) {
    await this.adilityService.getAllowsForUpdate(id, dto, req.user.id);
    return this.chatService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getWhereUserId(@Param('id') id: number) {
    return this.chatService.getAllWhereUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.chatService.delete(id);
  }
}
