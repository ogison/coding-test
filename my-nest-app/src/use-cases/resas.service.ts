import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  RESAS_REPOSITORY,
  ResasRepository,
} from 'src/repositories/resas.repository';
import { JSONData } from 'src/types';

@Injectable()
export class ResasService {
  constructor(
    @Inject(RESAS_REPOSITORY) private readonly resasRepository: ResasRepository,
  ) {}

  async getEstateTransactionData(
    year: number,
    prefectureCode: number,
    type: number,
  ) {
    const data: JSONData[] = await this.resasRepository.findByCriteria(
      year,
      prefectureCode,
      type,
    );

    if (!data || data.length === 0) {
      throw new NotFoundException(
        '指定された条件に一致するデータが見つかりませんでした',
      );
    }

    const value = data[0]?.data?.result?.years[0]?.value;

    if (value === undefined || value === null) {
      throw new NotFoundException('データ内に値が見つかりませんでした');
    }
    return { value: value };
  }
}
