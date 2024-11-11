import { Type } from 'class-transformer';
import { IsInt, IsIn, Min, Max, IsNotEmpty } from 'class-validator';

export class ResasQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(2015)
  @Max(2018)
  @IsNotEmpty()
  year: number;

  @Type(() => Number)
  @IsInt()
  @Min(8)
  @Max(14)
  @IsNotEmpty()
  prefectureCode: number;

  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2])
  @IsNotEmpty()
  type: number;
}
