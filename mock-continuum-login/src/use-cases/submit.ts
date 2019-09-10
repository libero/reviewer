import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import config from "../config";

export const Submit = (req: Request, resp: Response) => {
    const token = sign({
        iss: "journal--prod",
        id: "ewwboc7m",
        "new-session": true
    },
    'some_secret_from_journal', {
        expiresIn: '1d',
    })

    resp.redirect(`${config.reviewerAuthUrl}/authenticate/${token}`);
}
