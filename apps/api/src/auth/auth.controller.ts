import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginUserDto, RequestWithSession } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards';
import { PublicRoute } from './decorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.NO_CONTENT)
  logIn(@Body() user: LoginUserDto) {
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Request() req: RequestWithSession) {
    req.session.destroy();
  }
}
