import { Injectable } from '@nestjs/common';
import { VintageInfosService } from './vintage-infos.service';
import { BottleHistoryService } from './bottle-history.service';
import { WinesService } from './wines.service';
import { StorageLocationDto } from './dtos/storage-location.dto';
import { Wine, WineDocument } from './schemas/wine.schema';
import { VintageInfo } from './schemas/vintage-info.schema';
import { Model } from 'mongoose';
import { StorageLocation } from './schemas/storage-location.schema';

@Injectable()
export class StorageLocationsService {
  constructor(
    private vintageInfosService: VintageInfosService,
    private bottleHistoryService: BottleHistoryService,
    private winesService: WinesService,
  ) {}

  async removeStorageLocation(
    wineId: string,
    vintage: number,
    storageLocationDto: StorageLocationDto,
  ): Promise<Wine> {
    const vintageInfo: VintageInfo =
      await this.vintageInfosService.getVintageInfoByVintage(wineId, vintage);

    const index: number = vintageInfo.storageLocations.findIndex(
      (storageLocation: StorageLocation) =>
        storageLocation.row === storageLocationDto.row &&
        storageLocation.shelf === storageLocationDto.shelf,
    );

    if (index === -1) {
      return;
    }

    vintageInfo.storageLocations.splice(index, 1);

    //this.bottleHistoryService.logBottlesRemoved(vintageInfo, 1);

    return await this.vintageInfosService.updateVintageInfo(
      wineId,
      vintage,
      vintageInfo,
    );
  }

  async storageLocationsExist(
    excludedWineId: string,
    excludedVintage: number,
    storageLocationDtos: StorageLocationDto[],
  ): Promise<boolean> {
    const wines: Wine[] = await this.winesService.getAllWines();

    for (const wine of wines) {
      for (const vintageInfo of wine.vintageInfos) {
        const wineModel: WineDocument = new Model<Wine>(wine);

        if (
          wineModel.id === excludedWineId &&
          vintageInfo.vintage === +excludedVintage
        ) {
          // Ignore the excluded wine and vintage
          continue;
        }

        for (const storageLocationToValidate of storageLocationDtos) {
          if (
            vintageInfo.storageLocations.some(
              (storageLocation: StorageLocation) =>
                storageLocation.row === storageLocationToValidate.row &&
                storageLocation.shelf === storageLocationToValidate.shelf,
            )
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  async getNextAvailableStorageLocation(
    excludedStorageLocations: StorageLocationDto[],
  ): Promise<StorageLocationDto> {
    const maxRows = 19;
    const shelvesPerRow = 6;

    const occupiedStorageLocations: StorageLocationDto[] =
      await this.getOccupiedStorageLocations();

    for (let row = 1; row <= maxRows; row++) {
      const occupiedStorageLocationsInRow: StorageLocationDto[] =
        occupiedStorageLocations.filter(
          (storageLocation: StorageLocationDto) => storageLocation.row === row,
        );

      if (occupiedStorageLocationsInRow.length >= shelvesPerRow) {
        // All shelves in row are already occupied, continue with next row
        continue;
      }

      for (let shelf = 1; shelf <= shelvesPerRow; shelf++) {
        if (
          occupiedStorageLocationsInRow.some(
            (storageLocation: StorageLocationDto) =>
              storageLocation.shelf === shelf,
          )
        ) {
          continue;
        }

        if (
          excludedStorageLocations.some(
            (storageLocation: StorageLocationDto) =>
              storageLocation.row === row && storageLocation.shelf === shelf,
          )
        ) {
          continue;
        }

        return { row: row, shelf: shelf };
      }
    }

    return null;
  }

  private async getOccupiedStorageLocations(): Promise<StorageLocation[]> {
    const wines: Wine[] = await this.winesService.getAllWines();

    const storageLocations: StorageLocation[] = wines.flatMap((wine: Wine) =>
      wine.vintageInfos.flatMap(
        (vintageInfo: VintageInfo) => vintageInfo.storageLocations,
      ),
    );

    return storageLocations.sort(
      (a: StorageLocation, b: StorageLocation): number =>
        this.compareStorageLocations(a, b),
    );
  }

  private compareStorageLocations(
    a: StorageLocation,
    b: StorageLocation,
  ): number {
    if (a.row < b.row) {
      return -1;
    }

    if (a.row > b.row) {
      return 1;
    }

    return a.shelf < b.shelf ? -1 : 1;
  }
}
