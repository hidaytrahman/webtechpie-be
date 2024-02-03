import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SolutionsModule } from './features/solutions/solutions.module';
import { TeamsModule } from './features/teams/teams.module';
import { LoggerMiddleware } from './utils/middlewares/logger.middleware';

@Module({
  imports: [SolutionsModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('teams')
  }
}
