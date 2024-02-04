import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { SolutionsModule } from "./features/solutions/solutions.module"
import { TeamsModule } from "./features/teams/teams.module"
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware"
import { PagesModule } from "./features/pages/pages.module"
import { CoreModule } from "./features/core/core.module"
import { PlanModule } from "./features/plan/plan.module"

@Module({
	imports: [
		SolutionsModule,
		TeamsModule,
		PagesModule,
		CoreModule,
		PlanModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("*") // currently log enables for all
	}
}
