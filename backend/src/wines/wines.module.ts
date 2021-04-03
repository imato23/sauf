import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WineSchema } from './schemas/wine.schema';
import { WineService } from './wine.service';
import { VintageInfosController } from './vintage-infos.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Wine', schema: WineSchema }])],
  controllers: [WinesController, VintageInfosController],
  providers: [WineService]
})
export class WinesModule { }
