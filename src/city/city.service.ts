import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // Importação correta do tipo Cache

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Tipo corrigido
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> { // Corrigido de Number para number
    const citiesCache: CityEntity[] | null = await this.cacheManager.get(`state_${stateId}`);

    if (citiesCache) {
      return citiesCache;
    }

    const cities = await this.cityRepository.find({
      where: { stateId },
    });

    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
