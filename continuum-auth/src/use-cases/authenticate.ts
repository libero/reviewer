import { Request, Response } from "express";
import { DomainLogger as logger } from "../logger";
import { Option } from "funfix";
import { encode } from "../jwt";
import { ProfilesRepo } from "../repo/profiles";
import { v4 } from "uuid";
import config from '../config';

// NOTE: This is a duplicate from server/src/modules/auth/types.ts
// we just haven't set up a way of having a shared types module

export interface UserIdentity { // don't forget this is merged with the rest of the JWT standard fields
  token_id: string; // Generated, unique per token
  token_version: '0.1-alpha'; // Generated, hardcoded
  identity: { // Unique per user, lookup from profiles, people, user management services
    user_id: string;
    external: Array<{
      id: string;
      domain: string; // e.g. "elife-profiles", "elife-people", "orcid"
    }>;
  };

  // Generic user roles, basically to know which
  // So a user is associated with a `journal` when they've got a role with it?
  roles: Array<{
    journal: string; // e.g. "elife"
    kind: string; // e.g. "author", "reviewer", e.t.c
  }>;
  meta: unknown; // could be anything
}

// End of duplicated code

// This is the endpoint that does the actual token exchange/user lookup and signing the output token
// And yeah, I know the controller/usecase code shouldn't be mixed but idec, we can refactor it at some point
// The tokens will take the following shape:
// const example_token = {
//   iss: "journal--prod",
//   iat: 1567503944,
//   exp: 1567504004,
//   id: "jfrdocq8",
//   "new-session": true
// };

export const Authenticate = (profilesService: ProfilesRepo) => (
  req: Request,
  res: Response
) =>
  Option.of(req.params["token"])
    .map(
      async (token: string): Promise<void> => {
        // Decode the token that's passed to this endpoint from whatever OAuth provider we go with (I'm guessing ORCiD)
        // Somehow resolve that user's identifier/metadata from the profiles service
        // Shove a subset of that information into a JWT
        // Send that back to the client

        // Controller: perform the requests to the various services and fetch the user data

        const  { auth: { authorised_redirect_url } } = config;
        const maybeProfile = await profilesService.getProfileById(token);

        maybeProfile
          .map(profile => {
            logger.info("getProfile", profile);
            // TODO: Calculate user-role

            const payload: UserIdentity = { 
              token_id: v4(),
              token_version: "0.1-alpha",
              identity: {
                user_id: v4(), // TODO: this needs to be a useful value at some point
                external: [
                  {
                    id: profile.id,
                    domain: "elife-profiles"
                  },
                  {
                    id: profile.orcid,
                    domain: "orcid",
                  }
                ]
              },
              roles: [{journal: "elife", kind: "author"}],
              meta: null,
            };

            const output_token = encode(payload);

            res.redirect(`${authorised_redirect_url}#${output_token}`);
          })
          .getOrElseL(() => {
            logger.warn("unauthorized");
            res.status(403).json({ ok: false, msg: "unauthorised" });
          });
      }
    )
    .getOrElseL(() => {
      logger.warn("noTokenProvided");
      res.status(500).json({ ok: false });
    });
