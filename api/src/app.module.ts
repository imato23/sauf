import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WinesModule } from './wines/wines.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    //ConfigModule.forRoot({ envFilePath: '/etc/sauf/environment.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    WinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
