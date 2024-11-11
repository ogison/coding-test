import { Inject, Injectable } from '@nestjs/common';
import {
  RESAS_REPOSITORY,
  ResasRepository,
} from 'src/repositories/resas.repository';

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
    return await this.resasRepository.findByCriteria(
      year,
      prefectureCode,
      type,
    );
  }
}
