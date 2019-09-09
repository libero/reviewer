import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export const Submit = (req: Request, resp: Response) => {
    const token = sign({
        iss: "journal--prod",
        id: "ewwboc7m",
        "new-session": true
    },
    'some_secret_from_journal', {
        expiresIn: '1d',
    })

    resp.redirect(`http://localhost:3001/authenticate/${token}`);
}
