import * as chai from 'chai';
import 'mocha';
import { Listing } from '../models/types';
import { createAverageSellingPriceBySellerType } from './controller';

const expect = chai.expect;

describe('Reports', () => {
  it('create average selling price report', () => {
    const listings: Listing[] = [
      { id: 1000, make: 'Audi', price: 49717, mileage: 6500, seller_type: 'private' },
      { id: 1001, make: 'Mazda', price: 22031, mileage: 7000, seller_type: 'private' },
      { id: 1002, make: 'BWM', price: 17742, mileage: 6000, seller_type: 'dealer' },
      { id: 1004, make: 'Mazda', price: 25219, mileage: 3000, seller_type: 'other' },
      { id: 1005, make: 'Audi', price: 43667, mileage: 500, seller_type: 'private' },
      { id: 1006, make: 'Renault', price: 47446, mileage: 7500, seller_type: 'other' },
    ];

    const report = createAverageSellingPriceBySellerType(listings);

    expect(report).to.be.an('array');
    expect(report.find(r => r.seller_type === 'dealer')).to.not.be.null;
    expect(report.find(r => r.seller_type === 'dealer').average.toFixed(2)).to.eql((17742 / 1).toFixed(2));
    expect(report.find(r => r.seller_type === 'other')).to.not.be.null;
    expect(report.find(r => r.seller_type === 'other').average.toFixed(2)).to.eql(((25219 + 47446) / 2).toFixed(2));
    expect(report.find(r => r.seller_type === 'private')).to.not.be.null;
    expect(report.find(r => r.seller_type === 'private').average.toFixed(2)).to.eql(((49717 + 22031 + 43667) / 3).toFixed(2));
  });
});
