import { StorageLocation } from '../schemas/storage-location.schema';
import { AutoMap } from '@automapper/classes';

export class UpdateVintageInfoDto {
  @AutoMap()
  readonly vintage: number;

  @AutoMap()
  readonly price: number;

  @AutoMap()
  readonly alcoholicStrength: number;

  @AutoMap()
  readonly residualSugar: number;

  @AutoMap()
  readonly tartaricAcid: number;

  @AutoMap()
  readonly storageLocations: StorageLocation[];
}
