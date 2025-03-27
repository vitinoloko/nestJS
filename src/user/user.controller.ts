import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

   @Post()
    async criarUsers(){
        return JSON.stringify({test: 'abc'});
    }
}
