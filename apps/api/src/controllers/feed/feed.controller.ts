import { Controller, Get, Request } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators';
import { RoleEnum } from '../../auth/enums';
import { RequestWithSession } from '../../auth/auth.dto';

@Controller('feed')
@ApiTags('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  getFeed(@Request() request: RequestWithSession) {
    return this.feedService.getFeed(
      request.session.passport.user.id,
      request.session.passport.user.profileId,
    );
  }
}
