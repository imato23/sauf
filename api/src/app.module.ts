import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WinesModule } from './wines/wines.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '/etc/sauf/environment.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB.URI'),
      }),
      inject: [ConfigService],
    }),
    WinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
