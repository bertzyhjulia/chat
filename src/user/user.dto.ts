import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickName: string;
}

export class EditUserDto {
  @IsString()
  name: string;
  lastName: string;
  avatar: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  name: string;
  lastName: string;
  tel: number;
  date: Date;
  avatar: string;
}
