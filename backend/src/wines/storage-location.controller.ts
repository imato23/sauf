import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Query
} from '@nestjs/common';
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
     * Determines, if any of the specified storage locations already exist in another vintage of the specified wine
     * or in another wine.
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
    async getNextAvailableStorageLocation(@Query('excludedStorages') excludedStorages: string[] = []): Promise<StorageLocationDto> {
        let excludedStorageLocations: StorageLocationDto[];

        try{
            excludedStorageLocations = this.convertToStorageLocations(excludedStorages);
        }catch{
            throw new BadRequestException('Query params parsing failed', 'Excluded-storage params could not be parsed')
        }

        const storageLocation = await this.storageLocationService.getNextAvailableStorageLocation(excludedStorageLocations);

        if (!storageLocation) {
            throw new NotFoundException('All storage locations are occupied', 'All storage locations are occupied');
        }

        return storageLocation;
    }

    private convertToStorageLocations(storages: string[]): StorageLocationDto[] {
        const storageLocations: StorageLocationDto[] = [];

        for (let i = 0; i < storages.length; i++) {
            const storage: string = storages[i];
            const storageArray: string[] = storage.split(',');

            if (storageArray.length !== 2) {
                throw new Error(`The storage string '${storage}' has an invalid format`);
            }

            storageLocations.push({ row: +storageArray[0], shelf: +storageArray[1] });
        }

        return storageLocations;
    }
}
