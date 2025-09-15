import { ApiProperty } from "@nestjs/swagger";
import { EntityBase } from "src/common/entities/base.entity";
import { Enrollment } from "src/enrollments/entities/enrollment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ForeignKey, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('courses')
export class Course extends EntityBase {
    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({ type: 'text' })
    description: string;

    @ApiProperty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ApiProperty()
    @Column({ default: false })
    published: boolean;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.courses, { nullable: false, eager: true })
    @JoinColumn({ name: 'instructorId' })
    instructor: User;

    @ApiProperty({ type: () => [Enrollment] })
    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments: Enrollment[];
}
