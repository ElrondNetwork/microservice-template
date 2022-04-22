import { Module } from "@nestjs/common";
import { ExampleModule } from "./example/example.module";
import { TestSocketModule } from "./test-sockets/test.socket.module";
import { UsersModule } from "./users/user.module";

@Module({
  imports: [
    ExampleModule,
    TestSocketModule,
    UsersModule,
  ],
  exports: [
    ExampleModule,
    TestSocketModule,
    UsersModule,
  ],
})
export class EndpointsServicesModule { }
