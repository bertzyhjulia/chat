import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ApiBearerAuth } from '@nestjs/swagger';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimagies',
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

  @ApiBearerAuth('access-token')
  @Post('clientAdd')
  @UseInterceptors(FileInterceptor('avatar', storage))
  async uploadFile(
    @Body() createDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (avatar == null || avatar == undefined) {
      createDto.avatar = '';
      createDto.avatar_original_name = '';
    } else {
      createDto.avatar = avatar.filename;
      createDto.avatar_original_name = avatar.originalname;
    }
    return this.userService.create(createDto);
  }

  @ApiBearerAuth('access-token')
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

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findAll(@Request() req) {
    const user = req.user;
    return this.userService.findAll(user.id).then((friends) => {
      return {
        user,
        friends,
      };
    });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete('/deleteUser:id')
  async deleteClient(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @ApiBearerAuth('access-token')
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

  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads/profileimagies' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
