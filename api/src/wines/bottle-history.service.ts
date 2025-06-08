import { Injectable } from '@nestjs/common';
import { VintageInfoDto } from './dtos/vintage-Info.dto';
import { CreateBottleHistoryEntryDto } from './dtos/create-bottle-history-entry.dto';
import { BottleActionDto } from './dtos/bottle-action.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wine } from './schemas/wine.schema';
import { Model } from 'mongoose';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';

@Injectable()
export class BottleHistoryService {
  constructor(
    @InjectModel(Wine.name) private readonly wineModel: Model<Wine>,
  ) {}

  async getHistory(): Promise<BottleHistoryEntryDto[]> {
    return this.wineModel.aggregate([
      { $unwind: '$vintageInfos' },
      { $unwind: '$vintageInfos.history' },
      {
        $project: {
          producer: '$producer',
          wineName: '$name',
          date: '$vintageInfos.history.date',
          action: '$vintageInfos.history.action',
          bottleCount: '$vintageInfos.history.bottleCount',
        },
      },
      { $sort: { date: -1 } },
    ]);
  }

  logBottlesRemoved(
    vintageInfo: VintageInfoDto,
    bottlesCount: number,
  ): CreateBottleHistoryEntryDto {
    if (!vintageInfo.history) {
      vintageInfo.history = [];
    }

    const historyEntry: CreateBottleHistoryEntryDto = {
      action: BottleActionDto.bottlesRemoved,
      bottleCount: bottlesCount,
      date: new Date(),
    };

    vintageInfo.history.push(historyEntry);

    return historyEntry;
  }

  logBottlesAdded(
    vintageInfo: VintageInfoDto,
    bottlesCount: number,
  ): CreateBottleHistoryEntryDto {
    if (!vintageInfo.history) {
      vintageInfo.history = [];
    }

    const historyEntry: CreateBottleHistoryEntryDto = {
      action: BottleActionDto.bottlesAdded,
      bottleCount: bottlesCount,
      date: new Date(),
    };

    vintageInfo.history.push(historyEntry);

    return historyEntry;
  }
}
