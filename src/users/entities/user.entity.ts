import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../enums/user-role.enum';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/entities/course.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude() // needs plainToInstance(User, user);
    private password: string;

    @ApiProperty()
    @Column({
        type: 'text', // 'enum' in potsgres
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    role: UserRole;

    @ApiProperty({ type: () => [Course] })
    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];

    @ApiProperty({ type: () => [Enrollment] })
    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments: Enrollment[];

    async validatePassword(password: string): Promise<boolean> {
        return await argon2.verify(this.password, password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            this.password = await argon2.hash(this.password);
        }
    }
}
