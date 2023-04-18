import {
  Injectable,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileRepo } from '../repos';
import { ConnectionRepo } from './connection.repository';
import { Connection } from './entities';

@Injectable()
export class ConnectionService {
  constructor(
    private readonly connectionRepo: ConnectionRepo,
    private readonly profileRepo: ProfileRepo,
  ) {}

  async connectProfiles(
    userId: number,
    body: {
      profileId: number;
      profileToConnectId: number;
    },
  ): Promise<any> {
    const [firstProfile, secondProfile, connection] = await Promise.all([
      this.profileRepo.findOneById(body.profileId),
      this.profileRepo.findOneById(body.profileToConnectId),
      this.connectionRepo.findConnectionByProfileIds(
        body.profileId,
        body.profileToConnectId,
      ),
    ]);

    if (!firstProfile || firstProfile.userId !== userId || !secondProfile) {
      throw new UnauthorizedException();
    }

    if (connection) {
      throw new PreconditionFailedException('Users already connected');
    }

    this.connectionRepo.connectProfiles(
      body.profileId,
      body.profileToConnectId,
    );
  }

  async disconnectProfiles(
    userId: number,
    body: {
      profileId: number;
      profileToDisconnectId: number;
    },
  ): Promise<any> {
    const [firstProfile, secondProfile, connection] = await Promise.all([
      this.profileRepo.findOneById(body.profileId),
      this.profileRepo.findOneById(body.profileToDisconnectId),
      this.connectionRepo.findConnectionByProfileIds(
        body.profileId,
        body.profileToDisconnectId,
      ),
    ]);

    if (!firstProfile || firstProfile.userId !== userId || !secondProfile) {
      throw new UnauthorizedException();
    }

    if (!connection) {
      throw new PreconditionFailedException('Users not connected');
    }

    this.connectionRepo.disconnectProfiles(
      body.profileId,
      body.profileToDisconnectId,
    );
  }

  findManyByFirstProfileId(profileId: number): Promise<Connection[]> {
    return this.connectionRepo.findManyBy({
      firstProfileId: profileId,
    });
  }
}
