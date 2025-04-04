import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Tipo corrigido
  ) {}

  async getCache<T>(key: string, 
    functionRequest: () => Promise<T>,
): Promise<T> {
    // Corrigido de Number para number
    const allDAta: T | null = await this.cacheManager.get(key);

    if (allDAta) {
      return allDAta;
    }

    const cities:T = await functionRequest();

    await this.cacheManager.set(key, cities);

    return cities;
  }
}
