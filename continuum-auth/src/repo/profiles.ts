// Connector to the profiles service
import { InfraLogger as logger } from "../logger";
import fetch from "node-fetch";
import { Option } from "funfix";
import { checkStatus } from "../utils";

// Eventually these interfaces will be moved to domainland
export interface ProfilesRepo {
  getProfileById(string): Promise<Option<UserProfile>>;
}

export interface UserProfile {
  id: string;
  orcid: string;
}

export class ProfilesService implements ProfilesRepo {
  private url: string;

  constructor(url: string) {
    this.url = url;
    logger.info("profilesConnectorInit");
  }

  private makeProfileUrl(profile_id: string): string {
    return `${this.url}/${profile_id}`;
  }

  public async getProfileById(
    profile_id: string
  ): Promise<Option<UserProfile>> {
    logger.trace("lookupProfile", { profile_id });

    const profile = Option.of(
      await fetch(this.makeProfileUrl(profile_id))
        .then(checkStatus)
        .then(query_response => {
          logger.trace("lookupProfileOk", { profile_id });
          return query_response.json();
        })
        .catch(e => {
          logger.debug("lookupProfileError", { profile_id, e });
          return undefined;
        })
    );
    return profile;
  }
}
