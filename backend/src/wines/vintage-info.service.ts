import { Injectable, NotFoundException } from '@nestjs/common';
import { WineService } from './wine.service';
import { VintageInfoDto } from './dto/vintage-info.dto';
import { WineDto } from './dto/wine.dto';
import { StorageLocation } from './schemas/storage-location.schema';

@Injectable()
export class VintageInfoService {
    constructor(private wineService: WineService) {
    }

    async getAllVintageInfos(wineId: string): Promise<VintageInfoDto[]> {
        const wine: WineDto = await this.wineService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        return wine.vintageInfos;
    }

    async getVintageInfoByVintage(wineId: string, vintage: number): Promise<VintageInfoDto> {
        const wine: WineDto = await this.wineService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        const vintageInfo: VintageInfoDto = wine.vintageInfos.filter(vintageInfo => vintageInfo.vintage == vintage)[0];

        if (!vintageInfo) {
            throw new NotFoundException(`The vintage '${vintage}' does not exist in the wine with id '${wineId}'.`);
        }

        return vintageInfo;
    }

    async addVintageInfo(wineId: string, vintageInfo: VintageInfoDto): Promise<VintageInfoDto> {
        const wine: WineDto = await this.wineService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        wine.vintageInfos.push(vintageInfo);
        this.wineService.updateWine(wineId, <WineDto>wine);
        return Promise.resolve<VintageInfoDto>(vintageInfo);
    }

    async updateVintageInfo(wineId: string, vintage: number, vintageInfo: VintageInfoDto): Promise<void> {
        const wine: WineDto = await this.wineService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        const vintageInfoFromDb: VintageInfoDto = wine.vintageInfos.filter(x => x.vintage == vintage)[0];

        vintageInfoFromDb.price = vintageInfo.price;
        vintageInfoFromDb.tartaricAcid = vintageInfo.tartaricAcid;
        vintageInfoFromDb.alcoholicStrength = vintageInfo.alcoholicStrength;
        vintageInfoFromDb.price = vintageInfo.price;
        vintageInfoFromDb.residualSugar = vintageInfo.residualSugar;
        vintageInfoFromDb.storageLocations = <StorageLocation[]>vintageInfo.storageLocations

        await this.wineService.updateWine(wineId, <WineDto>wine);
    }

    async removeVintageInfo(wineId: string, vintage: number): Promise<void> {
        const wine: WineDto = await this.wineService.getWineById(wineId);

        if (!wine) {
            throw new NotFoundException(`The wine with id '${wineId}' does not exist.`);
        }

        const index: number = wine.vintageInfos.findIndex(x => x.vintage == vintage);

        if (index === -1) {
            return;
        }

        wine.vintageInfos.splice(index, 1);
        await this.wineService.updateWine(wineId, <WineDto>wine);
    }
}
