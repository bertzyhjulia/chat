import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Not, Repository } from 'typeorm';
import { UserEntity } from './model/user.entity';
import { CreateUserDto, EditUserDto, LoginUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}
  //-------------------------------------------------------------------------------
  logIn(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: UserEntity) => {
        if (user) {
          console.log(user);
          console.log('loginUserDto.password   ' + loginUserDto.password);
          console.log(' user.password   ' + user.password);
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserEntity) =>
                    this.authService.generateJwt(user),
                  ),
                );
              } else {
                throw new HttpException(
                  'Login was not Successfulll',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }
  findByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }
  findOne(id: number): Observable<UserEntity> {
    return from(this.userRepository.findOneBy({ id }));
  }
  findOneFiend(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findUserByEmail(email: string): Observable<UserEntity> {
    //return from(this.userRepository.findOneBy({ email }));
    return from(
      this.userRepository.findOne({
        select: [
          'id',
          'avatar',
          'email',
          'lastName',
          'name',
          'nickName',
          'password',
          'tel',
        ],
        where: { email },
      }),
    );
  }

  create(createdUserDto: CreateUserDto) {
    const user = this.userRepository.create(createdUserDto);
    return this.nickNameExists(user.nickName).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
              user.password = passwordHash;
              return from(this.userRepository.save(user)).pipe(
                map((savedUser: UserEntity) => {
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  private nickNameExists(nickName: string): Observable<boolean> {
    nickName = nickName.toLowerCase();
    return from(this.userRepository.findOneBy({ nickName })).pipe(
      map((user: UserEntity) => {
        console.log(user);
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
  // ----------------------------------------------------------------------------
  edit(id: number, edit: EditUserDto, img: string) {
    return this.findOne(id).pipe(
      map((user: UserEntity) => {
        console.log(user);
        user.name = edit.name;
        user.lastName = edit.lastName;
        if (img) {
          user.avatar = img;
          return this.userRepository.save(user);
        }
        return this.userRepository.save(user);
      }),
    );
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
  //-------------------------------------------------------------------------
  findAll(id: number) {
    return this.userRepository
      .find({
        where: {
          id: Not(id),
        },
      })
      .then((res) => {
        return res;
      });
  }
}
