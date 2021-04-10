import { Injectable } from '@nestjs/common';
import { StorageLocationDto } from './dto/storage-location.dto';
import { VintageInfoService } from './vintage-info.service';
import { VintageInfoDto } from './dto/vintage-info.dto';

@Injectable()
export class StorageLocationService {
    constructor(private vintageInfoService: VintageInfoService) { }

    async removeStorageLocation(wineId: string, vintage: number, storageLocation: StorageLocationDto): Promise<void> {
        const vintageInfo: VintageInfoDto = await this.vintageInfoService.getVintageInfoByVintage(wineId, vintage);

        const index: number = vintageInfo.storageLocations
            .findIndex(x => x.row == storageLocation.row && x.shelf == storageLocation.shelf);

        if (index === -1) {
            return;
        }

        vintageInfo.storageLocations.splice(index, 1);

        this.vintageInfoService.updateVintageInfo(wineId, vintage, vintageInfo);
    }
}
