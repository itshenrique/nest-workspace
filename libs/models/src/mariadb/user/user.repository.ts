import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profile/entities';
import { Role } from './entities';
import { User, UserRole } from './entities';
import { RoleEnum } from 'apps/api/src/auth/enums';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(
    user: Omit<User, 'id'>,
    profile: Pick<Profile, 'name'>,
  ): Promise<User> {
    let newUser;

    await this.userRepository.manager.transaction(async (manager) => {
      const { id: roleId } = await manager.findOneBy<Role>(Role, {
        title: RoleEnum.User,
      });
      newUser = await manager.save(User, user);
      const { id: userId } = newUser;
      const [newUserRole, newProfile] = await Promise.all([
        manager.save(UserRole, { roleId, userId }),
        manager.save(Profile, {
          userId,
          name: profile.name,
        }),
      ]);

      if (!newUserRole || !newProfile) throw new Error();
    });

    return newUser;
  }

  async getUserRole(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  async getUserWithRelations(
    filter: Partial<User>,
    relations: string[],
  ): Promise<User> {
    return this.userRepository.findOne({
      where: filter,
      relations,
    });
  }
}
