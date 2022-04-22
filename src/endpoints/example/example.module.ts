import { forwardRef, Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { ExampleService } from "./example.service";

@Module({
  imports: [
    forwardRef(() => CommonModule),
  ],
  providers: [
    ExampleService,
  ],
  exports: [
    ExampleService,
  ],
})
export class ExampleModule { }
