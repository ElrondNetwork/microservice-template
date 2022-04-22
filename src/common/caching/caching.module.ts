import { CacheModule, Module } from "@nestjs/common";
import { ApiConfigModule } from "../api-config/api.config.module";
import { ApiModule } from "../network/api.module";
import { CachingService } from "./caching.service";

@Module({
  imports: [
    CacheModule.register(),
    ApiConfigModule,
    ApiModule,
  ],
  providers: [
    CachingService,
  ],
  exports: [
    CachingService,
  ],
})
export class CachingModule { }
