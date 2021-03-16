import * as chai from 'chai';
import 'mocha';
import { readDataStream } from './fileRepo';

const expect = chai.expect;

describe('Read files from disk', () => {
  it('read listings from file', () => {
    readDataStream('listings.csv').then((res) => {
      expect(res).to.be.an('array');
    });
  });

  it('read contacts from file', () => {
    readDataStream('contacts.csv').then((res) => {
      expect(res).to.be.an('array');
    });
  });
});
