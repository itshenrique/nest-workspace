import * as ConnectionEntities from './connection/entities';
import * as PostEntities from './post/entities';
import * as ProfileEntities from './profile/entities';
import * as UserEntities from './user/entities';

export const entities = [
  ...Object.values(ConnectionEntities),
  ...Object.values(PostEntities),
  ...Object.values(ProfileEntities),
  ...Object.values(UserEntities),
];
