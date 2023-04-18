import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConnectionService } from '@app/models/mariadb/services';
import { ConnectProfilesDto, DisconnectProfilesDto } from './connection.dto';
import { Roles } from '../../auth/decorators';
import { RoleEnum } from '../../auth/enums';
import { RequestWithSession } from '../../auth/auth.dto';

@Controller('connection')
@ApiTags('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  connectProfiles(
    @Request() request: RequestWithSession,
    @Body() data: ConnectProfilesDto,
  ) {
    return this.connectionService.connectProfiles(
      request.session.passport.user.profileId,
      data,
    );
  }

  @Post('remove')
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  disconnectProfiles(
    @Request() request: RequestWithSession,
    @Body() body: DisconnectProfilesDto,
  ) {
    return this.connectionService.disconnectProfiles(
      request.session.passport.user.id,
      body,
    );
  }
}
