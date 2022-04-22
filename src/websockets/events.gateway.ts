import { Injectable, Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway(3005)
export class EventsGateway {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(EventsGateway.name);
  }

  @WebSocketServer()
  webSocketServer: Server | undefined;

  onTest(payload: unknown) {
    this.logger.log(`Received onTest event with payload '${JSON.stringify(payload)}'`);
    this.webSocketServer?.emit('test', payload);
  }
}
