import { Contact, Listing } from '../models/types';
import { IRepo } from '../repo/repoInterface';

const topFiveMostContactactedListingsByMonth = async (repo: IRepo): Promise<any[]> => {
  const [listings, contacts] = await Promise.all<Listing[], Contact[]>([
    repo.getListings(),
    repo.getContacts(),
  ]).catch((err) => {
    throw err;
  });

  const result = contacts.reduce((prev: any, item: Contact) => {
    const date = new Date(item.contact_date);
    const month = date.getMonth();
    const year = date.getFullYear();

    const tempItem = prev.find((p) => p.yearMonth === `${year}.${month}`);

    if (tempItem) {
      const tempItem2 = tempItem.data.find((t) => t.name === item.listing_id);
      if (tempItem2) tempItem2.count++;
      else tempItem.data.push({ name: item.listing_id, count: 1 });
    } else {
      prev.push({ yearMonth: `${year}.${month}`, data: [{ name: item.listing_id, count: 1 }] });
    }
    return prev;
  }, []);

  result
    .sort((a, b) => a.yearMonth - b.yearMonth)
    .forEach((res) => {
      res.data = res.data.sort((a, b) => b.count - a.count).splice(0, 5);
    });
  return result.map((r) => ({
    yearMonth: r.yearMonth,
    data: r.data.map((d) => ({ ...listings.find((l) => l.id === d.name), count: d.count })),
  }));
};

export default topFiveMostContactactedListingsByMonth;
