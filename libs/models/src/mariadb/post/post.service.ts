import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfileRepo } from '../repos';
import { Post } from './entities';
import { PostRepo } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepo,
    private readonly profileRepo: ProfileRepo,
  ) {}

  async createPost(userId: number, data: any): Promise<any> {
    const profile = await this.profileRepo.findOneById(data.profileId);

    if (profile.userId !== userId) {
      throw new UnauthorizedException();
    }

    const post = await this.postRepo.save({
      profileId: data.profileId,
      message: data.message,
    });

    return !!post;
  }

  findManyPostsByProfileId(
    profileId: number,
    connectionProfileIds: number[],
  ): Promise<Post[]> {
    return this.postRepo.findManyPostsByProfileId(
      profileId,
      connectionProfileIds,
    );
  }
}
