import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiConfigModule } from "../../api-config/api.config.module";
import { ApiConfigService } from "../../api-config/api.config.service";
import { UserDb } from "./entities/user.db";
import { MysqlPersistenceService } from "./mysql.persistence.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => ({
        type: 'mysql',
        entities: [UserDb],
        ...apiConfigService.getDatabaseConnection(),
        keepConnectionAlive: true,
        synchronize: true,
        retryAttempts: 300,
        extra: {
          connectionLimit: 4,
        },
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([UserDb]),
  ],
  providers: [MysqlPersistenceService],
  exports: [MysqlPersistenceService, TypeOrmModule.forFeature([UserDb])],
})
export class MysqlPersistenceModule { }
