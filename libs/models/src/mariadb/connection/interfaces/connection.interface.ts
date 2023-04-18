import { IProfile } from '../../profile/interfaces/profile.interface';

export interface IConnection {
  id: number;
  firstProfileId: number;
  secondProfileId: number;
  createdAt?: Date;
  updatedAt?: Date;
  // relations
  firstProfile?: IProfile;
  secondProfile?: IProfile;
}
