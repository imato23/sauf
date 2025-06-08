import { Injectable } from '@nestjs/common';
import { VintageInfoDto } from './dtos/vintage-Info.dto';
import { CreateBottleHistoryEntryDto } from './dtos/create-bottle-history-entry.dto';
import { BottleActionDto } from './dtos/bottle-action.dto';

@Injectable()
export class BottleLogService {
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
