import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}
  async getAllState(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }
}
