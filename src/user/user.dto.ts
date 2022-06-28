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
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  nickName: string;

  @IsString()
  avatar?: string;

  @IsString()
  avatar_original_name?: string;

  @IsNumber()
  tel: number;
}
