import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ActionEntity } from '../model/action.entity';
import { AbilityService } from '../service/ability.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ability')
@ApiBearerAuth('access-token')
export class AbilityController {
  constructor(private readonly abilityService: AbilityService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() body: ActionEntity, @Request() req) {
    return this.abilityService.createAllows(body, req.user.id);
  }
}
