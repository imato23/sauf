import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StorageLocationsService } from './storage-locations.service';
import { StorageLocation } from './schemas/storage-location.schema';
import { StorageLocationDto } from './dtos/storage-location.dto';
import { WineDto } from './dtos/wine.dto';

@Controller()
export class StorageLocationsController {
  constructor(private storageLocationsService: StorageLocationsService) {}

  @Delete('wines/:wineId/vintage-infos/:vintage/storage-locations/:row/:shelf')
  async removeBottle(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
    @Param('row') row: number,
    @Param('shelf') shelf: number,
  ): Promise<WineDto> {
    return await this.storageLocationsService.removeStorageLocation(
      wineId,
      vintage,
      { row: row, shelf: shelf },
    );
  }

  /**
   * Determines, if any of the specified storage locations already exist in another vintage of the specified wine
   * or in another wine.
   * @param wineId
   * @param vintage
   * @param storageLocations
   * @returns
   */
  @Post('wines/:wineId/vintage-infos/:vintage/storage-locations/exist')
  async storageLocationsExist(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
    @Body() storageLocations: StorageLocation[],
  ): Promise<boolean> {
    return await this.storageLocationsService.storageLocationsExist(
      wineId,
      vintage,
      storageLocations,
    );
  }

  @Get('wines/storage-locations/next-available')
  async getNextAvailableStorageLocation(
    @Query('excludedStorages') excludedStorages: string | string[] = [],
  ): Promise<StorageLocationDto> {
    let excludedStorageLocations: StorageLocationDto[];

    const excludedStoragesArray: string[] =
      this.convertToArray(excludedStorages);

    try {
      excludedStorageLocations = this.convertToStorageLocations(
        excludedStoragesArray,
      );
    } catch {
      throw new BadRequestException(
        'Query params parsing failed',
        'Excluded-storage params could not be parsed',
      );
    }

    const storageLocation =
      await this.storageLocationsService.getNextAvailableStorageLocation(
        excludedStorageLocations,
      );

    if (!storageLocation) {
      throw new NotFoundException(
        'All storage locations are occupied',
        'All storage locations are occupied',
      );
    }

    return storageLocation;
  }

  private convertToArray(excludedStorages: string | string[]) {
    return Array.isArray(excludedStorages)
      ? excludedStorages
      : excludedStorages
        ? [excludedStorages]
        : [];
  }

  private convertToStorageLocations(storages: string[]): StorageLocationDto[] {
    const storageLocations: StorageLocationDto[] = [];

    for (let i = 0; i < storages.length; i++) {
      const storage: string = storages[i];
      const storageArray: string[] = storage.split(',');

      if (storageArray.length !== 2) {
        throw new Error(
          `The storage string '${storage}' has an invalid format`,
        );
      }

      storageLocations.push({ row: +storageArray[0], shelf: +storageArray[1] });
    }

    return storageLocations;
  }
}
