import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto, LoginUserDto } from './user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

export const storage = {
  storage: diskStorage({
    destination: 'dist/uploads/profileimagies',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Rest Call: POST http://localhost:3002/users/
  @Post('clientAdd')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async uploadFile(
    @Body() createDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const img = avatar.filename;
    return await this.userService.create(createDto, img);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: LoginUserDto) {
    return this.userService.logIn(req).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000,
        };
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findAll(@Request() req) {
    return req.user;
  }

  @Get('')
  findAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteUser:id')
  async deleteClient(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateUser/:id')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async editWithAvatar(
    @Param('id') id: number,
    @Body() editDto: EditUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let img = '';
    if (avatar) {
      img = avatar.filename;
    }
    return this.userService.edit(id, editDto, img);
  }

  @Get('profileimagies/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return of(
      res.sendFile(
        join(process.cwd(), 'dist/uploads/profileimagies/' + imagename),
      ),
    );
  }
}
