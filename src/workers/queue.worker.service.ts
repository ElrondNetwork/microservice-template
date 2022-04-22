import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Queue } from "bull";

@Injectable()
export class QueueWorkerService {
  private readonly logger: Logger;

  constructor(
    @InjectQueue('exampleQueue') private exampleQueue: Queue
  ) {
    this.logger = new Logger(QueueWorkerService.name);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async startJob() {
    const identifiers = ['job1', 'job2', 'job3', 'job4', 'job5'];
    for (const identifier of identifiers) {
      const job = await this.exampleQueue.add({ identifier }, {
        priority: 1000,
        attempts: 3,
        timeout: 60000,
        delay: 30000,
        removeOnComplete: true,
      });

      this.logger.log({ type: 'producer', jobId: job.id, identifier: job.data.identifier });
    }
  }
}
