import { Controller, Post } from "@nestjs/common";
import { TestSocketService } from "./test.socket.service";

@Controller('test')
export class TestSocketController {
  constructor(
    private readonly testSocketService: TestSocketService,
  ) { }

  @Post('socket')
  async testSocket(): Promise<void> {
    await this.testSocketService.testSocket();
  }
}
