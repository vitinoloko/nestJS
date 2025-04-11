import { AddressEntity } from "src/address/entities/address.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn('rowid')
    id:number;
    @Column({name: 'name',nullable: false})
    nome: string;
    @Column({name: 'email',nullable: false})
    email: string;
    @Column({name: 'phone'})
    phone: string;
    @Column({name: 'cpf',nullable: false})
    cpf: string;
    @Column({name: 'password',nullable: false})
    senha: string;
    @Column({name: 'type_user',nullable: false})
    typeUser: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updateAt: Date;

    @OneToMany(()=> AddressEntity,(addresses)=> addresses.user)
    addresses?: AddressEntity[];
}