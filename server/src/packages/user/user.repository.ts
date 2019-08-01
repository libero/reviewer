import { Option } from 'funfix';

export interface Identity {
  id: string;
  user_id: string;
  created: Date;
  updated: Date;
  display_name: string;
  email: string;
  meta: string;
}

export interface IUser {
  id: string;
  created: Date;
  updated: Option<Date>;
  identities: Option<Identity[]>;
  defaultIdentity: Option<string>;
}

export interface UserRepository {
  insert: (user: IUser) => Promise<IUser>;
  update: (user: IUser) => Promise<IUser>;
  remove: (userId: string) => Promise<void>;
  selectById: (userId: string) => Promise<Option<IUser>>;
  selectByProfileId: (identifier: string) => Promise<Option<IUser>>;
  selectAll: () => Promise<IUser[]>;
}
