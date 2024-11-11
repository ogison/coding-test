import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResasService } from './use-cases/resas.service';
import { ResasController } from './controllers/resas.controller';
import { RESAS_REPOSITORY } from './repositories/resas.repository';
import { ResasRepositoryImpl } from './infrastrucure/resas.repository.impl';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [ResasController],
  providers: [
    ResasService,
    {
      provide: RESAS_REPOSITORY,
      useClass: ResasRepositoryImpl,
    },
  ],
})
export class ResasModule {}
