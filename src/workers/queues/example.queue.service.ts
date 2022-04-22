import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";

@Injectable()
@Processor('exampleQueue')
export class ExampleQueueService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ExampleQueueService.name);
  }

  @Process({ concurrency: 4 })
  onNftCreated(job: Job<{ identifier: string }>) {
    this.logger.log({ type: 'consumer', jobId: job.id, identifier: job.data.identifier, attemptsMade: job.attemptsMade });
  }
}
