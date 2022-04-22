import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { AuthController } from "./auth/auth.controller";
import { EndpointsServicesModule } from "./endpoints.services.module";
import { ExampleController } from "./example/example.controller";
import { HealthCheckController } from "./health-check/health.check.controller";
import { UsersController } from "./users/user.controller";

@Module({
  imports: [
    CommonModule,
    EndpointsServicesModule,
  ],
  controllers: [
    AuthController,
    ExampleController,
    HealthCheckController,
    UsersController,
  ],
})
export class EndpointsControllersModule { }
