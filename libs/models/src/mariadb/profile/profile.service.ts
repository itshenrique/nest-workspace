import { Injectable, UnauthorizedException } from '@nestjs/common';
import { get } from 'lodash';
import { ConnectionRepo, PostRepo } from '../repos';
import { ProfileBasicInfo } from './dto/response.dto';
import { Profile } from './entities';
import { ProfileRepo } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepo: ProfileRepo,
    private readonly connectionRepo: ConnectionRepo,
    private readonly postRepo: PostRepo,
  ) {}

  findById(id: number): Promise<Profile> {
    return this.profileRepo.findOneById(id);
  }

  async getPostsFromProfile(profileId: number, id: number): Promise<any> {
    const connection = await this.connectionRepo.findConnectionByProfileIds(
      profileId,
      id,
    );

    if (!connection) {
      throw new UnauthorizedException();
    }

    const posts = await this.postRepo.findAllByProfiledId(id);

    return posts;
  }

  async getProfile(id: number): Promise<ProfileBasicInfo> {
    const profileInfo = await this.profileRepo.findOneById(id);
    return {
      name: profileInfo.name,
      birthdate: profileInfo.birthdate,
      biography: profileInfo.biography,
      profilePicUrl: profileInfo.profilePicUrl,
      email: get(profileInfo, 'user.email'),
      username: get(profileInfo, 'user.username'),
    };
  }

  async getAnotherUserProfile(
    profileId: number,
    id: number,
  ): Promise<ProfileBasicInfo> {
    const connection = await this.connectionRepo.findConnectionByProfileIds(
      profileId,
      id,
    );

    if (!connection) {
      throw new UnauthorizedException();
    }

    return this.getProfile(id);
  }
}
