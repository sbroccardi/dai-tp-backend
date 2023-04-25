import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('ScreenSpace API')
    .setDescription('The ScreenSpace API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('movies')
    .addTag('screenings')
    .addTag('cinemas')
    .addTag('auditoriums')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();