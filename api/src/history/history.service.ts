import { Injectable } from '@nestjs/common';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';
import { Aggregate, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wine } from '../wines/schemas/wine.schema';
import { HistoryFilterDto } from './dtos/history-filter.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(Wine.name) private readonly wineModel: Model<Wine>,
  ) {}

  async getHistory(filter: HistoryFilterDto): Promise<BottleHistoryEntryDto[]> {
    const pipeline: Aggregate<Array<any>> = this.wineModel.aggregate();

    if (filter?.wineName) {
      pipeline.match({ name: { $regex: new RegExp(filter.wineName, 'i') } });
    }
    if (filter?.producer) {
      pipeline.match({ producer: filter.producer });
    }

    pipeline
      .unwind('$vintageInfos')
      .unwind('$vintageInfos.history')
      .project({
        _id: 0, // _id is removed from the result
        producer: '$producer',
        wineName: '$name',
        category: '$category',
        date: '$vintageInfos.history.date',
        action: '$vintageInfos.history.action',
        bottleCount: '$vintageInfos.history.bottleCount',
      })
      .sort({ date: -1 });

    return pipeline.exec();
  }
}
