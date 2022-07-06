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
import { AbilityService } from 'src/casl/service/ability.service';
import { CreateChatDto, UpdateChatDto } from '../model/dto/createChat.dto';
import { ChatService } from '../service/chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly adilityService: AbilityService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRoom(@Body() dto: CreateChatDto, @Request() req) {
    return this.chatService.create(dto, req.user.id);
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
