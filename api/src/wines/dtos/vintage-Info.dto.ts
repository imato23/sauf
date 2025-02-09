import { BottleHistoryEntryDto } from './bottle-history-entry.dto';
import { StorageLocationDto } from './storage-location.dto';

export class VintageInfoDto {
  readonly vintage: number;
  readonly bottleCount: number;
  readonly price: number;
  readonly alcoholicStrength: number;
  readonly residualSugar: number;
  readonly tartaricAcid: number;
  readonly storageLocations: StorageLocationDto[];
  readonly history: BottleHistoryEntryDto[];
}
