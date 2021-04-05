import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { WineDto } from './dto/wine.dto';
import { Wine } from './schemas/wine.schema';
import { WineService } from './wine.service';

@Controller('wines')
export class WinesController {
    constructor(private winesService: WineService) { }

    @Get()
    async findAll(): Promise<Wine[]> {
        const wines = await this.winesService.getAllWines();
        return wines;
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Wine> {
        const wine: Wine = await this.winesService.getWineById(id);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${id}' does not exist.`);
        }

        return wine;
    }

    @Post()
    async create(@Body() createWineDto: WineDto): Promise<Wine> {
        return await this.winesService.addWine(createWineDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateWineDto: WineDto): Promise<void> {
        await this.winesService.updateWine(id, updateWineDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Wine> {
        return await this.winesService.deleteWine(id);
    }
}
