import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { MetricsService } from "src/common/metrics/metrics.service";
import { PerformanceProfiler } from "../../utils/performance.profiler";

@Injectable()
export class ApiService {
  private readonly logger: Logger;

  constructor(
    private readonly metricsService: MetricsService
  ) {
    this.logger = new Logger(ApiService.name);
  }

  async get<T>(url: string): Promise<T> {
    const profiler = new PerformanceProfiler();

    try {
      const result = await axios.get<T>(url);

      return result.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error({
        method: 'GET',
        path: url,
        response: error.response?.data,
        status: error.response?.status,
      });

      throw error;
    } finally {
      profiler.stop();
      this.metricsService.setExternalCall(this.getHostname(url), profiler.duration);
    }
  }

  async post<TInput, TOutput>(url: string, data: TInput): Promise<TOutput> {
    const profiler = new PerformanceProfiler();
    try {

      const result = await axios.post(url, data);

      return result.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error({
        method: 'POST',
        url,
        response: error.response?.data,
        status: error.response?.status,
      });

      throw error;
    } finally {
      profiler.stop();
      this.metricsService.setExternalCall(this.getHostname(url), profiler.duration);
    }
  }

  async head(url: string): Promise<{ headers: { [key: string]: string }, status: number }> {
    const profiler = new PerformanceProfiler();

    try {
      return await axios.head(url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error({
        method: 'HEAD',
        url,
        response: error.response?.data,
        status: error.response?.status,
      });

      throw error;
    } finally {
      profiler.stop();
      this.metricsService.setExternalCall(this.getHostname(url), profiler.duration);
    }
  }

  private getHostname(url: string): string {
    return new URL(url).hostname;
  }
}
