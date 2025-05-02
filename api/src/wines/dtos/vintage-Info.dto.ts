import { AutoMap } from '@automapper/classes';
import { BottleHistoryEntryDto } from './bottle-history-entry.dto';
import { StorageLocationDto } from './storage-location.dto';

export class VintageInfoDto {
  @AutoMap()
  readonly vintage: number;

  readonly bottleCount: number;

  @AutoMap()
  readonly price: number;

  @AutoMap()
  readonly alcoholicStrength: number;

  @AutoMap()
  readonly residualSugar: number;

  @AutoMap()
  readonly tartaricAcid: number;

  @AutoMap(() => StorageLocationDto)
  readonly storageLocations: StorageLocationDto[];

  @AutoMap(() => BottleHistoryEntryDto)
  readonly history: BottleHistoryEntryDto[];
}
