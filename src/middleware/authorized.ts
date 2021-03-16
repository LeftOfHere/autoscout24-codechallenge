import { Request, Response } from "express";
import { error } from "../error/error";
import { Role } from "../models/enums";

export function isAuthorized(opts: { hasRole: Role, allowSameUser?: boolean }) {
    return async (req: Request, res: Response, next: Function) => {
        const { role } = res.locals

        if (!role || role !== opts.hasRole)
            return next(error(403, 'Unauthorized'));

            
        return next();
    }
}