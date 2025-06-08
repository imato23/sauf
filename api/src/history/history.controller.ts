import { Controller, Get, Query } from '@nestjs/common';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';
import { HistoryService } from './history.service';
import { HistoryFilterDto } from './dtos/history-filter.dto';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async getHistory(
    @Query('wineName') wineName: string,
    @Query('producer') producer: string,
  ): Promise<BottleHistoryEntryDto[]> {
    const filter: HistoryFilterDto = {
      wineName: wineName,
      producer: producer,
    };

    return this.historyService.getHistory(filter);
  }
}
