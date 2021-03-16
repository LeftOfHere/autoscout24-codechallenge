import { Request, Response } from 'express';
import { error } from '../error/error';
import { Role } from '../models/enums';

export async function isAuthenticated(req: Request, res: Response, next: Function) {
  // Get the authorization header
  // const { authorization } = req.headers;

  // check auth headers
  if (!true) return next(error(401, 'Unauthorized'));

  try {
    // decode auth token or get user details from db
    res.locals = { ...res.locals, uid: "userId", email: "user@someone.com", role: Role.ADMIN };
    return next();
  } catch (err) {
    return next(error(401, 'Unauthorized'));
  }
}
