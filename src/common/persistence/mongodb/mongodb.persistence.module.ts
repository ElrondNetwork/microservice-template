import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ApiConfigModule } from "../../api-config/api.config.module";
import { ApiConfigService } from "../../api-config/api.config.service";
import { UserDb } from "./entities/user.db";
import { MongoDbPersistenceService } from "./mongodb.persistence.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'mongodb',
          entities: [UserDb],
          url: apiConfigService.getDatabaseUrl(),
          keepConnectionAlive: true,
          sslValidate: false,
          retryAttempts: 300,
          useUnifiedTopology: true,
          synchronize: true,
        };

        return options;
      },
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([UserDb]),
  ],
  providers: [MongoDbPersistenceService],
  exports: [MongoDbPersistenceService, TypeOrmModule.forFeature([UserDb])],
})
export class MongoDbPersistenceModule { }
