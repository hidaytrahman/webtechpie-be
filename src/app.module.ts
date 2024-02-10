import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SolutionsModule } from "./features/solutions/solutions.module";
import { TeamsModule } from "./features/teams/teams.module";
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware";
import { PagesModule } from "./features/pages/pages.module";
import { CoreModule } from "./features/core/core.module";
import { PlanModule } from "./features/plan/plan.module";
import { PlanServices } from "./features/plan/plan.services";
import { Plan, PlanSchema } from "./features/plan/plan.schema";
import { HttpExceptionFilter } from "./config/http-exception.filter";

@Module({
	imports: [
		// env variables
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		// database config
		MongooseModule.forRoot(`${process.env.DATABSE_URL}`),
		MongooseModule.forFeatureAsync([
			{
				name: Plan.name,
				useFactory: () => {
					const schema = PlanSchema;
					schema.pre("save", function () {
						// console.log("Hello from pre save");
					});
					return schema;
				},
			},
		]),

		// feature modules
		SolutionsModule,
		TeamsModule,
		PagesModule,
		CoreModule,
		PlanModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		AppService,
		PlanServices,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("*"); // currently log enables for all
	}
}
