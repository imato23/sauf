import { Module } from '@nestjs/common';
import { WinesController } from './wines.controller';
import { WinesService } from './wines.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wine, WineSchema } from './schemas/wine.schema';
import {
  BottleHistoryEntry,
  BottleHistoryEntrySchema,
} from './schemas/bottle-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wine.name, schema: WineSchema }]),
    MongooseModule.forFeature([
      { name: BottleHistoryEntry.name, schema: BottleHistoryEntrySchema },
    ]),
  ],
  controllers: [WinesController],
  providers: [WinesService],
})
export class WinesModule {}
