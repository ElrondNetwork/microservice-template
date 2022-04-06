import { DynamicModule, Global, Module, Type } from "@nestjs/common";
import configuration from "config/configuration";
import { MetricsModule } from "../metrics/metrics.module";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "./database/database.service";
import { MongoDbModule } from "./mongodb/mongo.db.module";
import { MongoDbService } from "./mongodb/mongo.db.service";
import { PassThroughModule } from "./passthrough/pass.through.module";
import { PassThroughService } from "./passthrough/pass.through.service";
import { PersistenceInterface } from "./persistence.interface";
import { PersistenceService } from "./persistence.service";

@Global()
@Module({})
export class PersistenceModule {
  static register(): DynamicModule {
    let persistenceModule: Type<any> = PassThroughModule;
    let persistenceInterface: Type<PersistenceInterface> = PassThroughService;

    const isPassThrough = process.env.PERSISTENCE === 'passthrough' || configuration().database?.enabled === false;
    if (!isPassThrough) {
      const isMysql = !configuration().database?.type || configuration().database?.type === 'mysql';
      if (isMysql) {
        persistenceModule = DatabaseModule;
        persistenceInterface = DatabaseService;
      }

      const isMongoDb = configuration().database?.type === 'mongodb';
      if (isMongoDb) {
        persistenceModule = MongoDbModule;
        persistenceInterface = MongoDbService;
      }
    }

    return {
      module: PersistenceModule,
      imports: [
        MetricsModule,
        persistenceModule,
      ],
      providers: [
        {
          provide: 'PersistenceInterface',
          useClass: persistenceInterface,
        },
        PersistenceService,
      ],
      exports: ['PersistenceInterface', PersistenceService],
    };
  }
}
