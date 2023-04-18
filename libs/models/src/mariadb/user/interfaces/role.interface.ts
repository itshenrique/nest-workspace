import { IUserRole } from './userRole.interface';

export interface IRole {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  // relations
  userRoles?: IUserRole[];
}
