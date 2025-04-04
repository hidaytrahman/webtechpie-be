import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { allowedOrigins } from "./utils/data";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./config/all-exception.filter";
import { APP_CONFIG } from "./config/app.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// base url prefix config
	app.setGlobalPrefix(APP_CONFIG.PREFIX);

	// cors enable
	app.enableCors({
		origin: allowedOrigins,
		methods: APP_CONFIG.METHODS,
		// "preflightContinue": false,
		// "optionsSuccessStatus": 204
	});

	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalFilters(new AllExceptionsFilter(app.getHttpAdapter()));

	const config = new DocumentBuilder()
		.setTitle('WebTechPie API')
		.setDescription('The WebTechPie API documentation')
		.setVersion('1.0')
		.addTag('auth', 'Authentication endpoints')
		.addTag('contact', 'Contact form endpoints')
		.addTag('solutions', 'Solutions endpoints')
		.addTag('teams', 'Teams endpoints')
		.addTag('pages', 'Pages endpoints')
		.addTag('plan', 'Plan endpoints')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(process.env.PORT || 8080);
}
bootstrap();
