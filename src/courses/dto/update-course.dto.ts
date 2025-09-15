import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiPropertyOptional({ example: "NestJS com TypeORM" })
    title?: string;

    @ApiPropertyOptional({ example: "Aprenda a criar APIs robustas com NestJS e TypeORM." })
    description?: string;

    @ApiPropertyOptional({ example: 199.90 })
    price?: number;

    @ApiPropertyOptional({ example: true, })
    published?: boolean;

    @ApiPropertyOptional({ example: "550e8400-e29b-41d4-a716-446655440000" })
    instructorId?: string;
}
