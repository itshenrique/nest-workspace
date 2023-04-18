import { IProfile } from '../../profile/interfaces/profile.interface';
import { IUserRole } from './userRole.interface';

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  // relations
  userRoles?: IUserRole[];
  profiles?: IProfile[];
}
