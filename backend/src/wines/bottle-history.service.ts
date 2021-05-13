import { Injectable } from '@nestjs/common';
import { BottleActionDto } from './dto/bottle-action.dto';
import { BottleHistoryEntryDto } from './dto/bottle-history-entry.dto';
import { VintageInfoDto } from './dto/vintage-info.dto';

@Injectable()
export class BottleHistoryService {
    logBottlesRemoved(vintageInfo: VintageInfoDto, bottlesCount: number): BottleHistoryEntryDto {
        if (!vintageInfo.history) {
            vintageInfo.history = [];
        }

        const historyEntry: BottleHistoryEntryDto = {
            action: BottleActionDto.bottlesRemoved,
            bottleCount: bottlesCount,
            date: new Date()
        }

        vintageInfo.history.push(historyEntry);

        return historyEntry;
    }

    logBottlesAdded(vintageInfo: VintageInfoDto, bottlesCount: number): BottleHistoryEntryDto {
        if (!vintageInfo.history) {
            vintageInfo.history = [];
        }

        const historyEntry: BottleHistoryEntryDto = {
            action: BottleActionDto.bottlesAdded,
            bottleCount: bottlesCount,
            date: new Date()
        }

        vintageInfo.history.push(historyEntry);

        return historyEntry;
    }
}
