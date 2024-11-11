import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ResasService } from '../use-cases/resas.service';
import { ResasQueryDto } from 'src/dto/resas-dto';

@Controller('townPlanning')
export class ResasController {
  constructor(private readonly resasService: ResasService) {}

  @Get('estateTransaction/bar')
  async getEstateTransactionData(
    @Query(new ValidationPipe({ transform: true })) query: ResasQueryDto,
  ) {
    return await this.resasService.getEstateTransactionData(
      query.year,
      query.prefectureCode,
      query.type,
    );
  }
}
