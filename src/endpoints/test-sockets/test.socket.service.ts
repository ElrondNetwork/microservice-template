import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class TestSocketService {
  private readonly logger: Logger;

  constructor(
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
  ) {
    this.logger = new Logger(TestSocketService.name);
  }

  testSocket(): void {
    this.logger.log('emitting onTest event');
    this.clientProxy.emit('onTest', { test: 'test' });
  }
}
