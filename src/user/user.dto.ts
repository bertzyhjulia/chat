import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class EditUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  avatar: string;
}

export class CreateUserDto extends LoginUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  nickName: string;

  @ApiProperty()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  avatar_original_name?: string;

  @ApiProperty()
  @IsNumber()
  tel: number;
}
