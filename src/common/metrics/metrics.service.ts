import { Injectable } from "@nestjs/common";
import { register, Histogram, Gauge, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class MetricsService {
  private static apiCallsHistogram: Histogram<string>;
  private static externalCallsHistogram: Histogram<string>;
  private static pendingRequestsHistogram: Gauge<string>;
  private static apiResponseSizeHistogram: Histogram<string>;
  private static persistenceDurationHistogram: Histogram<string>;
  private static lastProcessedNonceGauge: Gauge<string>;
  private static pendingApiHitGauge: Gauge<string>;
  private static cachedApiHitGauge: Gauge<string>;
  private static isDefaultMetricsRegistered: boolean = false;

  constructor() {
    if (!MetricsService.apiCallsHistogram) {
      MetricsService.apiCallsHistogram = new Histogram({
        name: 'api',
        help: 'API Calls',
        labelNames: ['endpoint', 'code'],
        buckets: [],
      });
    }

    if (!MetricsService.externalCallsHistogram) {
      MetricsService.externalCallsHistogram = new Histogram({
        name: 'external_apis',
        help: 'External Calls',
        labelNames: ['system'],
        buckets: [],
      });
    }

    if (!MetricsService.pendingRequestsHistogram) {
      MetricsService.pendingRequestsHistogram = new Gauge({
        name: 'pending_requests',
        help: 'Pending requests',
        labelNames: ['endpoint'],
      });
    }

    if (!MetricsService.apiResponseSizeHistogram) {
      MetricsService.apiResponseSizeHistogram = new Histogram({
        name: 'api_response_size',
        help: 'API Response size',
        labelNames: ['endpoint'],
        buckets: [],
      });
    }

    if (!MetricsService.persistenceDurationHistogram) {
      MetricsService.persistenceDurationHistogram = new Histogram({
        name: 'persistence_duration',
        help: 'Persistence Duration',
        labelNames: ['action'],
        buckets: [],
      });
    }

    if (!MetricsService.pendingApiHitGauge) {
      MetricsService.pendingApiHitGauge = new Gauge({
        name: 'pending_api_hits',
        help: 'Number of hits for pending API calls',
        labelNames: ['endpoint'],
      });
    }

    if (!MetricsService.cachedApiHitGauge) {
      MetricsService.cachedApiHitGauge = new Gauge({
        name: 'cached_api_hits',
        help: 'Number of hits for cached API calls',
        labelNames: ['endpoint'],
      });
    }

    if (!MetricsService.isDefaultMetricsRegistered) {
      MetricsService.isDefaultMetricsRegistered = true;
      collectDefaultMetrics();
    }
  }

  setApiCall(endpoint: string, status: number, duration: number, responseSize: number) {
    MetricsService.apiCallsHistogram.labels(endpoint, status.toString()).observe(duration);
    MetricsService.apiResponseSizeHistogram.labels(endpoint).observe(responseSize);
  }

  setPendingRequestsCount(count: number) {
    MetricsService.pendingRequestsHistogram.set(count);
  }

  setExternalCall(system: string, duration: number) {
    MetricsService.externalCallsHistogram.labels(system).observe(duration);
  }

  setLastProcessedNonce(shardId: number, nonce: number) {
    MetricsService.lastProcessedNonceGauge.set({ shardId }, nonce);
  }

  incrementPendingApiHit(endpoint: string) {
    MetricsService.pendingApiHitGauge.inc({ endpoint });
  }

  incrementCachedApiHit(endpoint: string) {
    MetricsService.cachedApiHitGauge.inc({ endpoint });
  }

  setPersistenceDuration(action: string, duration: number) {
    MetricsService.externalCallsHistogram.labels('persistence').observe(duration);
    MetricsService.persistenceDurationHistogram.labels(action).observe(duration);
  }

  async getMetrics(): Promise<string> {
    return await register.metrics();
  }
}
