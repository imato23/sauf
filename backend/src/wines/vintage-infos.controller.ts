import { Controller, Get, Param, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { WineService } from './wine.service';
import { Wine } from './schemas/wine.schema';
import { CreateWineDto } from './dto/create-wine.dto';
import { VintageInfo } from './schemas/vintage-info.schema';
import { VintageInfoDto } from './dto/vintage-info.dto';

@Controller('wines/:wineId/vintage-infos')
export class VintageInfosController {
    constructor(private winesService: WineService) { }

    @Get()
    async findAll(@Param('wineId') wineId: string): Promise<VintageInfoDto[]> {
        const wine: Wine = await this.winesService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        return wine.vintageInfos;
    }

    @Get(':vintage')
    async findById(@Param('wineId') wineId: string, @Param('vintage') vintage: number): Promise<VintageInfoDto> {
        const wine: Wine = await this.winesService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        const vintageInfo: VintageInfo = wine.vintageInfos.filter(vintageInfo => vintageInfo.vintage == vintage)[0];

        if (!vintageInfo) {
            throw new NotFoundException(`The vintage '${vintage}' does not exist in the wine with id '${wineId}'.`);
        }

        return vintageInfo;
    }

    @Post()
    async create(@Param('wineId') wineId: string, @Body() vintageInfo: VintageInfoDto): Promise<VintageInfo> {
        const wine: Wine = await this.winesService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        wine.vintageInfos.push(<VintageInfo>vintageInfo);
        this.winesService.updateWine(wineId, <CreateWineDto>wine);
        return Promise.resolve<VintageInfo>(<VintageInfo>vintageInfo);
    }

    @Put(':vintage')
    async update(@Param('wineId') wineId: string, @Param('vintage') vintage: number, @Body() vintageInfo: VintageInfoDto): Promise<void> {
        const wine: Wine = await this.winesService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        const vintageInfoFromDb: VintageInfo = wine.vintageInfos.filter(x => x.vintage == vintage)[0];

        vintageInfoFromDb.price = vintageInfo.price;
        vintageInfoFromDb.tartaricAcid = vintageInfo.tartaricAcid;
        vintageInfoFromDb.alcoholicStrength = vintageInfo.alcoholicStrength;
        vintageInfoFromDb.price = vintageInfo.price;
        vintageInfoFromDb.residualSugar = vintageInfo.residualSugar;

        await this.winesService.updateWine(wineId, <CreateWineDto>wine);
    }

    @Delete(':vintage')
    async delete(@Param('wineId') wineId: string, @Param('vintage') vintage: number): Promise<void> {
        const wine: Wine = await this.winesService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        const index: number = wine.vintageInfos.findIndex(x => x.vintage == vintage);

        if (index === -1) {
            return;
        }

        wine.vintageInfos.splice(index, 1);
        await this.winesService.updateWine(wineId, <CreateWineDto>wine);
    }
}
