import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateReactionDto } from '../model/dto/createReaction.dto';
import { ReactionService } from '../service/reaction.service';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateReactionDto, @Request() req) {
    dto.user_id = req.user.id;
    return this.reactionService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    return this.reactionService.delete(id);
  }
}
