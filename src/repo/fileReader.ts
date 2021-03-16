import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { Listing } from '../models/types';

const dataPath = './src/data';

export const readDataStream = (name: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    let dataLoc = path.resolve(dataPath);
    dataLoc = path.join(dataLoc, name);

    const data: Listing[] = [];

    const mapValues =
      name === 'listings.csv'
        ? ({ header, index, value }) => {
            return index === 0 || index === 2 || index === 3 ? parseFloat(value) : value;
          }
        : ({ header, index, value }) => {
            return parseInt(value);
          };

    // const resultStream = new Transform();
    fs.createReadStream(dataLoc, { encoding: 'utf8' })
      .pipe(
        csvParser({
          mapValues: mapValues,
        })
      )
      .on('data', (d) => data.push(d))
      .on('end', () => resolve(data))
      .on('error', (err) => reject(err));
  });
};
