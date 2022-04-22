import { DynamicModule, Global, Module, Type } from "@nestjs/common";
import configuration from "config/configuration";
import { MetricsModule } from "../metrics/metrics.module";
import { MongoDbPersistenceModule } from "./mongodb/mongodb.persistence.module";
import { MongoDbPersistenceService } from "./mongodb/mongodb.persistence.service";
import { MysqlPersistenceModule } from "./mysql/mysql.persistence.module";
import { MysqlPersistenceService } from "./mysql/mysql.persistence.service";
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
        persistenceModule = MysqlPersistenceModule;
        persistenceInterface = MysqlPersistenceService;
      }

      const isMongoDb = configuration().database?.type === 'mongodb';
      if (isMongoDb) {
        persistenceModule = MongoDbPersistenceModule;
        persistenceInterface = MongoDbPersistenceService;
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
