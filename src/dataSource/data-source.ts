import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Country } from '../entities/Country';

// ------------------------ TypeORM setup

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  // logging: true,
  entities: ['src/entities/*.ts'],
});
