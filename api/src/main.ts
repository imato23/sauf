import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('S.A.U.F')
    .setDescription('Private wine cellar management')
    .setVersion('1.0')
    .addTag('wines')
    .setContact('Thomas Mayer', '', 'thomas.mayer@imato.de')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
