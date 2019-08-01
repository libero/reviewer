import { Option } from 'funfix';

// These two interfaces roughly map to database tables

export interface Identity {
  id: string;
  user_id: string;
  created: Date;
  updated: Date;
  display_name: string;
  email: string;
  meta: {};
}

export interface JustUser {
  id: string;
  created: Date;
  updated: Option<Date>;
  defaultIdentity: Option<string>;
}

// this, however, is the actual type of a user entity

export type IUser = JustUser & { identities: Option<Identity[]>};

export interface UserRepository {
  insert: (user: IUser) => Promise<IUser>;
  update: (user: IUser) => Promise<IUser>;
  remove: (userId: string) => Promise<void>;
  selectById: (userId: string) => Promise<Option<IUser>>;
  selectByProfileId: (identifier: string) => Promise<Option<IUser>>;
  selectAll: () => Promise<IUser[]>;
}
