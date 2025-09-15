import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly usersService: UsersService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const { instructorId, ...data } = createCourseDto;

      const instructor = await this.usersService.query()
        .where('user.id = :instructorId', { instructorId: createCourseDto.instructorId })
        .andWhere('user.role = :role', { role: UserRole.INSTRUCTOR })
        .getOne();

      if (!instructor) {
        throw new NotFoundException(`Instructor #${instructorId} not found.`);
      }

      const course = this.coursesRepository.create({
        ...data,
        instructor,
      });

      return await this.coursesRepository.save(course);
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error.message}`);
    }
  }

  async findAll(): Promise<Course[]> {
    const course = await this.coursesRepository.find();
    return course;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException(`Course #${id} not found.`);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    if (updateCourseDto.instructorId) {
      const instructor = await this.usersService.query()
        .where('user.id = :instructorId', { instructorId: updateCourseDto.instructorId })
        .andWhere('user.role = :role', { role: UserRole.INSTRUCTOR })
        .getOne();

      if (!instructor) {
        throw new NotFoundException(`Instructor #${updateCourseDto.instructorId} not found.`);
      }

      course.instructor = instructor;
    }

    Object.assign(course, updateCourseDto);
    return await this.coursesRepository.save(course);
  }

  async remove(id: string): Promise<Course> {
    const course = await this.findOne(id);
    return await this.coursesRepository.remove(course);
  }

  query(): SelectQueryBuilder<Course> {
    const query = this.coursesRepository.createQueryBuilder('course');
    if (!query) throw new Error('QueryBuilder failed');
    return query;
  }
}
