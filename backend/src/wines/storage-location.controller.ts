import { Controller, Delete, Param } from '@nestjs/common';
import { StorageLocationService } from './storage-location.service';
import { WineDto } from './dto/wine.dto';

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
}
