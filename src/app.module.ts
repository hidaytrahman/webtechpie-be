import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SolutionsModule } from "./features/solutions/solutions.module";
import { TeamsModule } from "./features/teams/teams.module";
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware";
import { PagesModule } from "./features/pages/pages.module";
import { CoreModule } from "./features/core/core.module";
import { PlanModule } from "./features/plan/plan.module";
import { Cat, CatSchema } from "./schemas/cat.schema";
import { PlanServices } from "./features/plan/plan.services";

@Module({
	imports: [
		// env variables
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		SolutionsModule,
		TeamsModule,
		PagesModule,
		CoreModule,
		PlanModule,

		// database config
		MongooseModule.forRoot(`${process.env.DATABSE_URL}`),
		MongooseModule.forFeatureAsync([
			{
				name: Cat.name,
				useFactory: () => {
					const schema = CatSchema;
					schema.pre("save", function () {
						console.log("Hello from pre save");
					});

					console.log(process.env.DATABSE_URL);
					return schema;
				},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService, PlanServices],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("*"); // currently log enables for all
	}
}
