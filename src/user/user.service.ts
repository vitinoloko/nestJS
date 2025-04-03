import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const senhaHased = await hash(createUserDto.senha, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 2,
      senha: senhaHased,
    });
  }
  async getAlUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
