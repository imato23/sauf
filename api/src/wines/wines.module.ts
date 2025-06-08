import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { WinesService } from './wines.service';
import { VintageInfosController } from './vintage-infos.controller';
import { StorageLocationsController } from './storage-locations.controller';
import { StorageLocationsService } from './storage-locations.service';
import { VintageInfosService } from './vintage-infos.service';
import { BottleLogService } from './bottle-log.service';
import { WineProfile } from './mapper-profiles/wine-profile';
import { MongooseModule } from '@nestjs/mongoose';
import { Wine, WineSchema } from './schemas/wine.schema';

@Module({
  controllers: [
    WinesController,
    VintageInfosController,
    StorageLocationsController,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Wine.name, schema: WineSchema }]),
  ],
  providers: [
    WinesService,
    StorageLocationsService,
    VintageInfosService,
    BottleLogService,
    WineProfile,
  ],
})
export class WinesModule {}
