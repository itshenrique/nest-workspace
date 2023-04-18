import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { mariadbConfig } from '../config/mariadb.config';
import { entities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const typeOrmModuleAsyncOptions: TypeOrmModuleOptions = {
          type: 'mariadb',
          host: mariadbConfig.host,
          port: mariadbConfig.port,
          username: mariadbConfig.username,
          password: mariadbConfig.password,
          database: mariadbConfig.database,
          entities: entities,
          synchronize: true,
        };
        return typeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class MariaDBProviderModule {}
