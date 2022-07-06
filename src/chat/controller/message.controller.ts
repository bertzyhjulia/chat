import { Delete } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AbilityService } from 'src/casl/service/ability.service';
import { UserService } from 'src/user/user.service';
import {
  CreateMessageDto,
  UpdateMessageDto,
} from '../model/dto/createMessage.dto';
import { MessageService } from '../service/message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly adilityService: AbilityService,
  ) {}

  @Get('')
  @Render('index')
  Home() {
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateMessageDto, @Request() req) {
    await this.adilityService.getAllowsForCreate(dto, req.user.id);
    return this.messageService.createMessage(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id/:idchat')
  async delete(
    @Param('id') id: number,
    @Param('idchat') idchat: number,
    @Request() req,
  ) {
    await this.adilityService.getAllowsForDelete(idchat, req.user.id);
    return this.messageService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateMessageDto,
    @Request() req,
  ) {
    await this.adilityService.getAllowsForUpdateMessage(dto, req.user.id);
    return this.messageService.updateMessage(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:idChat')
  async getMessages(@Param('idChat') idChat: number) {
    return this.messageService.getMessages(idChat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getFriends')
  async getFriends(@Request() req) {
    return this.userService.findAll(req.user.id);
  }
}
