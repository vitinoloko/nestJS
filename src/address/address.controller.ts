import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorators';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Roles(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddresDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    console.log('userId = ',userId)
    return this.addressService.createAddress(createAddresDto, userId);
  }
}
