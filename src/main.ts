import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Gen CRM')
    .setDescription(
      'Projeto Prático Generation Brasil - Criado pelo Grupo 03 - Alexandra L, Flavio T, Juliana V, Larissa T, Leticia F, Luana S, Samuel S',
    )
    .setContact(
      'Grupo 03',
      'https://github.com/Grupo-03-Turma-JavaScript-07',
      'grupogeneration03@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
