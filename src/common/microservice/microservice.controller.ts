import { Controller, Logger } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { CachingService } from "../caching/caching.service";

@Controller()
export class MicroserviceController {
  private logger: Logger;
  constructor(
    private readonly cachingService: CachingService,
  ) {
    this.logger = new Logger(MicroserviceController.name);
   }

  @EventPattern('deleteCacheKeys')
  async deleteCacheKey(keys: string[]) {

    for (let key of keys) {
      if (['nodes', 'allEsdtTokens', 'identities', 'providers', 'providersWithStakeInformation', 'keybases', 
           'identityProfilesKeybases', 'currentPrice', 'economics', 'accounts:0:25', 'heartbeatstatus'].includes(key)) {
        this.logger.log(`Soft Deleting cache key ${key}`);
        await this.cachingService.refreshCacheLocal(key);
      } else {
        this.logger.log(`Hard Deleting cache key ${key}`);
        await this.cachingService.deleteInCacheLocal(key);
      }
    }
  }
}