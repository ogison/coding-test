export interface ResasRepository {
  findByCriteria(
    year: number,
    prefCode: number,
    cityCode: string,
    displayType: number,
  ): Promise<any>;
}
