import { forwardRef, Module } from "@nestjs/common";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { CommonModule } from "src/common/common.module";
import { TestSocketService } from "./test.socket.service";

@Module({
  imports: [
    forwardRef(() => CommonModule),
  ],
  providers: [
    TestSocketService,
    {
      provide: 'PUBSUB_SERVICE',
      useFactory: (apiConfigService: ApiConfigService) => {
        const clientOptions: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            url: `redis://${apiConfigService.getRedisUrl()}:6379`,
            retryDelay: 1000,
            retryAttempts: 10,
            retry_strategy: function () {
              return 1000;
            },
          },
        };

        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ApiConfigService],
    },
  ],
  exports: [
    TestSocketService,
  ],
})
export class TestSocketModule { }
