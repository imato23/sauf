import { Controller, Get, Post, Body, Param, Put, Res, HttpStatus, Delete } from '@nestjs/common';
import { CreateWineDto } from './dto/create-wine.dto';
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
        return await this.winesService.getWineById(id);
    }

    @Post()
    async create(@Body() createWineDto: CreateWineDto): Promise<void> {
        await this.winesService.addWine(createWineDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateWineDto: CreateWineDto): Promise<void> {
        await this.winesService.updateWine(id, updateWineDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.winesService.deleteWine(id);
    }
}
