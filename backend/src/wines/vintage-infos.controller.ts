import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { VintageInfoDto } from './dto/vintage-info.dto';
import { VintageInfoService } from './vintage-info.service';
import { WineDto } from './dto/wine.dto';

@Controller('wines/:wineId/vintage-infos')
export class VintageInfosController {
    constructor(private vintageInfoService: VintageInfoService) { }

    @Get()
    async findAll(@Param('wineId') wineId: string): Promise<VintageInfoDto[]> {
        return await this.vintageInfoService.getAllVintageInfos(wineId);
    }

    @Get(':vintage')
    async findById(@Param('wineId') wineId: string, @Param('vintage') vintage: number): Promise<VintageInfoDto> {
        return await this.vintageInfoService.getVintageInfoByVintage(wineId, vintage);
    }

    @Post()
    async create(@Param('wineId') wineId: string, @Body() vintageInfo: VintageInfoDto): Promise<VintageInfoDto> {
        return await this.vintageInfoService.addVintageInfo(wineId, vintageInfo);
    }

    @Put(':vintage')
    async update(@Param('wineId') wineId: string, @Param('vintage') vintage: number, @Body() vintageInfo: VintageInfoDto): Promise<WineDto> {
        return await this.vintageInfoService.updateVintageInfo(wineId, vintage, vintageInfo);
    }

    @Delete(':vintage')
    async delete(@Param('wineId') wineId: string, @Param('vintage') vintage: number): Promise<WineDto> {
        return await this.vintageInfoService.removeVintageInfo(wineId, vintage);
    }
}
