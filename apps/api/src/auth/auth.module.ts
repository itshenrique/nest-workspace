import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Dependency Modules
import { SharedModule } from '@app/shared';
import { ModelsModule } from '@app/models';

// Service from this module
import { AuthService } from './auth.service';

// Other
import { LocalStrategy } from './strategies';
import { SessionSerializer } from './serializer/session.serializer';

@Module({
  imports: [
    ModelsModule,
    PassportModule.register({ session: true }),
    SharedModule,
  ],
  providers: [AuthService, SessionSerializer, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
