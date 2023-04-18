import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export interface DataSession {
  id: number;
  email: string;
  username: string;
  profileId: number;
}

export interface RequestWithSession {
  session: {
    destroy();
    passport: {
      user: DataSession;
    };
  };
}
