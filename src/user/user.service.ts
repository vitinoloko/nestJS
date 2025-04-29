import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );
    if (user) {
      throw new BadRequestException('email ja registrado no sistema');
    }
    const senhaHased = await createPasswordHashed(createUserDto.senha);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      senha: senhaHased,
    });
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }

    return user;
  }

  async getAlUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`User Id Not Found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`User Email Not Found`);
    }
    return user;
  }

  async updatePasswordUser(
    UpdatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const senhaHased = await createPasswordHashed(
      UpdatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      UpdatePasswordDTO.lastPassword,
      user.senha || '',
    );

    if (!isMatch) {
      throw new BadRequestException(`Last password invalid`);
    }

    return this.userRepository.save({
      ...user,
      senha: senhaHased,
    });
  }
}
