import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class JwtPayload {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  role: string;
}
