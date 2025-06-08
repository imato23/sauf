import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { WinesService } from './wines.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wine, WineSchema } from './schemas/wine.schema';
import {
  BottleHistoryEntry,
  BottleHistoryEntrySchema,
} from './schemas/bottle-history.schema';
import { VintageInfosController } from './vintage-infos.controller';
import { StorageLocationsController } from './storage-locations.controller';
import { StorageLocationsService } from './storage-locations.service';
import { VintageInfosService } from './vintage-infos.service';
import { BottleHistoryService } from './bottle-history.service';
import { WineProfile } from './mapper-profiles/wine-profile';
import { HistoryController } from './history.controller';

@Module({
  controllers: [
    WinesController,
    VintageInfosController,
    StorageLocationsController,
    HistoryController,
  ],
  imports: [
    MongooseModule.forFeature([{ name: Wine.name, schema: WineSchema }]),
    MongooseModule.forFeature([
      { name: BottleHistoryEntry.name, schema: BottleHistoryEntrySchema },
    ]),
  ],
  providers: [
    WinesService,
    StorageLocationsService,
    VintageInfosService,
    BottleHistoryService,
    WineProfile,
  ],
})
export class WinesModule {}
