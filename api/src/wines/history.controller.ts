import { Controller, Get, Query } from '@nestjs/common';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';
import { BottleHistoryService } from './bottle-history.service';
import { WineListFilterDto } from './dtos/wine-list-filter.dto';

@Controller('history')
export class HistoryController {
  constructor(private bottleHistoryService: BottleHistoryService) {}

  @Get()
  async getHistory(
    @Query('wineName') wineName: string,
    @Query('producer') producer: string,
  ): Promise<BottleHistoryEntryDto[]> {
    const filter: WineListFilterDto = {
      wineName: wineName,
      producer: producer,
      category: null,
      onlyAvailableWines: false,
    };

    return this.bottleHistoryService.getHistory(filter);
  }
}
