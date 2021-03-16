import { Contact, Listing } from '../models/types';
import { IRepo } from '../repo/repoInterface';

const averagePriceOfMostContactedListings = async (
  repo: IRepo
): Promise<{ averagePrice: number }> => {
  const [listings, contacts] = await Promise.all<Listing[], Contact[]>([
    repo.getListings(),
    repo.getContacts(),
  ]).catch((err) => {
    throw err;
  });

  const reducedContacts: { name: number; count: number }[] = contacts.reduce(
    (prev: any, item: Contact) => {
      const tempItem = prev.find((p) => p.name === item.listing_id);
      if (tempItem) {
        tempItem.count++;
      } else {
        prev.push({ name: item.listing_id, count: 1 });
      }
      return prev;
    },
    []
  );

  const listingsToAverage = reducedContacts
    .sort((a, b) => b.count - a.count)
    .splice(Math.floor(reducedContacts.length * 0.3), reducedContacts.length - 1)
    .map((c) => c.name);

  const totalListings = listings
    .filter((l) => listingsToAverage.includes(l.id))
    .map((l) => l.price);

  return {
    averagePrice:
      totalListings.reduce((prev_1: any, item_1: number) => (prev_1 += item_1), 0) /
      totalListings.length,
  };
};

export default averagePriceOfMostContactedListings;
