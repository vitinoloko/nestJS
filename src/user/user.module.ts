import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
})
export class UserModule {}
