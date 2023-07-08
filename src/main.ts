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
    .addTag('auths')
    .addTag('users')
    .addTag('cinemas')
    .addTag('auditoriums')
    .addTag('movies')
    .addTag('screenings')
    .addTag('checkouts')
    .addTag('misc')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
