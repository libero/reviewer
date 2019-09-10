import { Request, Response } from "express";

export const Submit = (config, sign) => (req: Request, resp: Response) => {
    const token = sign({
        iss: "journal--prod",
        id: "ewwboc7m",
        "new-session": true
    },
    config.continuumLoginJwtSecret, {
        expiresIn: '1d',
    })

    resp.redirect(`${config.authenticationUrl}/authenticate/${token}`);
}
