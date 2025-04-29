import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = this.categoryRepository.find();

    if (!categories || (await categories).length === 0) {
      throw new NotFoundException('Categories empty');
    }

    return categories;
  }
  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category ID ${categoryId} Not Found`);
    }
    return category;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category name ${name} Not Found`);
    }
    return category;
  }

  async createCategory(
    createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );
    if (category) {
      throw new BadRequestException(
        `Category name: ${createCategory.name}, exist`,
      );
    }
    return this.categoryRepository.save(createCategory);
  }
}
