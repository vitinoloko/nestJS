import { Column, CreateDateColumn } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { ReturnAddressDto } from "src/address/dtos/returnAddress.dto";

export class ReturnUserDtos {
  id: number;
  nome: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnAddressDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.nome = userEntity.nome;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;

    this.addresses = userEntity.addresses?.map(
      (address) => new ReturnAddressDto(address),
    );
  }
}
