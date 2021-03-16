import { Contact, Listing } from '../models/types';
import { readDataStream } from './fileReader';
import { IRepo } from './repoInterface';

export class Repo implements IRepo {
  public getContacts(): Promise<Contact[]> {
    return readDataStream('contacts.csv');
  }

  public getListings(): Promise<Listing[]> {
    return readDataStream('listings.csv');
  }
}
