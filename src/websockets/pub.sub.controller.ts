import { Controller, Logger } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { EventsGateway } from "./events.gateway";

@Controller()
export class PubSubController {
  private readonly logger: Logger;

  constructor(
    private readonly eventsGateway: EventsGateway,
  ) {
    this.logger = new Logger(PubSubController.name);
  }

  @EventPattern('onTest')
  onTest(payload: unknown) {
    this.logger.log(`Notifying onTest with payload '${JSON.stringify(payload)}'`);
    this.eventsGateway.onTest(payload);
  }
}
