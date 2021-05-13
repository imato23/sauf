import { Injectable } from '@nestjs/common';
import { StorageLocationDto } from './dto/storage-location.dto';
import { VintageInfoService } from './vintage-info.service';
import { VintageInfoDto } from './dto/vintage-info.dto';
import { WineDto } from './dto/wine.dto';
import { BottleHistoryService } from './bottle-history.service';

@Injectable()
export class StorageLocationService {
    constructor(private vintageInfoService: VintageInfoService, private bottleHistoryService: BottleHistoryService) { }

    async removeStorageLocation(wineId: string, vintage: number, storageLocation: StorageLocationDto): Promise<WineDto> {
        const vintageInfo: VintageInfoDto = await this.vintageInfoService.getVintageInfoByVintage(wineId, vintage);

        const index: number = vintageInfo.storageLocations
            .findIndex(x => x.row == storageLocation.row && x.shelf == storageLocation.shelf);

        if (index === -1) {
            return;
        }

        vintageInfo.storageLocations.splice(index, 1);

        this.bottleHistoryService.logBottlesRemoved(vintageInfo, 1);

        return await this.vintageInfoService.updateVintageInfo(wineId, vintage, vintageInfo);
    }
}
