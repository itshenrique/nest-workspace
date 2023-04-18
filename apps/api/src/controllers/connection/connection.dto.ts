import { ApiProperty } from '@nestjs/swagger';

export class ConnectProfilesDto {
  @ApiProperty()
  profileId: number;

  @ApiProperty()
  profileToConnectId: number;
}

export class DisconnectProfilesDto {
  @ApiProperty()
  profileId: number;

  @ApiProperty()
  profileToDisconnectId: number;
}
