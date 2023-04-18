import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities';

@Injectable()
export class PostRepo {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findOneById(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }

  findAllByProfiledId(profileId: number): Promise<Post[]> {
    return this.postRepository.findBy({
      profileId,
    });
  }

  findManyPostsByProfileId(
    profileId: number,
    connectionProfileIds: number[],
  ): Promise<Post[]> {
    return this.postRepository.find({
      where: [
        {
          profileId,
        },
        {
          profileId: In(connectionProfileIds),
        },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  save(body: Partial<Post>): Promise<Post> {
    return this.postRepository.save(body);
  }
}
