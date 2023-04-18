import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities';

@Injectable()
export class ProfileRepo {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  findOneById(id: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ id });
  }

  getProfileInfo(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
      select: [
        'name',
        'birthdate',
        'birthdate',
        'biography',
        'profilePicUrl',
        'user',
      ],
    });
  }
}
