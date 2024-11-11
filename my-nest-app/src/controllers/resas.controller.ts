import { Controller, Get, Query } from '@nestjs/common';
import { ResasService } from '../use-cases/resas.service';

@Controller('townPlanning')
export class ResasController {
  constructor(private readonly resasService: ResasService) {}

  @Get('estateTransaction/bar')
  async getEstateTransactionData(
    @Query('year') year: number,
    @Query('prefCode') prefCode: number,
    @Query('cityCode') cityCode: string,
    @Query('displayType') displayType: number,
  ) {
    return await this.resasService.getEstateTransactionData(
      year,
      prefCode,
      cityCode,
      displayType,
    );
  }
}
