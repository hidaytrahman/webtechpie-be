import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolutionsModule } from './features/solutions/solutions.module';
import { TeamsModule } from './features/teams/teams.module';

@Module({
  imports: [SolutionsModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
