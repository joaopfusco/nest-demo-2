import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

export const getRawTypeOrmConfig = (configService?: ConfigService) => {
  const env = configService?.get<string>('ENVIRONMENT') ?? 'development';
  const isDev = env === 'development';

  const migrations = [
    isDev
      ? join(__dirname, '../../migrations/*.ts')
      : join(__dirname, '../../dist/migrations/*.js')
  ];

  const host = configService?.get<string>('DATABASE_HOST');
  const port = configService?.get<number>('DATABASE_PORT');
  const username = configService?.get<string>('DATABASE_USERNAME');
  const password = configService?.get<string>('DATABASE_PASSWORD');
  const database = configService?.get<string>('DATABASE_NAME');

  return {
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    migrations: migrations,
    entities: [User, Course, Enrollment],
  };
}

export const getTypeOrmConfig = (configService?: ConfigService): TypeOrmModuleOptions => {
  const raw = getRawTypeOrmConfig(configService);
  return raw as TypeOrmModuleOptions;
};
