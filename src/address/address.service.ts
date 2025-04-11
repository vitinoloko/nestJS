import { Injectable } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddresDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
     await this.userService.findUserById(userId);
     await this.cityService.findCityById(createAddresDto.cityId);
    return this.addressRepository.save({
          ...createAddresDto,
          userId,
      });
  }
}
