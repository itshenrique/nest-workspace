import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  ConnectionService,
  PostService,
  ProfileService,
} from '@app/models/mariadb/services';

@Injectable()
export class FeedService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly connectionService: ConnectionService,
    private readonly postService: PostService,
  ) {}

  async getFeed(userId: number, profileId: number): Promise<any> {
    const profile = await this.profileService.findById(profileId);

    if (profile.userId !== userId) {
      throw new UnauthorizedException();
    }

    const connections = await this.connectionService.findManyByFirstProfileId(
      profileId,
    );

    const feed = await this.postService.findManyPostsByProfileId(
      profileId,
      connections.map((c) => c.secondProfileId),
    );

    return feed;
  }
}
