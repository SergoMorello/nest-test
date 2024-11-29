import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppValidation from './app.validation';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
	.setTitle('Notes API')
	.setDescription('The notes API description')
	.setVersion('1.0')
	.build();
	
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.setGlobalPrefix('api/v1')
	
	app.useGlobalPipes(AppValidation());
	app.enableCors({
		origin: 'http://127.0.0.1:8000',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	  });
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
