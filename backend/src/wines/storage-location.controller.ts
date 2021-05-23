import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { StorageLocationService } from './storage-location.service';
import { WineDto } from './dto/wine.dto';
import { StorageLocationDto } from './dto/storage-location.dto';

@Controller('wines/:wineId/vintage-infos/:vintage')
export class StorageLocationController {
    constructor(private storageLocationService: StorageLocationService) { }

    @Delete('storage-locations/:row/:shelf')
    async removeBottle(
        @Param('wineId') wineId: string,
        @Param('vintage') vintage: number,
        @Param('row') row: number,
        @Param('shelf') shelf: number): Promise<WineDto> {
        return await this.storageLocationService.removeStorageLocation(wineId, vintage, { row: row, shelf: shelf });
    }

    /**
     * Determines, if any of the specified storage locations already exist in an other vintage of the specified wine
     * or in an other wine.
     * @param wineId 
     * @param vintage 
     * @param storageLocations 
     * @returns 
     */
    @Post('storage-locations/exist')
    async storageLocationsExist(
        @Param('wineId') wineId: string,
        @Param('vintage') vintage: number,
        @Body() storageLocations: StorageLocationDto[]): Promise<boolean> {
        return await this.storageLocationService.storageLocationsExist(wineId, vintage, storageLocations);
    }
}
