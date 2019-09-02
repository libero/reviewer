// This will basically just redirect the user to the OAuth provider (ORCiD)
import { Request, Response } from 'express';

export const Login = (req: Request, res: Response) => {

  res.redirect("www.google.com");
};
