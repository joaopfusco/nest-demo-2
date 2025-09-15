import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const createTypeOrmOptions = (configService: ConfigService): TypeOrmModuleOptions => {
  const dbType = configService.get<'sqlite' | 'postgres'>('DATABASE_TYPE') || 'sqlite';
  const options = {
    type: dbType,
    autoLoadEntities: true,
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
  }
  
  if (dbType === 'sqlite') {
    options["database"] = configService.get<string>('DATABASE_NAME') || 'db.sqlite';
  } else if (dbType === 'postgres') {
    options["url"] =  configService.get<string>('DATABASE_URL');
  } else {
    throw new Error(`Unsupported DATABASE_TYPE: ${dbType}`);
  }

  return options as TypeOrmModuleOptions;
};
