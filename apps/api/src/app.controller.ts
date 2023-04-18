import { PublicRoute } from './auth/decorators';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @PublicRoute()
  @Get('status')
  status() {
    return true;
  }
}
