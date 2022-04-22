import { Controller, Logger } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { CachingService } from "../caching/caching.service";

@Controller()
export class MicroserviceController {
  private readonly logger: Logger;

  constructor(
    private readonly cachingService: CachingService,
  ) {
    this.logger = new Logger(MicroserviceController.name);
  }

  @EventPattern('deleteCacheKeys')
  async deleteCacheKey(keys: string[]) {
    this.logger.log(`Deleting cache keys ${keys}`);

    for (const key of keys) {
      await this.cachingService.deleteInCacheLocal(key);
    }
  }
}
