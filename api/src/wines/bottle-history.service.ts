import { Injectable } from '@nestjs/common';

@Injectable()
export class BottleHistoryService {
  constructor() {}

  // async logBottlesRemoved(
  //   wineId: string,
  //   vintage: number,
  //   bottlesCount: number,
  // ): Promise<BottleHistoryEntry> {
  //   const wine: Wine = await this.wineService.getWineById(wineId);
  //
  //   if (!wine) {
  //     throw new NotFoundException(
  //       `The wine with id '${wineId}' does not exist.`,
  //     );
  //   }
  //
  //   const vintageInfo: VintageInfo = wine.vintageInfos.filter(
  //     (vintageInfo) => vintageInfo.vintage == vintage,
  //   )[0];
  //
  //   if (!vintageInfo) {
  //     throw new NotFoundException(
  //       `The vintage '${vintage}' does not exist in the wine with id '${wineId}'.`,
  //     );
  //   }
  //
  //   if (!vintageInfo.history) {
  //     vintageInfo.history = [];
  //   }
  //
  //   const historyEntry: BottleHistoryEntry = {
  //     action: BottleActionDto.bottlesRemoved,
  //     bottleCount: bottlesCount,
  //     date: new Date(),
  //   };
  //
  //   vintageInfo.history.push(historyEntry);
  //
  //   await this.wineService.updateWine(wineId, wine);
  //
  //   return historyEntry;
  // }

  // logBottlesAdded(
  //   wineId: string,
  //   vintage: number,
  //   bottlesCount: number,
  // ): BottleHistoryEntry {
  //   if (!vintageInfo.history) {
  //     vintageInfo.history = [];
  //   }
  //
  //   const historyEntry: BottleHistoryEntryDto = {
  //     action: BottleActionDto.bottlesAdded,
  //     bottleCount: bottlesCount,
  //     date: new Date(),
  //   };
  //
  //   vintageInfo.history.push(historyEntry);
  //
  //   return historyEntry;
  // }
}
