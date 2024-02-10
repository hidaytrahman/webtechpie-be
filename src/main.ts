import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { allowedOrigins } from "./utils/data";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./config/all-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// base url prefix config
	app.setGlobalPrefix("api/v1/");

	// cors enable
	app.enableCors({
		origin: allowedOrigins,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		// "preflightContinue": false,
		// "optionsSuccessStatus": 204
	});

	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalFilters(new AllExceptionsFilter(app.getHttpAdapter()));

	await app.listen(8080);
}
bootstrap();
