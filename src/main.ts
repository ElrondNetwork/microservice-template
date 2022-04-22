import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { CacheWarmerModule } from './crons/cache.warmer.module';
import { ApiConfigService } from './common/api-config/api.config.service';
import { CachingInterceptor } from './interceptors/caching.interceptor';
import { MetricsService } from './common/metrics/metrics.service';
import { PrivateAppModule } from './private.app.module';
import { PublicAppModule } from './public.app.module';
import { TransactionProcessorModule } from './crons/transaction.processor.module';
import * as bodyParser from 'body-parser';
import { CachingService } from './common/caching/caching.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Logger } from '@nestjs/common';
import { QueueWorkerModule } from './workers/queue.worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PubSubModule } from './websockets/pub.sub.module';
import { SocketAdapter } from './websockets/socket.adapter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const publicApp = await NestFactory.create(PublicAppModule);
  publicApp.use(bodyParser.json({ limit: '1mb' }));
  publicApp.enableCors();
  publicApp.useLogger(publicApp.get(WINSTON_MODULE_NEST_PROVIDER));
  publicApp.use(cookieParser());

  const apiConfigService = publicApp.get<ApiConfigService>(ApiConfigService);
  const metricsService = publicApp.get<MetricsService>(MetricsService);
  const cachingService = publicApp.get<CachingService>(CachingService);
  const httpAdapterHostService = publicApp.get<HttpAdapterHost>(HttpAdapterHost);

  publicApp.useGlobalInterceptors(
    new LoggingInterceptor(metricsService),
    new CachingInterceptor(cachingService, httpAdapterHostService, metricsService),
  );

  const description = readFileSync(join(__dirname, '..', 'docs', 'swagger.md'), 'utf8');

  let documentBuilder = new DocumentBuilder()
    .setTitle('Elrond Microservice API')
    .setDescription(description)
    .setVersion('1.0.0')
    .setExternalDoc('Elrond Docs', 'https://docs.elrond.com');

  const apiUrls = apiConfigService.getSwaggerUrls();
  for (const apiUrl of apiUrls) {
    documentBuilder = documentBuilder.addServer(apiUrl);
  }

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(publicApp, config);
  SwaggerModule.setup('', publicApp, document);

  if (apiConfigService.getIsPublicApiFeatureActive()) {
    await publicApp.listen(apiConfigService.getPublicApiFeaturePort());
  }

  if (apiConfigService.getIsPrivateApiFeatureActive()) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(apiConfigService.getPrivateApiFeaturePort());
  }

  if (apiConfigService.getIsCacheWarmerFeatureActive()) {
    const cacheWarmerApp = await NestFactory.create(CacheWarmerModule);
    await cacheWarmerApp.listen(apiConfigService.getCacheWarmerFeaturePort());
  }

  if (apiConfigService.getIsTransactionProcessorFeatureActive()) {
    const transactionProcessorApp = await NestFactory.create(TransactionProcessorModule);
    await transactionProcessorApp.listen(apiConfigService.getTransactionProcessorFeaturePort());
  }

  if (apiConfigService.getIsQueueWorkerFeatureActive()) {
    const queueWorkerApp = await NestFactory.create(QueueWorkerModule);
    await queueWorkerApp.listen(8000);
  }

  const logger = new Logger("Bootstrapper");
  logger.log(`Public API active: ${apiConfigService.getIsPrivateApiFeatureActive()}`);
  logger.log(`Private API active: ${apiConfigService.getIsPrivateApiFeatureActive()}`);
  logger.log(`Transaction processor active: ${apiConfigService.getIsTransactionProcessorFeatureActive()}`);
  logger.log(`Cache warmer active: ${apiConfigService.getIsCacheWarmerFeatureActive()}`);
  logger.log(`Queue worker active: ${apiConfigService.getIsQueueWorkerFeatureActive()}`);

  const pubSubApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    PubSubModule,
    {
      transport: Transport.REDIS,
      options: {
        url: `redis://${apiConfigService.getRedisUrl()}:6379`,
        retryAttempts: 100,
        retryDelay: 1000,
        retry_strategy: function () {
          return 1000;
        },
      },
    },
  );
  pubSubApp.useWebSocketAdapter(new SocketAdapter(pubSubApp));

  await pubSubApp.listen();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
