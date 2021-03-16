import { Contact, Listing } from '../models/types';

export interface IRepo {
  getContacts(): Promise<Contact[]>;

  getListings(): Promise<Listing[]>;
}
