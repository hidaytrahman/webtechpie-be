import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { allowedOrigins } from "./utils/data"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix("api/v1/")

	app.enableCors({
		origin: allowedOrigins,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		// "preflightContinue": false,
		// "optionsSuccessStatus": 204
	})

	await app.listen(8080)
}
bootstrap()
