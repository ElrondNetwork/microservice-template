import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/common/api-config/api.config.module';
import { ApiConfigService } from 'src/common/api-config/api.config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (apiConfigService: ApiConfigService) => ({
        redis: {
          host: apiConfigService.getRedisUrl(),
          port: 6379,
        },
      }),
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
    }),
  ],
})
export class BullQueueModule { }
