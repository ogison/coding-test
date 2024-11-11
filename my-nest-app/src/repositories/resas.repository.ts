export const RESAS_REPOSITORY = Symbol('ResasRepository');
export interface ResasRepository {
  findByCriteria(
    year: number,
    prefectureCode: number,
    type: number,
  ): Promise<any>;
}
