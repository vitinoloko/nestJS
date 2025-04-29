import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorators';

@Roles(UserType.User,UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async insertProductCart(
    @Body() insertCart: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return this.cartService.insertProductCart(insertCart, userId);
  }
}
