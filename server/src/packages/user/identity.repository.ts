import { Option } from 'funfix';

export interface IdentityRepository {
  create: (identity: IIdentity) => Promise<IIdentity>;
  updated: () => Promise<IIdentity>;
  delete: () => Promise<IIdentity>;
  findById: () => Promise<Option<IIdentity>>;
  findAll: () => Promise<IIdentity[]>;
}

export interface IIdentity {
  id: string;
  user_id: string;
  created: string;
  updated: string;
  display_name: string;
  email: string;
  meta: string;
}
