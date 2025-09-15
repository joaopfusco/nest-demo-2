import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { EnrollmentStatus } from '../enums/enrollment-status.enum';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
    @ApiPropertyOptional({ example: "2025-09-15T14:30:00.000Z" })
    enrolledAt?: Date;

    @ApiPropertyOptional({ enum: EnrollmentStatus })
    status?: EnrollmentStatus;

    @ApiPropertyOptional({ example: "550e8400-e29b-41d4-a716-446655440000" })
    studentId?: string;

    @ApiPropertyOptional({ example: "550e8400-e29b-41d4-a716-446655440000" })
    courseId?: string;
}
