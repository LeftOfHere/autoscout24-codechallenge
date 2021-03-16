import { Listing } from '../models/types';
import { IRepo } from '../repo/repoInterface';

const averageSellingPriceBySellerType = async (
  repo: IRepo
): Promise<{ seller_type: string; average: number }[]> => {
  const listings = await repo.getListings();

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

export default averageSellingPriceBySellerType;
