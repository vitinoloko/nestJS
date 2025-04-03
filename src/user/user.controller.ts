import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}
  @Post()
  async criarUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userServices.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<UserEntity[]> {
    return await this.userServices.getAlUser();
  }
}
