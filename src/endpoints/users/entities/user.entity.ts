import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  firstName: string = '';

  @ApiProperty()
  lastName: string = '';

  @ApiProperty()
  isActive: boolean = false;
}
