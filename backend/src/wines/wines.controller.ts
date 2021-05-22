import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { WineDto } from './dto/wine.dto';
import { StorageLocationService } from './storage-location.service';
import { WineService } from './wine.service';

@Controller('wines')
export class WinesController {
    constructor(private winesService: WineService, private storageLocationService: StorageLocationService) { }

    @Get()
    async findAll(): Promise<WineDto[]> {
        const wines = await this.winesService.getAllWines();
        return wines;
    }

    @Get('producers')
    async findAllProducers(): Promise<string[]> {
        return await this.winesService.getAllProducers();
    }

    @Get('countries')
    async findAllCountries(): Promise<string[]> {
        return await this.winesService.getAllCountries();
    }

    @Get('regions')
    async findAllRegions(): Promise<string[]> {
        return await this.winesService.getAllRegions();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<WineDto> {
        const wine: WineDto = await this.winesService.getWineById(id);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${id}' does not exist.`);
        }

        return wine;
    }

    @Get('storage-location/:row/:shelf')
    async findByStorageLocation(@Param('row') row: number, @Param('shelf') shelf: number): Promise<WineDto> {
        const wine: WineDto = await this.storageLocationService.getWineByStorageLocation(row, shelf);

        if (!wine) {
            throw new NotFoundException(`There is no wine stored at row ${row} and shelf ${shelf}.`);
        }

        return wine;
    }

    @Post()
    async create(@Body() createWineDto: WineDto): Promise<WineDto> {
        return await this.winesService.addWine(createWineDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateWineDto: WineDto): Promise<WineDto> {
        return await this.winesService.updateWine(id, updateWineDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<WineDto> {
        return await this.winesService.deleteWine(id);
    }
}
