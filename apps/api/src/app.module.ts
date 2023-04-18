import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// Segurança
import { AuthModule } from './auth';
import { RolesGuard } from './auth/guards';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

// Controllers
import * as ApiControllers from './controllers';

// Outros
import { ModelsModule } from '@app/models';
import { SharedModule } from '@app/shared';
import { FeedService } from './controllers/feed/feed.service';

// Sessão
import { RedisModule } from './providers/session/redis.module';
import { redisSessionConfig } from './config/session';
import * as passport from 'passport';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { RedisClientType } from 'redis';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ModelsModule,
    AuthModule,
    SharedModule,
    RedisModule,
  ],
  controllers: [...Object.values(ApiControllers)],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
    FeedService,
  ],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(redisSessionConfig.provide)
    private readonly redis: RedisClientType,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({
            client: this.redis,
            prefix: 'nito:',
            ttl: redisSessionConfig.ttl,
          }),
          saveUninitialized: false,
          secret: redisSessionConfig.secret,
          resave: true,
          rolling: true,
          cookie: {
            sameSite: true,
            httpOnly: false,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
