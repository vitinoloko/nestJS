import { ProductEntity } from '../entities/product.entity';

export class ReturnProducts {
  categoryId: number;
  name: string;
  price: number;
  image: string;

  constructor(productEntity: ProductEntity) {
    this.categoryId = productEntity.id;
    this.name = productEntity.name;
    this.price = productEntity.price;
    this.image = productEntity.image;
  }
}
