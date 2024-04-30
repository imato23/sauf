import {Body, Controller, Delete, Get, NotFoundException, Param, Post} from '@nestjs/common';
import {StorageLocationService} from './storage-location.service';
import {WineDto} from './dto/wine.dto';
import {StorageLocationDto} from './dto/storage-location.dto';

@Controller()
export class StorageLocationController {
    constructor(private storageLocationService: StorageLocationService) {
    }

    @Delete('wines/:wineId/vintage-infos/:vintage/storage-locations/:row/:shelf')
    async removeBottle(
        @Param('wineId') wineId: string,
        @Param('vintage') vintage: number,
        @Param('row') row: number,
        @Param('shelf') shelf: number): Promise<WineDto> {
        return await this.storageLocationService.removeStorageLocation(wineId, vintage, {row: row, shelf: shelf});
    }

    /**
     * Determines, if any of the specified storage locations already exist in an other vintage of the specified wine
     * or in an other wine.
     * @param wineId
     * @param vintage
     * @param storageLocations
     * @returns
     */
    @Post('wines/:wineId/vintage-infos/:vintage/storage-locations/exist')
    async storageLocationsExist(
        @Param('wineId') wineId: string,
        @Param('vintage') vintage: number,
        @Body() storageLocations: StorageLocationDto[]): Promise<boolean> {
        return await this.storageLocationService.storageLocationsExist(wineId, vintage, storageLocations);
    }

    @Get('wines/storage-locations/next-available')
    async getNextAvailableStorageLocation(): Promise<StorageLocationDto> {
        const storageLocation = await this.storageLocationService.getNextAvailableStorageLocation();

        if (!storageLocation) {
            throw new NotFoundException('All storage locations are occupied', 'All storage locations are occupied');
        }

        return storageLocation;
    }
}
