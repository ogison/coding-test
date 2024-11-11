import { Controller, Get, Query } from '@nestjs/common';
import { ResasService } from '../use-cases/resas.service';

@Controller('townPlanning')
export class ResasController {
  constructor(private readonly resasService: ResasService) {}

  @Get('estateTransaction/bar')
  async getEstateTransactionData(
    @Query('year') year: number,
    @Query('prefectureCode') prefectureCode: number,
    @Query('type') type: number,
  ) {
    return await this.resasService.getEstateTransactionData(
      year,
      prefectureCode,
      type,
    );
  }
}
