import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class CartProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
  @Column({ name: 'cart_id', nullable: false })
  userId: number;
  @Column({ name: 'product_id', nullable: false })
  productId: number;
  @Column({ name: 'amount', nullable: false })
  amount: number;
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;
  @CreateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(
    () => ProductEntity,
    (productEntity: ProductEntity) => productEntity.cartProduct,
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: ProductEntity;
  @ManyToOne(() => CartEntity, (cartEntity) => cartEntity.cartProduct)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: CartEntity;
}
