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

    // const resultStream = new Transform();
    fs.createReadStream(dataLoc, { encoding: 'utf8' })
      .pipe(
        csvParser({
          mapValues: ({ header, index, value }) => {
            return (index === 0 || index === 2 || index === 3)? parseFloat(value) : value;
          },
        })
      )
      .on('data', (d) => data.push(d))
      .on('end', () => resolve(data))
      .on('error', (err) => reject(err));
  });
};
