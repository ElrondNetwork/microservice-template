import { ApiProperty } from "@nestjs/swagger";

export class Example {
  @ApiProperty({ description: 'The id of the example' })
  id: string = '';

  @ApiProperty({ description: 'The description of the example' })
  description: string = '';
}
