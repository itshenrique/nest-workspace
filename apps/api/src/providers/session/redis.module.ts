import { redisSessionConfig } from '../../config/session';
import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: redisSessionConfig.provide,
      useFactory: () => {
        return new Redis(redisSessionConfig.port, 'localhost');
      },
    },
  ],
  exports: [redisSessionConfig.provide],
})
export class RedisModule {}
