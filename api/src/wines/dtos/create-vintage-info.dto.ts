import { StorageLocation } from '../schemas/storage-location.schema';

export class CreateVintageInfoDto {
  readonly vintage: number;
  readonly price: number;
  readonly alcoholicStrength: number;
  readonly residualSugar: number;
  readonly tartaricAcid: number;
  readonly storageLocations: StorageLocation[];
}
