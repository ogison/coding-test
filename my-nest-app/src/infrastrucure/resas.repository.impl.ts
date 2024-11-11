import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ResasRepository } from 'src/repositories/resas.repository';
import { JSONData } from 'src/types';

@Injectable()
export class ResasRepositoryImpl implements ResasRepository {
  private dataPath = path.join(
    __dirname,
    '../../assets/json/estate_transactions.json',
  );

  async findByCriteria(
    year: number,
    prefectureCode: number,
    type: number,
  ): Promise<JSONData[]> {
    const data: JSONData[] = JSON.parse(
      fs.readFileSync(this.dataPath, 'utf-8'),
    );

    return data.filter(
      (item: JSONData) =>
        item.year === year &&
        item.prefectureCode === prefectureCode &&
        item.type === type,
    );
  }
}
