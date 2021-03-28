import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'fs';

const httpsOptions: HttpsOptions = {
  key: fs.readFileSync('/etc/ssl/sauf-backend.key'),
  cert: fs.readFileSync('/etc/ssl/sauf-backend.crt'),
};

async function bootstrap() {


  const app: INestApplication = await NestFactory.create(AppModule);

  console.log(process.cwd());

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('rate-my-wine')
    .setVersion('1.0')
    .addTag('wines')
    .setContact('Thomas Mayer', '', 'thomas.mayer@imato.de')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();