import { Request, Response } from "express";
import { error } from "../error/error";

export async function averageSellingPriceBySellerType(req: Request, res: Response, next: Function) {

  try {
    res.send('Hello World!');

  } catch (err) {
    return next(error(500, err));
  }
}