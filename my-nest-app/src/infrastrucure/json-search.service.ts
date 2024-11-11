import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ResasRepository } from 'src/repositories/resas.repository';

@Injectable()
export class JsonSearchService implements ResasRepository {
  private dataPath = path.join(
    __dirname,
    '../../assets/estate_transactions.json',
  );

  async findByCriteria(
    year: number,
    prefCode: number,
    cityCode: string,
    displayType: number,
  ): Promise<any> {
    const data = JSON.parse(fs.readFileSync(this.dataPath, 'utf-8'));
    return data.filter(
      (item: {
        year: number;
        prefCode: number;
        cityCode: string;
        displayType: number;
      }) =>
        item.year === year &&
        item.prefCode === prefCode &&
        item.cityCode === cityCode &&
        item.displayType === displayType,
    );
  }
}
