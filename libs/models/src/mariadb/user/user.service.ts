import { BadRequestException, Injectable } from '@nestjs/common';
import { CryptoService } from '@app/shared/services/crypto.service';
import { UserRepo } from './user.repository';
import { IUser } from './interfaces/user.interface';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(data: Omit<IUser, 'id'> & { name: string }): Promise<any> {
    const [emailCheck, usernameCheck] = await Promise.all([
      this.userRepo.findOneByEmail(data.email),
      this.userRepo.findOneByUsername(data.username),
    ]);

    if (usernameCheck) throw new BadRequestException('Username already exist!');

    if (emailCheck) throw new BadRequestException('Email already exist!');

    const newUser = {
      ...data,
      password: this.cryptoService.hashData(data.password),
    };

    const user = this.userRepo.createUser(
      // usuário
      {
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      },
      // perfil
      {
        name: data.name,
      },
    );

    return !!user;
  }

  async getUserProfileByUsername(username: string): Promise<User> {
    return this.userRepo.getUserWithRelations({ username }, ['profiles']);
  }

  async getUser(id: number): Promise<any> {
    const user = await this.userRepo.findById(id);
    if (user) {
      return {
        email: user.email,
        username: user.username,
      };
    }
  }

  async getUserRolesByToken(id: number): Promise<string[]> {
    const user = await this.userRepo.getUserRole(id);
    const userRoles = user.userRoles;

    return userRoles.map((ur) => ur.role.title);
  }
}
