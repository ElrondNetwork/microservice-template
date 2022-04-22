import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/endpoints/users/entities/dto/create.user.dto";
import { User } from "src/endpoints/users/entities/user.entity";
import { PerformanceProfiler } from "src/utils/performance.profiler";
import { MetricsService } from "../metrics/metrics.service";
import { PersistenceInterface } from "./persistence.interface";

@Injectable()
export class PersistenceService implements PersistenceInterface {
  constructor(
    @Inject('PersistenceInterface')
    private readonly persistenceInterface: PersistenceInterface,
    private readonly metricsService: MetricsService,
  ) { }

  private async execute<T>(key: string, action: Promise<T>): Promise<T> {
    const profiler = new PerformanceProfiler();

    try {
      return await action;
    } finally {
      profiler.stop();

      this.metricsService.setPersistenceDuration(key, profiler.duration);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.execute('createUser', this.persistenceInterface.createUser(createUserDto));
  }

  async findAllUsers(): Promise<User[]> {
    return await this.execute('findAllUsers', this.persistenceInterface.findAllUsers());
  }

  async findOneUser(id: string): Promise<User | undefined> {
    return await this.execute('findOneUser', this.persistenceInterface.findOneUser(id));
  }

  async deleteUser(id: string): Promise<void> {
    return await this.execute('deleteUser', this.persistenceInterface.deleteUser(id));
  }
}
