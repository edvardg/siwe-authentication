import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsRun: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
