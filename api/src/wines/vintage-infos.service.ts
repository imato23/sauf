import { Injectable, NotFoundException } from '@nestjs/common';
import { WinesService } from './wines.service';
import { BottleHistoryService } from './bottle-history.service';
import { UpdateWineDto } from './dtos/update-wine.dto';
import { WineDto } from './dtos/wine.dto';
import { VintageInfoDto } from './dtos/vintage-Info.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class VintageInfosService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private wineService: WinesService,
    private bottleHistoryService: BottleHistoryService,
  ) {}

  async getAllVintageInfos(wineId: string): Promise<VintageInfoDto[]> {
    const wine: WineDto = await this.wineService.getWineById(wineId);

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
  ): Promise<VintageInfoDto> {
    const wine: WineDto = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const vintageInfo: VintageInfoDto = wine.vintageInfos.filter(
      (vintageInfo: VintageInfoDto) => vintageInfo.vintage === +vintage,
    )[0];

    if (!vintageInfo) {
      throw new NotFoundException(
        `The vintage '${vintage}' does not exist for the wine with id '${wineId}'.`,
      );
    }

    return vintageInfo;
  }

  async addVintageInfo(
    wineId: string,
    vintageInfo: VintageInfoDto,
  ): Promise<VintageInfoDto> {
    let wine: WineDto = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const addedBottlesCount: number = vintageInfo.storageLocations.length;

    if (addedBottlesCount > 0) {
      this.bottleHistoryService.logBottlesAdded(vintageInfo, addedBottlesCount);
    }

    wine.vintageInfos.push(<VintageInfoDto>(<unknown>vintageInfo));

    wine = await this.wineService.updateWine(
      wineId,
      <UpdateWineDto>(<unknown>wine),
    );
    return wine.vintageInfos.filter(
      (vintageInfo: VintageInfoDto) =>
        vintageInfo.vintage === vintageInfo.vintage,
    )[0];
  }

  async updateVintageInfo(
    wineId: string,
    vintage: number,
    vintageInfo: VintageInfoDto,
  ): Promise<WineDto> {
    const wine: WineDto = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const vintageInfoFromDb: VintageInfoDto = wine.vintageInfos.filter(
      (vintageInfo: VintageInfoDto) => vintageInfo.vintage === +vintage,
    )[0];

    if (!vintageInfoFromDb) {
      throw new NotFoundException(
        `The vintage '${vintage}' does not exist on wine with id '${wineId}'.`,
      );
    }

    this.logBottleChanges(vintageInfoFromDb, vintageInfo);

    this.mapper.mutate(
      vintageInfo,
      vintageInfoFromDb,
      VintageInfoDto,
      VintageInfoDto,
    );

    // vintageInfoFromDb.price = updateVintageInfoDto.price;
    // vintageInfoFromDb.tartaricAcid = updateVintageInfoDto.tartaricAcid;
    // vintageInfoFromDb.alcoholicStrength =
    //   updateVintageInfoDto.alcoholicStrength;
    // vintageInfoFromDb.price = updateVintageInfoDto.price;
    // vintageInfoFromDb.residualSugar = updateVintageInfoDto.residualSugar;
    // vintageInfoFromDb.storageLocations = <StorageLocation[]>(
    //   updateVintageInfoDto.storageLocations
    // );

    return await this.wineService.updateWine(
      wineId,
      <UpdateWineDto>(<unknown>wine),
    );
  }

  async removeVintageInfo(wineId: string, vintage: number): Promise<WineDto> {
    const wine: WineDto = await this.wineService.getWineById(wineId);

    if (!wine) {
      throw new NotFoundException(
        `The wine with id '${wineId}' does not exist.`,
      );
    }

    const index: number = wine.vintageInfos.findIndex(
      (x) => x.vintage === +vintage,
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

  logBottleChanges(
    oldVintageInfo: VintageInfoDto,
    newVintageInfo: VintageInfoDto,
  ): void {
    const difference: number =
      newVintageInfo.storageLocations.length -
      oldVintageInfo.storageLocations.length;

    if (difference === 0) {
      // Bottles have not changed
      return;
    }

    if (difference > 0) {
      // new bottles count > old bottles count => bottles have been added
      this.bottleHistoryService.logBottlesAdded(oldVintageInfo, difference);
    } else {
      // new bottles count < old bottles count => bottles have been removed
      this.bottleHistoryService.logBottlesRemoved(
        oldVintageInfo,
        Math.abs(difference),
      );
    }
  }
}
