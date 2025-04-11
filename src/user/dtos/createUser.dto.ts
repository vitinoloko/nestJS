import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  nome: string;

  @IsString()
  email: string;

  numberAddress: number;

  @IsString()
  cpf: string;

  @IsString()
  senha: string;
}
