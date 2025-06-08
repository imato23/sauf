import { Injectable } from '@nestjs/common';
import { VintageInfoDto } from './dtos/vintage-Info.dto';
import { CreateBottleHistoryEntryDto } from './dtos/create-bottle-history-entry.dto';
import { BottleActionDto } from './dtos/bottle-action.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wine } from './schemas/wine.schema';
import { Model, PipelineStage } from 'mongoose';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';
import { WineListFilterDto } from './dtos/wine-list-filter.dto';

@Injectable()
export class BottleHistoryService {
  constructor(
    @InjectModel(Wine.name) private readonly wineModel: Model<Wine>,
  ) {}

  async getHistory(
    filter: WineListFilterDto,
  ): Promise<BottleHistoryEntryDto[]> {
    const pipeline: PipelineStage[] = [];
    const matchStage: Record<string, any> = {};

    if (filter?.wineName) {
      matchStage['name'] = { $regex: new RegExp(filter.wineName, 'i') };
    }

    if (filter?.producer) {
      matchStage['producer'] = filter.producer;
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Aggregation Pipeline
    pipeline.push(
      { $unwind: '$vintageInfos' },
      { $unwind: '$vintageInfos.history' },
      {
        $project: {
          _id: 0,
          producer: '$producer',
          wineName: '$name',
          category: '$category',
          date: '$vintageInfos.history.date',
          action: '$vintageInfos.history.action',
          bottleCount: '$vintageInfos.history.bottleCount',
        },
      },
      { $sort: { date: -1 } },
    );

    return this.wineModel.aggregate(pipeline).exec();
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
