import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EnrollmentStatus } from "../enums/enrollment-status.enum";
import { EntityBase } from "src/common/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Course } from "src/courses/entities/course.entity";

@Entity('enrollments')
export class Enrollment extends EntityBase {
    @ApiProperty()
    @Column()
    enrolledAt: Date;

    @ApiProperty()
    @Column({
        type: 'text',
        enum: EnrollmentStatus,
        default: EnrollmentStatus.ACTIVE
    })
    status: EnrollmentStatus;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.enrollments, { nullable: false, eager: true })
    @JoinColumn({ name: 'studentId' })
    student: User;

    @ApiProperty({ type: () => Course })
    @ManyToOne(() => Course, (course) => course.enrollments, { nullable: false, eager: true })
    @JoinColumn({ name: 'courseId' })
    course: Course;
}
