import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateCourseDto {
    @ApiProperty({ example: "NestJS com TypeORM" })
    @IsString()
    title: string;

    @ApiProperty({ example: "Aprenda a criar APIs robustas com NestJS e TypeORM." })
    @IsString()
    description: string;

    @ApiProperty({ example: 199.90 })
    @IsNumber()
    price: number;

    @ApiProperty({ example: true, })
    @IsBoolean()
    published: boolean;

    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
    @IsUUID()
    instructorId: string;
}
