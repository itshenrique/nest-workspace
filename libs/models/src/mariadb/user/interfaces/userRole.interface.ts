import { IRole } from './role.interface';
import { IUser } from './user.interface';

export interface IUserRole {
  id: number;
  userId: number;
  roleId: number;
  createdAt?: Date;
  updatedAt?: Date;
  // relations
  user?: IUser;
  role?: IRole;
}
