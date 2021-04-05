import { StorageLocationDto } from './storage-location.dto';

export class VintageInfoDto {
    vintage: number;
    bottleCount: number;
    price: number;
    alcoholicStrength: number;
    residualSugar: number;
    tartaricAcid: number;
    storageLocations: StorageLocationDto[];
}