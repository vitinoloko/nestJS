import { IsInt, IsOptional, IsString } from 'class-validator';
import { AddressEntity } from '../entities/address.entity';
import { ReturnCityDto } from 'src/city/dtos/returnCity.dto';

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ReturnCityDto

  constructor(address: AddressEntity){
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city? new ReturnCityDto(address.city) : undefined;
  }
}
