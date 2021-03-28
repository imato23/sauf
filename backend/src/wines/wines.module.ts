import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WineSchema } from './schemas/wine.schema';
import { WineService } from './wine.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Wine', schema: WineSchema }])],
  controllers: [WinesController],
  providers: [WineService]
})
export class WinesModule { }
