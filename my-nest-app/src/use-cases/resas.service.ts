import { Injectable } from '@nestjs/common';
import { ResasRepository } from 'src/repositories/resas.repository';

@Injectable()
export class ResasService {
  constructor(private readonly resasRepository: ResasRepository) {}

  async getEstateTransactionData(
    year: number,
    prefCode: number,
    cityCode: string,
    displayType: number,
  ) {
    return await this.resasRepository.findByCriteria(
      year,
      prefCode,
      cityCode,
      displayType,
    );
  }
}
