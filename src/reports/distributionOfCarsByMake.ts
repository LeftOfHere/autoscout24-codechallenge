import { Listing } from '../models/types';
import { IRepo } from '../repo/repoInterface';

const distributionOfCarsByMake = async (
  repo: IRepo
): Promise<{ make: string; percentage: string }[]> => {
  const listings = await repo.getListings();

  const result = listings.reduce(
    (prev: any, item: Listing) => {
      prev.total++;
      if (item.make in prev.cars) {
        prev.cars[item.make].count++;
      } else {
        prev.cars[item.make] = {};
        prev.cars[item.make].count = 1;
      }
      return prev;
    },
    { total: 0, cars: {} }
  );

  return Object.entries(result.cars).map((entry: any) => ({
    make: entry[0],
    percentage: ((entry[1].count / result.total) * 100).toFixed(2),
  }));
};

export default distributionOfCarsByMake;
