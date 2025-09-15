import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CredentialsDto {
    @ApiProperty({ example: 'usuario1@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Usuario1@123' })
    @IsString()
    password: string;
}
