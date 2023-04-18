import { IProfile } from '../../profile/interfaces/profile.interface';

export interface IPost {
  id: number;
  profileId: number;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  // relations
  profile?: IProfile;
}
