import { Request, Response } from 'express';
import { error } from '../error/error';
import averageSellingPriceBySellerType from './averageSellingPriceReport';
import averagePriceOfMostContactedListings from './averagePriceOfMostContactedListings';
import distributionOfCarsByMake from './distributionOfCarsByMake';
import topFiveMostContactactedListingsByMonth from './topFiveMostContactactedListingsByMonth';
import { Repo } from '../repo/repo';

const REPORTS = {
  '0': averageSellingPriceBySellerType,
  '1': distributionOfCarsByMake,
  '2': averagePriceOfMostContactedListings,
  '3': topFiveMostContactactedListingsByMonth,
};

const repo = new Repo();

export async function report(req: Request, res: Response, next: Function) {
  const { type } = req.query;

  if (!type) return next(error(404, `Not found`));
  
  let typeString = type.toString();
  if (!REPORTS[typeString]) return next(error(400, `Report ${typeString} Not found`));

  try {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');

    REPORTS[typeString](repo)
      .then((result) => res.json(result))
      .catch((err) => next(error(500, err.message)));
  } catch (err) {
    return next(error(500, err));
  }
}
