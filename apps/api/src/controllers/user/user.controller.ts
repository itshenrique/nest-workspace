import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@app/models/mariadb/services';
import { CreateUserDto } from './user.dto';
import { PublicRoute, Roles } from '../../auth/decorators';
import { RoleEnum } from '../../auth/enums';
import { RequestWithSession } from '../../auth/auth.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicRoute()
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('test')
  @Roles(RoleEnum.Admin, RoleEnum.User)
  getProfile() {
    return { message: 'It works!' };
  }

  @Get()
  getUser(@Request() request: RequestWithSession) {
    return this.userService.getUser(request.session.passport.user.id);
  }
}
