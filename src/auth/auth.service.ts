import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogi } from './dtos/returnLogin.dto';
import { ReturnUserDtos } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthServices {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginDto: LoginDto): Promise<ReturnLogi> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(LoginDto.email)
      .catch(() => undefined);
    const isMatch = await validatePassword(
      LoginDto.password,
      user?.senha || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDtos(user),
    };
  }
}
