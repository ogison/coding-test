import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResasService } from './use-cases/resas.service';
import { ResasController } from './controllers/resas.controller';
import { AppController } from './controllers/app.controller';
import { AppService } from './use-cases/app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, ResasController],
  providers: [AppService, ResasService],
})
export class AppModule {}
