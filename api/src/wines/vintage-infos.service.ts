import { Injectable, NotFoundException } from '@nestjs/common';
import { WinesService } from './wines.service';
import { BottleHistoryService } from './bottle-history.service';
import { VintageInfo } from './schemas/vintage-info.schema';
import { Wine } from './schemas/wine.schema';
import { UpdateWineDto } from './dtos/update-wine.dto';
import { StorageLocation } from './schemas/storage-location.schema';
import { CreateVintageInfoDto } from './dtos/create-vintage-info.dto';
import { UpdateVintageInfoDto } from './dtos/update-vintage-info.dto';

@Injectable()
export class VintageInfosService {
  constructor(
    private wineService: WinesService,
    private bottleHistoryService: BottleHistoryService,
  ) {}

  async getAllVintageInfos(wineId: string): Promise<VintageInfo[]> {
    const wine: Wine = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    return wine.vintageInfos;
  }

  async getVintageInfoByVintage(
    wineId: string,
    vintage: number,
  ): Promise<VintageInfo> {
    const wine: Wine = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const vintageInfo: VintageInfo = wine.vintageInfos.filter(
      (vintageInfo: VintageInfo) => vintageInfo.vintage === vintage,
    )[0];

    if (!vintageInfo) {
      throw new NotFoundException(
        `The vintage '${vintage}' does not exist in the wine with id '${wineId}'.`,
      );
    }

    return vintageInfo;
  }

  async addVintageInfo(
    wineId: string,
    createVintageInfoDto: CreateVintageInfoDto,
  ): Promise<VintageInfo> {
    let wine: Wine = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    // const addedBottlesCount: number =
    //   createVintageInfoDto.storageLocations.length;
    //
    // if (addedBottlesCount > 0) {
    //   this.bottleHistoryService.logBottlesAdded(
    //     createVintageInfoDto,
    //     addedBottlesCount,
    //   );
    // }

    wine.vintageInfos.push(<VintageInfo>(<unknown>createVintageInfoDto));

    wine = await this.wineService.updateWine(
      wineId,
      <UpdateWineDto>(<unknown>wine),
    );
    return wine.vintageInfos.filter(
      (vintageInfo: VintageInfo) =>
        vintageInfo.vintage === createVintageInfoDto.vintage,
    )[0];
  }

  async updateVintageInfo(
    wineId: string,
    vintage: number,
    updateVintageInfoDto: UpdateVintageInfoDto,
  ): Promise<Wine> {
    const wine: Wine = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const vintageInfoFromDb: VintageInfo = wine.vintageInfos.filter(
      (vintageInfo: VintageInfo) => vintageInfo.vintage == vintage,
    )[0];

    //this.logBottleChanges(vintageInfoFromDb, updateVintageInfoDto);

    vintageInfoFromDb.price = updateVintageInfoDto.price;
    vintageInfoFromDb.tartaricAcid = updateVintageInfoDto.tartaricAcid;
    vintageInfoFromDb.alcoholicStrength =
      updateVintageInfoDto.alcoholicStrength;
    vintageInfoFromDb.price = updateVintageInfoDto.price;
    vintageInfoFromDb.residualSugar = updateVintageInfoDto.residualSugar;
    vintageInfoFromDb.storageLocations = <StorageLocation[]>(
      updateVintageInfoDto.storageLocations
    );

    return await this.wineService.updateWine(
      wineId,
      <UpdateWineDto>(<unknown>wine),
    );
  }

  async removeVintageInfo(wineId: string, vintage: number): Promise<Wine> {
    const wine: Wine = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const index: number = wine.vintageInfos.findIndex(
      (x) => x.vintage == vintage,
    );

    if (index === -1) {
      return;
    }

    wine.vintageInfos.splice(index, 1);

    return await this.wineService.updateWine(
      wineId,
      <UpdateWineDto>(<unknown>wine),
    );
  }

  // logBottleChanges(
  //   oldVintageInfo: VintageInfo,
  //   newVintageInfo: VintageInfo,
  // ): void {
  //   const difference: number =
  //     newVintageInfo.storageLocations.length -
  //     oldVintageInfo.storageLocations.length;
  //
  //   if (difference === 0) {
  //     // Bottles have not changed
  //     return;
  //   }
  //
  //   if (difference > 0) {
  //     // new bottles count > old bottles count => bottles have been added
  //     this.bottleHistoryService.logBottlesAdded(oldVintageInfo, difference);
  //   } else {
  //     // new bottles count < old bottles count => bottles have been removed
  //     this.bottleHistoryService.logBottlesRemoved(
  //       oldVintageInfo,
  //       Math.abs(difference),
  //     );
  //   }
  // }
}
