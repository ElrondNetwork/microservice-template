import { forwardRef, Module } from "@nestjs/common";
import { ApiConfigModule } from "./api-config/api.config.module";
import { CachingModule } from "./caching/caching.module";
import { MetricsModule } from "./metrics/metrics.module";
import { ApiModule } from "./network/api.module";

@Module({
  imports: [
    forwardRef(() => ApiConfigModule),
    forwardRef(() => CachingModule),
    forwardRef(() => ApiModule),
    forwardRef(() => MetricsModule),
  ],
  exports: [
    ApiConfigModule, CachingModule, ApiModule, MetricsModule,
  ],
})
export class CommonModule { }
