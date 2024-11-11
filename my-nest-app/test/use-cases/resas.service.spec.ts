import { Test, TestingModule } from '@nestjs/testing';
import {
  RESAS_REPOSITORY,
  ResasRepository,
} from 'src/repositories/resas.repository';
import { NotFoundException } from '@nestjs/common';
import { ResasService } from 'src/use-cases/resas.service';

describe('ResasService', () => {
  let service: ResasService;
  let repository: ResasRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResasService,
        {
          provide: RESAS_REPOSITORY,
          useValue: {
            findByCriteria: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResasService>(ResasService);
    repository = module.get<ResasRepository>(RESAS_REPOSITORY);
  });

  it('指定された条件に一致するデータが存在する場合、値を返すべき', async () => {
    const mockData = [
      {
        data: {
          result: {
            years: [
              {
                value: 123,
              },
            ],
          },
        },
      },
    ];
    (repository.findByCriteria as jest.Mock).mockResolvedValue(mockData);

    const result = await service.getEstateTransactionData(2018, 8, 1);
    expect(result).toEqual({ value: 123 });
    expect(repository.findByCriteria).toHaveBeenCalledWith(2018, 8, 1);
  });

  it('指定された条件に一致するデータが存在しない場合、NotFoundException をスローすべき', async () => {
    (repository.findByCriteria as jest.Mock).mockResolvedValue([]);

    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      '指定された条件に一致するデータが見つかりませんでした',
    );
    expect(repository.findByCriteria).toHaveBeenCalledWith(2018, 8, 1);
  });

  it('データ内に値が存在しない場合、NotFoundException をスローすべき (value が undefined)', async () => {
    const mockDataUndefined = [
      {
        data: {
          result: {
            years: [
              {
                value: undefined,
              },
            ],
          },
        },
      },
    ];
    (repository.findByCriteria as jest.Mock).mockResolvedValue(
      mockDataUndefined,
    );

    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      'データ内に値が見つかりませんでした',
    );
    expect(repository.findByCriteria).toHaveBeenCalledWith(2018, 8, 1);
  });

  it('データ内に値が存在しない場合、NotFoundException をスローすべき (value が null)', async () => {
    const mockDataNull = [
      {
        data: {
          result: {
            years: [
              {
                value: null,
              },
            ],
          },
        },
      },
    ];
    (repository.findByCriteria as jest.Mock).mockResolvedValue(mockDataNull);

    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      'データ内に値が見つかりませんでした',
    );
    expect(repository.findByCriteria).toHaveBeenCalledWith(2018, 8, 1);
  });

  it('リポジトリの呼び出し中にエラーが発生した場合、エラーをそのままスローすべき', async () => {
    const mockError = new Error('データベースエラー');
    (repository.findByCriteria as jest.Mock).mockRejectedValue(mockError);

    await expect(service.getEstateTransactionData(2018, 8, 1)).rejects.toThrow(
      mockError,
    );
    expect(repository.findByCriteria).toHaveBeenCalledWith(2018, 8, 1);
  });
});
