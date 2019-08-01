import { IUser, Identity } from './user.repository';
import { Option, Some, None} from 'funfix';
import { v4 as uuid } from 'uuid';

export class User implements IUser {
  id: string;
  created: Date;
  updated: Option<Date>;
  identities: Option<Identity[]>;
  defaultIdentity: Option<string>;

  constructor(identities: Identity[]) {
    this.id = uuid();
    this.created = new Date();
    this.updated = None;
    this.identities = Some(identities);
    this.defaultIdentity = None;
  }

  public setDefaultIdentity(identity: Identity) {
    this.defaultIdentity = Some(identity.id);
    this.updated = Some(new Date());
  }

  public toDTO(): IUser {
    return {
      id: this.id,
      created: this.created,
      updated: this.updated,
      identities: this.identities,
      defaultIdentity: this.defaultIdentity,
    };
  }

  public static fromDTO(dto: IUser): User {
    const newUser = new User(dto.identities.getOrElse([]));
    newUser.id = dto.id;
    newUser.created = dto.created;
    newUser.updated = dto.updated;
    newUser.defaultIdentity = dto.defaultIdentity;

    return newUser;
  }

}
