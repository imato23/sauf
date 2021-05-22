import { Injectable } from '@nestjs/common';
import { StorageLocationDto } from './dto/storage-location.dto';
import { VintageInfoService } from './vintage-info.service';
import { VintageInfoDto } from './dto/vintage-info.dto';
import { WineDto } from './dto/wine.dto';
import { BottleHistoryService } from './bottle-history.service';
import { WineService } from './wine.service';

@Injectable()
export class StorageLocationService {
    constructor(private vintageInfoService: VintageInfoService, private bottleHistoryService: BottleHistoryService, private wineService: WineService) { }

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

    async getWineByStorageLocation(row: number, shelf: number): Promise<WineDto> {
        const wines: WineDto[] = await this.wineService.getAllWines();

        for (const wine of wines) {
            for (const vintageInfo of wine.vintageInfos) {
                if (vintageInfo.storageLocations.some((storageLocation: StorageLocationDto) => storageLocation.row === +row && storageLocation.shelf === +shelf)) {
                    return wine;
                }
            }
        }

        return null;
    }
}
