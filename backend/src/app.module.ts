import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { WinesModule } from './wines/wines.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '/etc/sauf/environment.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService],
    }),

    WinesModule],
  controllers: [AppController]
})
export class AppModule {
}
