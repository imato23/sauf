import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

//import { version } from '../package.json';

/**
 * Throws an exception if not all required environment variables are set.
 * @param configService - The config service
 */
function ensureRequiredEnvironmentVariablesAreSet(
  configService: ConfigService,
): void {
  const requiredEnvironmentVariables = ['MONGODB_URL'];
  requiredEnvironmentVariables.forEach((variableName: string) => {
    if (!configService.get(variableName)) {
      throw new Error(
        `The required environment variable ${variableName} is not set.`,
      );
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get(ConfigService);
  ensureRequiredEnvironmentVariablesAreSet(configService);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('S.A.U.F')
    .setDescription('Private wine cellar management')
    .setVersion('')
    .addTag('wines')
    .setContact('Thomas Mayer', '', 'thomas.mayer@imato.de')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
