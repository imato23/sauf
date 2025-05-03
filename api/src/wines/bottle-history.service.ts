import { Injectable } from '@nestjs/common';
import { VintageInfoDto } from './dtos/vintage-Info.dto';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';
import { BottleActionDto } from './dtos/bottle-action.dto';

@Injectable()
export class BottleHistoryService {
  constructor() {}

  logBottlesRemoved(
    vintageInfo: VintageInfoDto,
    bottlesCount: number,
  ): BottleHistoryEntryDto {
    if (!vintageInfo.history) {
      vintageInfo.history = [];
    }

    const historyEntry: BottleHistoryEntryDto = {
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
  ): BottleHistoryEntryDto {
    if (!vintageInfo.history) {
      vintageInfo.history = [];
    }

    const historyEntry: BottleHistoryEntryDto = {
      action: BottleActionDto.bottlesAdded,
      bottleCount: bottlesCount,
      date: new Date(),
    };

    vintageInfo.history.push(historyEntry);

    return historyEntry;
  }
}
