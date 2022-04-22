import { Module } from "@nestjs/common";
import { ApiConfigModule } from "../api-config/api.config.module";
import { MetricsService } from "./metrics.service";

@Module({
  imports: [
    ApiConfigModule,
  ],
  providers: [
    MetricsService,
  ],
  exports: [
    MetricsService,
  ],
})
export class MetricsModule { }
