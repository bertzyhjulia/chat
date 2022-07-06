import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('swagger')
@Controller()
export class AppController {
  @Get('sum/:a/:b')
  async get(@Param('a') a: number, @Param('b') b: number) {
    return a + b;
  }
}
