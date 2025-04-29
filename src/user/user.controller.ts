import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDtos } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserId } from 'src/decorators/user-id.decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async criarUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return await this.userServices.createUser(createUser);
  }

  @Roles(UserType.Admin)
  @Get()
  async getAllUser(): Promise<ReturnUserDtos[]> {
    return (await this.userServices.getAlUser()).map(
      (userEntity) => new ReturnUserDtos(userEntity),
    );
  }
  @Roles(UserType.Admin)
  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDtos> {
    return new ReturnUserDtos(
      await this.userServices.getUserByIdUsingRelations(userId),
    );
  }
  @Roles(UserType.Admin,UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordUserDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userServices.updatePasswordUser(updatePasswordUserDTO, userId);
  }
}
