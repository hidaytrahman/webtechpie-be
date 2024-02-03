import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolutionsModule } from './features/solutions/solutions.module';

@Module({
  imports: [SolutionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
