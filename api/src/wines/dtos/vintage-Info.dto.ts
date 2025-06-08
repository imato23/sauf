import { AutoMap } from '@automapper/classes';
import { BottleHistoryEntryDto } from '../../history/dtos/bottle-history-entry.dto';
import { StorageLocationDto } from './storage-location.dto';
import { CreateBottleHistoryEntryDto } from './create-bottle-history-entry.dto';

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
  history: CreateBottleHistoryEntryDto[];
}
