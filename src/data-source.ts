import { DataSource, DataSourceOptions } from 'typeorm';
import { getRawTypeOrmConfig } from './common/configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

const configService = new ConfigService();

const dataSourceOptions = getRawTypeOrmConfig(configService);

export const AppDataSource = new DataSource(dataSourceOptions as DataSourceOptions);
