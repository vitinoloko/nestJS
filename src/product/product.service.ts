import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const product = await this.productRepository.find();

    if (!product || product.length === 0) {
      throw new NotFoundException(`Not found Products`);
    }
    return product;
  }

  async createProduct(
    createProducts: CreateProductDTO,
  ): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProducts.categoryId);

    return this.productRepository.save({
      ...createProducts,
    });
  }
  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product id: ${productId} Not found`);
    }
    return product;
  }

  async deleteProduct(productId: number): Promise<DeleteResult> {
    await this.findProductById(productId);
    return this.productRepository.delete({ id: productId });
  }

  async updateProdutc(
    updateProdutc: UpdateProductDTO,
    productId: number,
  ): Promise<ProductEntity> {
    const product = await this.findProductById(productId);
    return this.productRepository.save({
      ...product,
      ...updateProdutc,
    });
  }
}
