import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDtos } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async criarUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userServices.createUser(createUser);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDtos[]> {
    return (await this.userServices.getAlUser()).map(
      (userEntity) => new ReturnUserDtos(userEntity),
    );
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDtos> {
    return new ReturnUserDtos(
      await this.userServices.getUserByIdUsingRelations(userId),
    );
  }
}
