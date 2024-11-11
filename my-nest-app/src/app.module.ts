import { Module } from '@nestjs/common';
import { ResasModule } from './resas.module';

@Module({
  imports: [ResasModule],
})
export class AppModule {}
