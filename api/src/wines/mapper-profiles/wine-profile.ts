import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { Wine } from '../schemas/wine.schema';
import { WineDto } from '../dtos/wine.dto';
import { VintageInfo } from '../schemas/vintage-info.schema';
import { VintageInfoDto } from '../dtos/vintage-Info.dto';
import { StorageLocation } from '../schemas/storage-location.schema';
import { StorageLocationDto } from '../dtos/storage-location.dto';
import { BottleHistoryEntry } from '../schemas/bottle-history.schema';
import { BottleHistoryEntryDto } from '../dtos/bottle-history-entry.dto';
import { UpdateVintageInfoDto } from '../dtos/update-vintage-info.dto';

@Injectable()
export class WineProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Wine,
        WineDto,
        forMember(
          (dst) => dst.bottleCount,
          mapFrom((src) => this.getBottleCount(src.vintageInfos)),
        ),
        forMember(
          (dst) => dst.id,
          mapFrom((src) => src._id),
        ),
      );
      createMap(
        mapper,
        VintageInfo,
        VintageInfoDto,
        forMember(
          (dst) => dst.bottleCount,
          mapFrom((src) => src.storageLocations.length),
        ),
      );

      createMap(mapper, UpdateVintageInfoDto, VintageInfoDto);
      createMap(mapper, VintageInfoDto, VintageInfoDto);
      createMap(mapper, StorageLocation, StorageLocationDto);
      createMap(mapper, BottleHistoryEntry, BottleHistoryEntryDto);
    };
  }

  private getBottleCount(vintageInfos: VintageInfo[]): number {
    return vintageInfos.reduce(
      (sum: number, vintageInfo: VintageInfo) =>
        sum + vintageInfo.storageLocations.length,
      0,
    );
  }
}
