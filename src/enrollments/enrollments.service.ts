import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { EnrollmentStatus } from './enums/enrollment-status.enum';
import { UserRole } from 'src/users/enums/user-role.enum';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepository: Repository<Enrollment>,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    try {
      const { studentId, courseId, ...data } = createEnrollmentDto;

      const student = await this.usersService.query()
        .where('user.id = :studentId', { studentId: createEnrollmentDto.studentId })
        .andWhere('user.role = :role', { role: UserRole.STUDENT })
        .getOne();

      if (!student) {
        throw new NotFoundException(`Student #${studentId} not found.`);
      }

      const course = await this.coursesService.query()
        .where('course.id = :courseId', { courseId: createEnrollmentDto.courseId })
        .andWhere('course.published = :published', { published: true })
        .getOne();

      if (!course) {
        throw new NotFoundException(`Course #${courseId} not found or not published.`);
      }

      const enrollment = this.enrollmentsRepository.create({
        ...data,
        student,
        course
      });

      return await this.enrollmentsRepository.save(enrollment);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error.message}`);
    }
  }

  async findAll(): Promise<Enrollment[]> {
    const enrollment = await this.enrollmentsRepository.find();
    return enrollment;
  }

  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentsRepository.findOne({ where: { id } });
    if (!enrollment) throw new NotFoundException(`Enrollment #${id} not found.`);
    return enrollment;
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);

    if (updateEnrollmentDto.studentId) {
      const student = await this.usersService.query()
        .where('user.id = :studentId', { studentId: updateEnrollmentDto.studentId })
        .andWhere('user.role = :role', { role: UserRole.STUDENT })
        .getOne();

      if (!student) {
        throw new NotFoundException(`Student #${updateEnrollmentDto.studentId} not found.`);
      }

      const course = await this.coursesService.query()
        .where('course.id = :courseId', { courseId: updateEnrollmentDto.courseId })
        .andWhere('course.published = :published', { published: true })
        .getOne();

      if (!course) {
        throw new NotFoundException(`Course #${updateEnrollmentDto.courseId} not found or not published.`);
      }

      enrollment.student = student;
      enrollment.course = course;
    }

    Object.assign(enrollment, updateEnrollmentDto);
    return await this.enrollmentsRepository.save(enrollment);
  }

  async remove(id: string): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    return await this.enrollmentsRepository.remove(enrollment);
  }

  query(): SelectQueryBuilder<Enrollment> {
    const query = this.enrollmentsRepository.createQueryBuilder('Enrollment');
    if (!query) throw new Error('QueryBuilder failed');
    return query;
  }
}
