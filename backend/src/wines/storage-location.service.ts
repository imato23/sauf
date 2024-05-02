import { Injectable } from '@nestjs/common';
import { StorageLocationDto } from './dto/storage-location.dto';
import { VintageInfoService } from './vintage-info.service';
import { VintageInfoDto } from './dto/vintage-info.dto';
import { WineDto } from './dto/wine.dto';
import { BottleHistoryService } from './bottle-history.service';
import { WineService } from './wine.service';

@Injectable()
export class StorageLocationService {
    constructor(private vintageInfoService: VintageInfoService, private bottleHistoryService: BottleHistoryService, private wineService: WineService) {
    }

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

    async storageLocationsExist(excludedWineId: string, excludedVintage: number, storageLocations: StorageLocationDto[]): Promise<boolean> {
        const wines: WineDto[] = await this.wineService.getAllWines();

        for (const wine of wines) {
            for (const vintageInfo of wine.vintageInfos) {
                if (wine._id.toString() === excludedWineId && vintageInfo.vintage === +excludedVintage) {
                    // Ignore the currently opened wine and vintage
                    continue;
                }

                for (const storageLocationToValidate of storageLocations) {
                    if (vintageInfo.storageLocations.some((storageLocation: StorageLocationDto) =>
                        storageLocation.row === storageLocationToValidate.row && storageLocation.shelf === storageLocationToValidate.shelf)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    async getNextAvailableStorageLocation(excludedStorageLocations: StorageLocationDto[]): Promise<StorageLocationDto> {
        const maxRows = 19;
        const shelvesPerRow = 6;

        const occupiedStorageLocations: StorageLocationDto[] = await this.getOccupiedStorageLocations();

        for (let row = 1; row < maxRows; row++) {
            const occupiedStorageLocationsInRow: StorageLocationDto[] =
                occupiedStorageLocations.filter((storageLocation: StorageLocationDto) => storageLocation.row === row);

            if (occupiedStorageLocationsInRow.length >= shelvesPerRow) {
                // All shelves in row are already occupied, continue with next row
                continue;
            }

            for (let shelf = 1; shelf < shelvesPerRow; shelf++) {
                if (occupiedStorageLocationsInRow.some((storageLocation: StorageLocationDto) => storageLocation.shelf === shelf)) {
                    continue;
                }

                if (excludedStorageLocations.some((storageLocation: StorageLocationDto) => storageLocation.row === row && storageLocation.shelf === shelf)) {
                    continue;
                }

                return { row: row, shelf: shelf };
            }
        }

        return null;
    }

    private async getOccupiedStorageLocations(): Promise<StorageLocationDto[]> {
        const wines: WineDto[] = await this.wineService.getAllWines()

        return wines.flatMap((wine: WineDto) =>
            wine.vintageInfos.flatMap(
                (vintageInfo: VintageInfoDto) => vintageInfo.storageLocations,
            ),
        );
    }
}
