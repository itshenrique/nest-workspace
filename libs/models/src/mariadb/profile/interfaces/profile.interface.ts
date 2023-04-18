import { IConnection } from '../../connection/interfaces/connection.interface';
import { IPost } from '../../post/interfaces/post.interface';
import { IUser } from '../../user/interfaces/user.interface';

export interface IProfile {
  id: number;
  userId: number;
  name: string;
  birthdate: Date;
  biography: string;
  profilePicUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  // relations
  user?: IUser;
  firstConnections?: IConnection[];
  secondConnections?: IConnection[];
  posts?: IPost[];
}
