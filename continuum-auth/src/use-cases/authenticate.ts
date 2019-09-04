import { Request, Response } from "express";
import { DomainLogger as logger } from "../logger";
import { Option } from "funfix";
import { encode } from "../jwt";
import { ProfilesRepo } from "../repo/profiles";
import { v4 } from "uuid";
import config from '../config';

// This is the endpoint that does the actual token exchange/user lookup and signing the output token
// And yeah, I know the controller/usecase code shouldn't be mixed but idec, we can refactor it at some point
// The tokens will take the following shape:
const example_token = {
  iss: "journal--prod",
  iat: 1567503944,
  exp: 1567504004,
  id: "jfrdocq8",
  "new-session": true
};

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

            const payload = { token_id: v4(), profile, user_roles: ["author"] };
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
