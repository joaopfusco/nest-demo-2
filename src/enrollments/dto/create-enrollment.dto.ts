import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from "class-validator";
import { EnrollmentStatus } from "../enums/enrollment-status.enum";
import { Type } from "class-transformer";

export class CreateEnrollmentDto {
    @ApiProperty({ example: "2025-09-15T14:30:00.000Z" })
    @IsDate()
    @Type(() => Date)
    enrolledAt: Date;

    @ApiPropertyOptional({ enum: EnrollmentStatus })
    @IsEnum(EnrollmentStatus)
    @IsOptional()
    status?: EnrollmentStatus;

    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
    @IsUUID()
    studentId: string;

    @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
    @IsUUID()
    courseId: string;
}
