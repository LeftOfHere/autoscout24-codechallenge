import { Request, Response } from 'express';
import { error } from '../error/error';
import { readDataStream } from '../repo/fileRepo';
import { Contact, Listing } from '../models/types';

const SUSPPORTED_REPORTS = {
  '0': 'AVERAGE_SELLING_PRICE_BY_SELLER_TYPE',
  '1': 'DISTRIBUTION_OF_CARS_BY_MAKE',
  '2': 'AVERAGE_PRICE_OF_30_MOST_CONTACTED_LISTINGS',
  '3': 'TOP_5_MOST_CONTACTED_PER_MONTH',
};

export async function report(req: Request, res: Response, next: Function) {
  const { type } = req.query;

  // @ts-ignore
  if (!type || !SUSPPORTED_REPORTS[type]) return next(error(400, `Report ${type} Not found`));

  try {
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');

    readDataStream('listings.csv')
      .then((listings: Listing[]) => {
        res.json(distributionOfCarsByMake(listings));
      })
      .catch((err) => next(error(500, err.message)));
  } catch (err) {
    return next(error(500, err));
  }
}

export const averageSellingPriceBySellerType = (
  listings: Listing[]
): { seller_type: string; average: number }[] => {
  const result = listings.reduce((prev: any, item: Listing) => {
    if (item.seller_type in prev) {
      prev[item.seller_type].count++;
      prev[item.seller_type].total += item.price;
    } else {
      prev[item.seller_type] = {};
      prev[item.seller_type].count = 1;
      prev[item.seller_type].total = item.price;
    }
    return prev;
  }, {});

  return Object.entries(result).map((entry: any) => ({
    seller_type: entry[0],
    average: entry[1].total / entry[1].count,
  }));
};

export const distributionOfCarsByMake = (
  listings: Listing[]
): { make: string; percentage: string }[] => {
  const result = listings.reduce((prev: any, item: Listing) => {
    prev.total++;
    if (item.make in prev.cars) {
      prev.cars[item.make].count++;
    } else {
      prev.cars[item.make] = {};
      prev.cars[item.make].count = 1;
    }
    return prev;
  }, {total: 0, cars: {}});

  return Object.entries(result.cars).map((entry: any) => ({
    make: entry[0],
    percentage: ((entry[1].count / result.total) * 100).toFixed(2),
  }));
};
