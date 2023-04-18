import { Injectable } from '@nestjs/common';
import { UserService } from '@app/models/mariadb/user/user.service';
import { CryptoService } from '@app/shared/services/crypto.service';
import { DataSession } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
  ) {}

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<DataSession> {
    const user = await this.userService.getUserProfileByUsername(username);

    if (user) {
      const isPasswordCorrect = await this.cryptoService.compareData(
        password,
        user.password,
      );
      return isPasswordCorrect
        ? {
            id: user.id,
            email: user.email,
            username: user.username,
            profileId: user.profiles[0].id,
          }
        : null;
    }
    return null;
  }
}
