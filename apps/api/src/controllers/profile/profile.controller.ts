import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { ProfileService } from '@app/models/mariadb/services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators';
import { RoleEnum } from '../../auth/enums';
import { RequestWithSession } from '../../auth/auth.dto';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id/posts')
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  getPostsFromProfile(
    @Request() request: RequestWithSession,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profileService.getPostsFromProfile(
      request.session.passport.user.profileId,
      id,
    );
  }

  @Get()
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  getUserProfile(@Request() request: RequestWithSession) {
    return this.profileService.getProfile(
      request.session.passport.user.profileId,
    );
  }

  @Get(':id')
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  getAnotherProfile(
    @Request() request: RequestWithSession,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profileService.getAnotherUserProfile(
      request.session.passport.user.profileId,
      id,
    );
  }
}
