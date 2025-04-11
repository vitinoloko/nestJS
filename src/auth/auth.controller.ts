import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthServices } from './auth.service';
import { ReturnLogi } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServices) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() LoginDto: LoginDto): Promise<ReturnLogi> {
    return this.authService.login(LoginDto);
  }
}
