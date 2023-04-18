import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MariaDBProviderModule } from './mariadb.provider';
import * as services from './services';
import * as repos from './repos';
import { entities } from './entities';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    MariaDBProviderModule,
    TypeOrmModule.forFeature(Object.values(entities)),
    SharedModule,
  ],
  providers: [...Object.values(services), ...Object.values(repos)],
  exports: [...Object.values(services)],
})
export class ModelsModule {}
