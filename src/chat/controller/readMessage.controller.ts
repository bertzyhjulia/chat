import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateReadMessageDto } from '../model/dto/readMessage.dto';
import { ReadMessageService } from '../service/read_message.service';

@Controller('read_message')
export class ReadMessageController {
  constructor(private readonly readMessageService: ReadMessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateReadMessageDto, @Request() req) {
    dto.user_id = req.user.id;
    return this.readMessageService.create(dto);
  }
}
