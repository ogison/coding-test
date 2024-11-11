import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ResasModule } from 'src/resas.module';

describe('ResasController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ResasModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEstateTransactionData', () => {
    it('有効なクエリパラメータの場合に200を返す', async () => {
      return request(app.getHttpServer())
        .get('/townPlanning/estateTransaction/bar')
        .query({ year: 2018, prefectureCode: '8', type: '1' })
        .expect(200)
        .expect({ value: 20918 });
    });

    it('クエリパラメータにyearが含まれない場合に400エラーを返す', async () => {
      return request(app.getHttpServer())
        .get('/townPlanning/estateTransaction/bar')
        .query({ prefectureCode: '8', type: '1' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('year should not be empty');
          expect(res.body.message).toContain(
            'year must not be greater than 2018',
          );
          expect(res.body.message).toContain('year must not be less than 2015');
          expect(res.body.message).toContain('year must be an integer number');
        });
    });
    it('クエリパラメータにprefectureCodeが含まれない場合に400エラーを返す', async () => {
      return request(app.getHttpServer())
        .get('/townPlanning/estateTransaction/bar')
        .query({ year: 2018, type: '1' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(
            'prefectureCode should not be empty',
          );
          expect(res.body.message).toContain(
            'prefectureCode must not be greater than 14',
          );
          expect(res.body.message).toContain(
            'prefectureCode must not be less than 8',
          );
          expect(res.body.message).toContain(
            'prefectureCode must be an integer number',
          );
        });
    });
    it('クエリパラメータにtypeが含まれない場合に400エラーを返す', async () => {
      return request(app.getHttpServer())
        .get('/townPlanning/estateTransaction/bar')
        .query({ year: 2018, prefectureCode: '8' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('type should not be empty');
          expect(res.body.message).toContain(
            'type must be one of the following values: 1, 2',
          );
          expect(res.body.message).toContain('type must be an integer number');
        });
    });
    it('無効なクエリパラメータが送信された場合に400エラーを返す', async () => {
      return request(app.getHttpServer())
        .get('/townPlanning/estateTransaction/bar')
        .query({ year: 2019, prefectureCode: '7', type: '3' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(
            'year must not be greater than 2018',
          );
          expect(res.body.message).toContain(
            'prefectureCode must not be less than 8',
          );
          expect(res.body.message).toContain(
            'type must be one of the following values: 1, 2',
          );
        });
    });
    it('無効なクエリパラメータが送信された場合に400エラーを返す', async () => {
      return request(app.getHttpServer())
        .get('/townPlanning/estateTransaction/bar')
        .query({ year: 2014, prefectureCode: '15', type: '2' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('year must not be less than 2015');
          expect(res.body.message).toContain(
            'prefectureCode must not be greater than 14',
          );
        });
    });
  });
});
