import { Option } from 'funfix';

export interface IUser {
  id: string;
  created: Date;
  updated: Date;
  identities: Option<string[]>;
  defaultIdentity: string;
}

export interface UserRepository {
  insert: (user: IUser) => Promise<IUser>;
  update: (user: IUser) => Promise<IUser>;
  remove: (userId: string) => Promise<void>;
  selectById: (userId: string) => Promise<Option<IUser>>;
  selectByProfileId: (identifier: string) => Promise<Option<IUser>>;
  selectAll: () => Promise<IUser[]>;
}
