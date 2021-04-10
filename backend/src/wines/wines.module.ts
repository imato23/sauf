import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WineSchema } from './schemas/wine.schema';
import { WineService } from './wine.service';
import { VintageInfosController } from './vintage-infos.controller';
import { VintageInfoService } from './vintage-info.service';
import { MapperService } from './mapper.service';
import { StorageLocationController } from './storage-location.controller';
import { StorageLocationService } from './storage-location.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Wine', schema: WineSchema }])],
  controllers: [WinesController, VintageInfosController, StorageLocationController],
  providers: [WineService, VintageInfoService, MapperService, StorageLocationService]
})
export class WinesModule { }
