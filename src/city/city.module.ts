import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from '../cache/cache.service'; // Ajuste o caminho se necessário

@Module({
  imports: [
    CacheModule.register({ ttl: 90000000000 }), 
    TypeOrmModule.forFeature([CityEntity]),
  ],
  controllers: [CityController],
  providers: [CityService, CacheService], // Adicionado CacheService
  exports: [CityService]
})
export class CityModule {}
