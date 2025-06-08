import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wine, WineSchema } from '../wines/schemas/wine.schema';

@Module({
  controllers: [HistoryController],
  imports: [
    MongooseModule.forFeature([{ name: Wine.name, schema: WineSchema }]),
  ],
  providers: [HistoryService],
})
export class HistoryModule {}
