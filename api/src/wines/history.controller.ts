import { Controller, Get } from '@nestjs/common';
import { BottleHistoryEntryDto } from './dtos/bottle-history-entry.dto';
import { BottleHistoryService } from './bottle-history.service';

@Controller('history')
export class HistoryController {
  constructor(private bottleHistoryService: BottleHistoryService) {}

  @Get()
  async getHistory(): Promise<BottleHistoryEntryDto[]> {
    return this.bottleHistoryService.getHistory();
  }
}
