import { StorageLocation } from './storage-location.model';

export interface VintageInfo {
    vintage: number;
    numberOfBottles: number;
    price: number;
    alcoholicStrength: number;
    residualSugar: number;
    tartaricAcid: number;
    storageLocations: StorageLocation[];
}
